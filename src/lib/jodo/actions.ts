import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { analyzeIdeaLocal } from "./analyze";
import { proposeTeam, validateTeam } from "./architect";
import { computeMissing, coveragePercent, roleCovered } from "./missing";
import { rankCandidates, scoreCandidate } from "./match";
import { loadAllProfiles, loadProfile, loadRequirements, parseAnalysis } from "./load";
import { ensureSeed } from "./seed";
import { enhanceAnalysis } from "./xai";
import type {
  CollaborationRequest,
  DashboardData,
  IdeaAnalysis,
  IdeaDetail,
  IdeaSummary,
  IdeaStatus,
  Profile,
  RankedCandidate,
  Requirement,
  Task,
  TaskStatus,
  Teammate,
} from "./types";

function nid() {
  return crypto.randomUUID();
}

function asIso(value: string | Date): string {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

async function replaceList(
  sql: Awaited<ReturnType<typeof getSql>>,
  table: "profile_skills" | "profile_domains" | "profile_interests" | "past_projects",
  profileId: string,
) {
  await sql.query(`delete from ${table} where profile_id = $1`, [profileId]);
}

async function saveLists(
  sql: Awaited<ReturnType<typeof getSql>>,
  profileId: string,
  data: {
    skills: { name: string; domain: string; confidence: string }[];
    domains: string[];
    interests: string[];
    pastProjects: { title: string; description: string; skills: string[]; year: number }[];
  },
) {
  await replaceList(sql, "profile_skills", profileId);
  await replaceList(sql, "profile_domains", profileId);
  await replaceList(sql, "profile_interests", profileId);
  await replaceList(sql, "past_projects", profileId);
  for (const skill of data.skills) {
    if (!skill.name.trim()) continue;
    await sql`
      insert into profile_skills (id, profile_id, name, domain, confidence)
      values (${nid()}, ${profileId}, ${skill.name.trim()}, ${skill.domain.trim()}, ${skill.confidence})
    `;
  }
  for (const domain of data.domains) {
    if (!domain.trim()) continue;
    await sql`insert into profile_domains (id, profile_id, name) values (${nid()}, ${profileId}, ${domain.trim()})`;
  }
  for (const interest of data.interests) {
    if (!interest.trim()) continue;
    await sql`insert into profile_interests (id, profile_id, name) values (${nid()}, ${profileId}, ${interest.trim()})`;
  }
  for (const project of data.pastProjects) {
    if (!project.title.trim()) continue;
    await sql`
      insert into past_projects (id, profile_id, title, description, skills_json, year)
      values (${nid()}, ${profileId}, ${project.title.trim()}, ${project.description.trim()}, ${JSON.stringify(project.skills)}, ${project.year || 2024})
    `;
  }
}

async function ensureMyRow(
  sql: Awaited<ReturnType<typeof getSql>>,
  userId: string,
  hint?: { name?: string; avatarUrl?: string | null },
): Promise<Profile> {
  await ensureSeed(sql);
  const existing = await loadProfile(sql, userId);
  if (existing) return existing;
  const name = hint?.name?.trim() || "New collaborator";
  await sql`
    insert into profiles (id, user_id, name, avatar_key, avatar_url, bio, availability, experience_years, onboarding_complete, is_seed)
    values (${userId}, ${userId}, ${name}, ${"orbit"}, ${hint?.avatarUrl ?? null}, ${""}, ${"available"}, ${0}, ${false}, ${false})
  `;
  const created = await loadProfile(sql, userId);
  if (!created) throw new Error("Could not create profile");
  return created;
}

async function persistRequirements(
  sql: Awaited<ReturnType<typeof getSql>>,
  ideaId: string,
  analysis: IdeaAnalysis,
) {
  await sql`delete from idea_requirements where idea_id = ${ideaId}`;
  for (const role of analysis.roles) {
    await sql`
      insert into idea_requirements (id, idea_id, role, skills_json, priority, reason, hidden)
      values (${nid()}, ${ideaId}, ${role.title}, ${JSON.stringify(role.skills)}, ${role.priority}, ${role.reason}, ${role.hidden})
    `;
  }
}

async function loadTeammates(sql: Awaited<ReturnType<typeof getSql>>, ideaId: string): Promise<Teammate[]> {
  const rows = await sql<{ profile_id: string; role: string; source: Teammate["source"] }>`
    select profile_id, role, source from idea_members where idea_id = ${ideaId}
  `;
  const teammates: Teammate[] = [];
  for (const row of rows) {
    const profile = await loadProfile(sql, row.profile_id);
    if (!profile) continue;
    teammates.push({ profileId: profile.id, role: row.role, source: row.source, profile });
  }
  return teammates;
}

async function loadRequests(sql: Awaited<ReturnType<typeof getSql>>, ideaId?: string): Promise<CollaborationRequest[]> {
  const rows = ideaId
    ? await sql<{
        id: string;
        idea_id: string;
        sender_id: string;
        receiver_id: string;
        role: string;
        status: CollaborationRequest["status"];
        created_at: string | Date;
        title: string;
      }>`
        select r.*, i.title from collab_requests r join ideas i on i.id = r.idea_id where r.idea_id = ${ideaId} order by r.created_at desc
      `
    : await sql<{
        id: string;
        idea_id: string;
        sender_id: string;
        receiver_id: string;
        role: string;
        status: CollaborationRequest["status"];
        created_at: string | Date;
        title: string;
      }>`
        select r.*, i.title from collab_requests r join ideas i on i.id = r.idea_id order by r.created_at desc
      `;
  const out: CollaborationRequest[] = [];
  for (const row of rows) {
    const sender = await loadProfile(sql, row.sender_id);
    const receiver = await loadProfile(sql, row.receiver_id);
    out.push({
      id: row.id,
      ideaId: row.idea_id,
      ideaTitle: row.title,
      senderId: row.sender_id,
      senderName: sender?.name ?? "Unknown",
      receiverId: row.receiver_id,
      receiverName: receiver?.name ?? "Unknown",
      role: row.role,
      status: row.status,
      createdAt: asIso(row.created_at),
    });
  }
  return out;
}

async function buildIdeaSummary(
  sql: Awaited<ReturnType<typeof getSql>>,
  idea: {
    id: string;
    owner_id: string;
    title: string;
    description: string;
    status: string;
    analysis_json: string;
    created_at: string | Date;
  },
): Promise<IdeaSummary> {
  const owner = await loadProfile(sql, idea.owner_id);
  const analysis = parseAnalysis(idea.analysis_json);
  const requirements = await loadRequirements(sql, idea.id);
  const teammates = await loadTeammates(sql, idea.id);
  const missing = computeMissing(requirements, teammates);
  return {
    id: idea.id,
    ownerId: idea.owner_id,
    ownerName: owner?.name ?? "Unknown",
    title: idea.title,
    description: idea.description,
    status: idea.status as IdeaStatus,
    domains: analysis?.domains ?? [],
    createdAt: asIso(idea.created_at),
    teamSize: teammates.length,
    missingCount: missing.length,
    coverage: coveragePercent(requirements, teammates),
  };
}

async function assembleIdea(sql: Awaited<ReturnType<typeof getSql>>, ideaId: string): Promise<IdeaDetail | null> {
  const ideas = await sql<{
    id: string;
    owner_id: string;
    title: string;
    description: string;
    domain_hint: string;
    constraints_text: string;
    timeline: string;
    availability_need: string;
    status: string;
    analysis_json: string;
    created_at: string | Date;
  }>`select * from ideas where id = ${ideaId} limit 1`;
  const idea = ideas[0];
  if (!idea) return null;
  const owner = await loadProfile(sql, idea.owner_id);
  const analysis = parseAnalysis(idea.analysis_json);
  const requirements = await loadRequirements(sql, idea.id);
  const teammates = await loadTeammates(sql, idea.id);
  const missing = computeMissing(requirements, teammates);
  const everyone = await loadAllProfiles(sql);
  const exclude = new Set(teammates.map((m) => m.profileId));
  const domains = analysis?.domains ?? [];
  const problem = `${idea.title} ${idea.description}`;
  const matches: RankedCandidate[] = [];
  for (const req of requirements.filter((r) => missing.some((m) => m.requirementId === r.id))) {
    matches.push(...rankCandidates(everyone, req, domains, problem, exclude));
  }
  const proposedTeam = proposeTeam(teammates, missing, matches);
  const validation = validateTeam(requirements, teammates);
  const requests = await loadRequests(sql, idea.id);
  return {
    id: idea.id,
    ownerId: idea.owner_id,
    ownerName: owner?.name ?? "Unknown",
    title: idea.title,
    description: idea.description,
    domainHint: idea.domain_hint,
    constraints: idea.constraints_text,
    timeline: idea.timeline,
    availabilityNeed: idea.availability_need,
    status: idea.status as IdeaStatus,
    analysis,
    requirements,
    teammates,
    missing,
    matches,
    proposedTeam,
    validation,
    requests,
    createdAt: asIso(idea.created_at),
  };
}

async function maybeInviteUserToSeed(
  sql: Awaited<ReturnType<typeof getSql>>,
  profile: Profile,
) {
  const existing = await sql<{ c: number }>`
    select count(*)::int as c from collab_requests where receiver_id = ${profile.id} and idea_id = ${"idea-heat"}
  `;
  if ((existing[0]?.c ?? 0) > 0) return;
  const hay = `${profile.skills.map((s) => s.name).join(" ")} ${profile.domains.join(" ")} ${profile.interests.join(" ")}`.toLowerCase();
  if (!/(gis|climate|design|ml|machine|map|heat|product)/.test(hay) && profile.skills.length === 0) {
    // still send a general invite so accept/reject can be demonstrated
  }
  await sql`
    insert into collab_requests (id, idea_id, sender_id, receiver_id, role, status)
    values (${nid()}, ${"idea-heat"}, ${"seed-sofia"}, ${profile.id}, ${"Collaborator"}, ${"pending"})
  `;
}

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return ensureMyRow(sql, context.userId);
  });

export const saveOnboarding = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      name: string;
      avatarKey: string;
      bio: string;
      availability: Profile["availability"];
      experienceYears: number;
      skills: { name: string; domain: string; confidence: string }[];
      domains: string[];
      interests: string[];
      pastProjects: { title: string; description: string; skills: string[]; year: number }[];
    }) => input,
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const profile = await ensureMyRow(sql, context.userId, { name: data.name });
    await sql`
      update profiles
      set name = ${data.name.trim() || profile.name},
          avatar_key = ${data.avatarKey},
          bio = ${data.bio},
          availability = ${data.availability},
          experience_years = ${data.experienceYears},
          onboarding_complete = true
      where id = ${profile.id}
    `;
    await saveLists(sql, profile.id, data);
    const next = await loadProfile(sql, profile.id);
    if (next) await maybeInviteUserToSeed(sql, next);
    return next;
  });

export const updateProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      name: string;
      avatarKey: string;
      bio: string;
      availability: Profile["availability"];
      experienceYears: number;
      skills: { name: string; domain: string; confidence: string }[];
      domains: string[];
      interests: string[];
      pastProjects: { title: string; description: string; skills: string[]; year: number }[];
    }) => input,
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const profile = await ensureMyRow(sql, context.userId);
    await sql`
      update profiles
      set name = ${data.name.trim() || profile.name},
          avatar_key = ${data.avatarKey},
          bio = ${data.bio},
          availability = ${data.availability},
          experience_years = ${data.experienceYears}
      where id = ${profile.id}
    `;
    await saveLists(sql, profile.id, data);
    return loadProfile(sql, profile.id);
  });

export const addEvidence = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { skillName: string; type: string; title: string; detail: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const profile = await ensureMyRow(sql, context.userId);
    await sql`
      insert into evidence (id, profile_id, skill_name, type, title, detail, status)
      values (${nid()}, ${profile.id}, ${data.skillName}, ${data.type}, ${data.title}, ${data.detail}, ${"evidence_supported"})
    `;
    await sql`
      update profile_skills
      set confidence = ${"evidence_supported"}
      where profile_id = ${profile.id} and lower(name) = ${data.skillName.toLowerCase()} and confidence = ${"self_declared"}
    `;
    return loadProfile(sql, profile.id);
  });

export const endorseSkill = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { ideaId: string; profileId: string; skillName: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const me = await ensureMyRow(sql, context.userId);
    const members = await sql<{ c: number }>`
      select count(*)::int as c from idea_members
      where idea_id = ${data.ideaId} and profile_id in (${me.id}, ${data.profileId})
    `;
    if ((members[0]?.c ?? 0) < 2) throw new Error("Only teammates can verify a skill");
    if (me.id === data.profileId) throw new Error("You cannot verify your own skill");
    await sql`
      update profile_skills
      set confidence = ${"verified"}
      where profile_id = ${data.profileId} and lower(name) = ${data.skillName.toLowerCase()}
    `;
    await sql`
      insert into evidence (id, profile_id, skill_name, type, title, detail, status)
      values (${nid()}, ${data.profileId}, ${data.skillName}, ${"verification_task"}, ${`Teammate verification by ${me.name}`}, ${`Verified on a live JODO team`}, ${"verified"})
    `;
    return loadProfile(sql, data.profileId);
  });

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<DashboardData> => {
    const sql = await getSql();
    const profile = await ensureMyRow(sql, context.userId);
    await ensureSeed(sql);
    const ideaRows = await sql<{
      id: string;
      owner_id: string;
      title: string;
      description: string;
      status: string;
      analysis_json: string;
      created_at: string | Date;
    }>`
      select distinct i.id, i.owner_id, i.title, i.description, i.status, i.analysis_json, i.created_at
      from ideas i
      left join idea_members m on m.idea_id = i.id
      where i.owner_id = ${profile.id} or m.profile_id = ${profile.id}
      order by i.created_at desc
    `;
    const ideas: IdeaSummary[] = [];
    for (const row of ideaRows) ideas.push(await buildIdeaSummary(sql, row));
    const owned = ideas.filter((i) => i.ownerId === profile.id);
    const missingHighlights = [];
    const recommended: RankedCandidate[] = [];
    const everyone = await loadAllProfiles(sql);
    for (const idea of owned) {
      const detail = await assembleIdea(sql, idea.id);
      if (!detail) continue;
      if (detail.missing.length)
        missingHighlights.push({ ideaId: idea.id, ideaTitle: idea.title, pieces: detail.missing });
      for (const match of detail.matches.slice(0, 2)) {
        if (!recommended.some((r) => r.profile.id === match.profile.id)) recommended.push(match);
      }
    }
    if (recommended.length === 0) {
      const fakeReq: Requirement = {
        id: "discover",
        ideaId: "",
        role: "Collaborator",
        skills: profile.skills.map((s) => s.name),
        priority: "medium",
        reason: "Shared craft",
        hidden: false,
      };
      recommended.push(
        ...everyone
          .filter((p) => p.id !== profile.id)
          .map((p) => scoreCandidate(p, fakeReq, profile.domains, profile.interests.join(" ")))
          .sort((a, b) => b.score - a.score)
          .slice(0, 4),
      );
    }
    const allReq = await loadRequests(sql);
    return {
      profile,
      ideas: owned,
      missingHighlights,
      recommended: recommended.slice(0, 6),
      incoming: allReq.filter((r) => r.receiverId === profile.id),
      outgoing: allReq.filter((r) => r.senderId === profile.id),
      teams: ideas,
    };
  });

export const createIdea = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      title: string;
      description: string;
      domainHint?: string;
      constraints?: string;
      timeline?: string;
      availabilityNeed?: string;
      existingTeammateIds?: string[];
    }) => input,
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const me = await ensureMyRow(sql, context.userId);
    const title = data.title.trim();
    const description = data.description.trim();
    if (!title || !description) throw new Error("An idea needs a title and a description");
    const local = analyzeIdeaLocal({
      title,
      description,
      domainHint: data.domainHint,
      constraints: data.constraints,
      timeline: data.timeline,
    });
    const analysis = await enhanceAnalysis(
      { title, description, domainHint: data.domainHint, constraints: data.constraints, timeline: data.timeline },
      local,
    );
    const id = nid();
    await sql`
      insert into ideas (id, owner_id, title, description, domain_hint, constraints_text, timeline, availability_need, status, analysis_json)
      values (
        ${id}, ${me.id}, ${title}, ${description}, ${data.domainHint ?? ""}, ${data.constraints ?? ""},
        ${data.timeline ?? ""}, ${data.availabilityNeed ?? ""}, ${"analyzed"}, ${JSON.stringify(analysis)}
      )
    `;
    await persistRequirements(sql, id, analysis);
    const ownerRole = analysis.roles.find((r) => roleCovered(me, { id: "owner", ideaId: id, role: r.title, skills: r.skills, priority: r.priority, reason: r.reason, hidden: false }))?.title ?? "Idea owner";
    await sql`
      insert into idea_members (id, idea_id, profile_id, role, source)
      values (${nid()}, ${id}, ${me.id}, ${ownerRole}, ${"owner"})
    `;
    for (const teammateId of data.existingTeammateIds ?? []) {
      if (teammateId === me.id) continue;
      const person = await loadProfile(sql, teammateId);
      if (!person) continue;
      const role =
        analysis.roles.find((r) =>
          roleCovered(person, {
            id: r.id,
            ideaId: id,
            role: r.title,
            skills: r.skills,
            priority: r.priority,
            reason: r.reason,
            hidden: false,
          }),
        )?.title ?? "Teammate";
      await sql`
        insert into idea_members (id, idea_id, profile_id, role, source)
        values (${nid()}, ${id}, ${person.id}, ${role}, ${"existing"})
        on conflict (idea_id, profile_id) do nothing
      `;
    }
    await sql`update ideas set status = ${"recruiting"} where id = ${id}`;
    return assembleIdea(sql, id);
  });

export const getIdea = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await ensureSeed(sql);
    return assembleIdea(sql, data);
  });

export const reanalyzeIdea = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { ideaId: string; description?: string; title?: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const me = await ensureMyRow(sql, context.userId);
    const rows = await sql<{ owner_id: string; title: string; description: string; domain_hint: string; constraints_text: string; timeline: string }>`
      select owner_id, title, description, domain_hint, constraints_text, timeline from ideas where id = ${data.ideaId}
    `;
    const idea = rows[0];
    if (!idea) throw new Error("Idea not found");
    if (idea.owner_id !== me.id) throw new Error("Only the idea owner can re-analyze");
    const title = data.title?.trim() || idea.title;
    const description = data.description?.trim() || idea.description;
    const local = analyzeIdeaLocal({
      title,
      description,
      domainHint: idea.domain_hint,
      constraints: idea.constraints_text,
      timeline: idea.timeline,
    });
    const analysis = await enhanceAnalysis(
      { title, description, domainHint: idea.domain_hint, constraints: idea.constraints_text, timeline: idea.timeline },
      local,
    );
    await sql`
      update ideas set title = ${title}, description = ${description}, analysis_json = ${JSON.stringify(analysis)}, updated_at = now()
      where id = ${data.ideaId}
    `;
    await persistRequirements(sql, data.ideaId, analysis);
    return assembleIdea(sql, data.ideaId);
  });

export const sendRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { ideaId: string; receiverId: string; role: string; requirementId?: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const me = await ensureMyRow(sql, context.userId);
    const idea = await sql<{ owner_id: string }>`select owner_id from ideas where id = ${data.ideaId}`;
    if (idea[0]?.owner_id !== me.id) throw new Error("Only the idea owner can send requests");
    const dup = await sql<{ id: string }>`
      select id from collab_requests
      where idea_id = ${data.ideaId} and receiver_id = ${data.receiverId} and status = ${"pending"}
    `;
    if (dup[0]) return assembleIdea(sql, data.ideaId);
    await sql`
      insert into collab_requests (id, idea_id, sender_id, receiver_id, role, requirement_id, status)
      values (${nid()}, ${data.ideaId}, ${me.id}, ${data.receiverId}, ${data.role}, ${data.requirementId ?? null}, ${"pending"})
    `;
    return assembleIdea(sql, data.ideaId);
  });

export const cancelRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const me = await ensureMyRow(sql, context.userId);
    const rows = await sql<{ idea_id: string; sender_id: string; status: string }>`
      select idea_id, sender_id, status from collab_requests where id = ${data}
    `;
    const req = rows[0];
    if (!req) throw new Error("Request not found");
    if (req.sender_id !== me.id) throw new Error("Only the sender can cancel");
    if (req.status !== "pending") throw new Error("Only pending requests can be cancelled");
    await sql`update collab_requests set status = ${"cancelled"} where id = ${data}`;
    return assembleIdea(sql, req.idea_id);
  });

export const respondRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { requestId: string; accept: boolean }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const me = await ensureMyRow(sql, context.userId);
    const rows = await sql<{ idea_id: string; receiver_id: string; status: string; role: string }>`
      select idea_id, receiver_id, status, role from collab_requests where id = ${data.requestId}
    `;
    const req = rows[0];
    if (!req) throw new Error("Request not found");
    if (req.receiver_id !== me.id) throw new Error("Only the invited person can respond");
    if (req.status !== "pending") throw new Error("This request is no longer pending");
    const next = data.accept ? "accepted" : "rejected";
    await sql`update collab_requests set status = ${next} where id = ${data.requestId}`;
    if (data.accept) {
      await sql`
        insert into idea_members (id, idea_id, profile_id, role, source)
        values (${nid()}, ${req.idea_id}, ${me.id}, ${req.role}, ${"joined"})
        on conflict (idea_id, profile_id) do nothing
      `;
      await sql`update ideas set status = ${"active"} where id = ${req.idea_id}`;
    }
    return assembleIdea(sql, req.idea_id);
  });

export const followUpSeeds = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((ideaId: string) => ideaId)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const me = await ensureMyRow(sql, context.userId);
    const ideaRows = await sql<{ owner_id: string; title: string; description: string; analysis_json: string }>`
      select owner_id, title, description, analysis_json from ideas where id = ${data}
    `;
    const idea = ideaRows[0];
    if (!idea || idea.owner_id !== me.id) throw new Error("Only the idea owner can follow up");
    const pending = await sql<{ id: string; receiver_id: string; role: string }>`
      select id, receiver_id, role from collab_requests
      where idea_id = ${data} and sender_id = ${me.id} and status = ${"pending"}
    `;
    const analysis = parseAnalysis(idea.analysis_json);
    const requirements = await loadRequirements(sql, data);
    for (const row of pending) {
      const person = await loadProfile(sql, row.receiver_id);
      if (!person?.isSeed) continue;
      const req =
        requirements.find((r) => r.role === row.role) ??
        ({
          id: "tmp",
          ideaId: data,
          role: row.role,
          skills: analysis?.roles.find((r) => r.title === row.role)?.skills ?? [],
          priority: "medium",
          reason: "",
          hidden: false,
        } satisfies Requirement);
      const ranked = scoreCandidate(person, req, analysis?.domains ?? [], `${idea.title} ${idea.description}`);
      const accept =
        person.availability === "available"
          ? ranked.score >= 55
          : person.availability === "limited"
            ? ranked.score >= 78
            : false;
      if (accept) {
        await sql`update collab_requests set status = ${"accepted"} where id = ${row.id}`;
        await sql`
          insert into idea_members (id, idea_id, profile_id, role, source)
          values (${nid()}, ${data}, ${person.id}, ${row.role}, ${"joined"})
          on conflict (idea_id, profile_id) do nothing
        `;
      } else if (person.availability === "unavailable" || ranked.score < 40) {
        await sql`update collab_requests set status = ${"rejected"} where id = ${row.id}`;
      }
    }
    const teammates = await loadTeammates(sql, data);
    if (teammates.length > 1) await sql`update ideas set status = ${"active"} where id = ${data}`;
    return assembleIdea(sql, data);
  });

export const removeMember = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { ideaId: string; profileId: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const me = await ensureMyRow(sql, context.userId);
    const idea = await sql<{ owner_id: string }>`select owner_id from ideas where id = ${data.ideaId}`;
    if (!idea[0]) throw new Error("Idea not found");
    const isOwner = idea[0].owner_id === me.id;
    const leavingSelf = data.profileId === me.id;
    if (!isOwner && !leavingSelf) throw new Error("Not allowed");
    if (data.profileId === idea[0].owner_id) throw new Error("The idea owner cannot leave");
    await sql`delete from idea_members where idea_id = ${data.ideaId} and profile_id = ${data.profileId}`;
    await sql`
      update collab_requests set status = ${"cancelled"}
      where idea_id = ${data.ideaId} and receiver_id = ${data.profileId} and status = ${"accepted"}
    `;
    await sql`update ideas set status = ${"recruiting"} where id = ${data.ideaId}`;
    return assembleIdea(sql, data.ideaId);
  });

export const listPeople = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const me = await ensureMyRow(sql, context.userId);
    await ensureSeed(sql);
    const all = await loadAllProfiles(sql);
    return all.filter((p) => p.id !== me.id);
  });

export const getPublicProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await ensureSeed(sql);
    return loadProfile(sql, data);
  });

export const getDiscover = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const me = await ensureMyRow(sql, context.userId);
    await ensureSeed(sql);
    const people = (await loadAllProfiles(sql)).filter((p) => p.id !== me.id);
    const ideaRows = await sql<{
      id: string;
      owner_id: string;
      title: string;
      description: string;
      status: string;
      analysis_json: string;
      created_at: string | Date;
    }>`select id, owner_id, title, description, status, analysis_json, created_at from ideas order by created_at desc`;
    const projects: IdeaSummary[] = [];
    for (const row of ideaRows) projects.push(await buildIdeaSummary(sql, row));
    const owned = await sql<{ id: string }>`select id from ideas where owner_id = ${me.id}`;
    const missingRoles: string[] = [];
    for (const row of owned) {
      const detail = await assembleIdea(sql, row.id);
      if (!detail) continue;
      for (const piece of detail.missing) {
        if (!missingRoles.includes(piece.role)) missingRoles.push(piece.role);
      }
    }
    const rankedPeople = people
      .map((p) => {
        const req: Requirement = {
          id: "disc",
          ideaId: "",
          role: missingRoles[0] ?? "Collaborator",
          skills: [...new Set([...me.skills.map((s) => s.name), ...missingRoles])],
          priority: "medium",
          reason: "Discover",
          hidden: false,
        };
        return scoreCandidate(p, req, me.domains, me.interests.join(" "));
      })
      .sort((a, b) => b.score - a.score);
    const skills = [...new Set(people.flatMap((p) => p.skills.map((s) => s.name)))].sort();
    const domains = [...new Set(people.flatMap((p) => p.domains))].sort();
    return {
      people: rankedPeople,
      projects,
      skills,
      domains,
      missingRoles,
    };
  });

export const createTask = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { ideaId: string; title: string; assigneeId?: string | null }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const me = await ensureMyRow(sql, context.userId);
    const member = await sql<{ c: number }>`
      select count(*)::int as c from idea_members where idea_id = ${data.ideaId} and profile_id = ${me.id}
    `;
    if ((member[0]?.c ?? 0) === 0) throw new Error("Only teammates can add tasks");
    await sql`
      insert into tasks (id, idea_id, title, assignee_id, status)
      values (${nid()}, ${data.ideaId}, ${data.title.trim()}, ${data.assigneeId ?? null}, ${"todo"})
    `;
    return listTasksForIdea(sql, data.ideaId);
  });

export const updateTask = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { taskId: string; status?: TaskStatus; assigneeId?: string | null; title?: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const me = await ensureMyRow(sql, context.userId);
    const rows = await sql<{ idea_id: string }>`select idea_id from tasks where id = ${data.taskId}`;
    const task = rows[0];
    if (!task) throw new Error("Task not found");
    const member = await sql<{ c: number }>`
      select count(*)::int as c from idea_members where idea_id = ${task.idea_id} and profile_id = ${me.id}
    `;
    if ((member[0]?.c ?? 0) === 0) throw new Error("Only teammates can update tasks");
    if (data.status)
      await sql`update tasks set status = ${data.status} where id = ${data.taskId}`;
    if (data.assigneeId !== undefined)
      await sql`update tasks set assignee_id = ${data.assigneeId} where id = ${data.taskId}`;
    if (data.title)
      await sql`update tasks set title = ${data.title} where id = ${data.taskId}`;
    return listTasksForIdea(sql, task.idea_id);
  });

export const getWorkspace = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((ideaId: string) => ideaId)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await ensureSeed(sql);
    const idea = await assembleIdea(sql, data);
    if (!idea) return null;
    const tasks = await listTasksForIdea(sql, data);
    const done = tasks.filter((t) => t.status === "done").length;
    const progress = tasks.length === 0 ? 0 : Math.round((done / tasks.length) * 100);
    return { idea, tasks, progress };
  });

async function listTasksForIdea(sql: Awaited<ReturnType<typeof getSql>>, ideaId: string): Promise<Task[]> {
  const rows = await sql<{
    id: string;
    idea_id: string;
    title: string;
    assignee_id: string | null;
    status: TaskStatus;
    created_at: string | Date;
  }>`select * from tasks where idea_id = ${ideaId} order by created_at asc`;
  const tasks: Task[] = [];
  for (const row of rows) {
    const assignee = row.assignee_id ? await loadProfile(sql, row.assignee_id) : null;
    tasks.push({
      id: row.id,
      ideaId: row.idea_id,
      title: row.title,
      assigneeId: row.assignee_id,
      assigneeName: assignee?.name ?? null,
      status: row.status,
      createdAt: asIso(row.created_at),
    });
  }
  return tasks;
}

export const listInbox = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const me = await ensureMyRow(sql, context.userId);
    const all = await loadRequests(sql);
    return {
      incoming: all.filter((r) => r.receiverId === me.id),
      outgoing: all.filter((r) => r.senderId === me.id),
    };
  });
