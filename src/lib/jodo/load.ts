import type { Sql } from "@/lib/db";
import type {
  Evidence,
  PastProject,
  Profile,
  ProfileSkill,
  Requirement,
  SkillConfidence,
} from "./types";

type ProfileRow = {
  id: string;
  user_id: string;
  name: string;
  avatar_key: string;
  avatar_url: string | null;
  bio: string;
  availability: string;
  experience_years: number;
  onboarding_complete: boolean;
  is_seed: boolean;
  created_at: string | Date;
};

function asIso(value: string | Date): string {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function parseJsonArray(raw: string | string[] | null | undefined): string[] {
  if (Array.isArray(raw)) return raw;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export async function loadProfile(sql: Sql, id: string): Promise<Profile | null> {
  const rows = await sql<ProfileRow>`select * from profiles where id = ${id} or user_id = ${id} limit 1`;
  const row = rows[0];
  if (!row) return null;
  const [skills, domains, interests, projects, evidence] = await Promise.all([
    sql<{ id: string; name: string; domain: string; confidence: string }>`
      select id, name, domain, confidence from profile_skills where profile_id = ${row.id}
    `,
    sql<{ name: string }>`select name from profile_domains where profile_id = ${row.id}`,
    sql<{ name: string }>`select name from profile_interests where profile_id = ${row.id}`,
    sql<{ id: string; title: string; description: string; skills_json: string; year: number }>`
      select id, title, description, skills_json, year from past_projects where profile_id = ${row.id}
    `,
    sql<{ id: string; skill_name: string; type: string; title: string; detail: string; status: string }>`
      select id, skill_name, type, title, detail, status from evidence where profile_id = ${row.id}
    `,
  ]);
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    avatarKey: row.avatar_key,
    avatarUrl: row.avatar_url,
    bio: row.bio,
    availability: row.availability as Profile["availability"],
    experienceYears: Number(row.experience_years),
    onboardingComplete: Boolean(row.onboarding_complete),
    isSeed: Boolean(row.is_seed),
    skills: skills.map(
      (s): ProfileSkill => ({
        id: s.id,
        name: s.name,
        domain: s.domain,
        confidence: s.confidence as SkillConfidence,
      }),
    ),
    domains: domains.map((d) => d.name),
    interests: interests.map((d) => d.name),
    pastProjects: projects.map(
      (p): PastProject => ({
        id: p.id,
        title: p.title,
        description: p.description,
        skills: parseJsonArray(p.skills_json),
        year: Number(p.year),
      }),
    ),
    evidence: evidence.map(
      (e): Evidence => ({
        id: e.id,
        skillName: e.skill_name,
        type: e.type as Evidence["type"],
        title: e.title,
        detail: e.detail,
        status: e.status as Evidence["status"],
      }),
    ),
    createdAt: asIso(row.created_at),
  };
}

export async function loadAllProfiles(sql: Sql): Promise<Profile[]> {
  const rows = await sql<{ id: string }>`select id from profiles`;
  const profiles: Profile[] = [];
  for (const row of rows) {
    const profile = await loadProfile(sql, row.id);
    if (profile) profiles.push(profile);
  }
  return profiles;
}

export async function loadRequirements(sql: Sql, ideaId: string): Promise<Requirement[]> {
  const rows = await sql<{
    id: string;
    idea_id: string;
    role: string;
    skills_json: string;
    priority: string;
    reason: string;
    hidden: boolean;
  }>`select * from idea_requirements where idea_id = ${ideaId}`;
  return rows.map((r) => ({
    id: r.id,
    ideaId: r.idea_id,
    role: r.role,
    skills: parseJsonArray(r.skills_json),
    priority: r.priority as Requirement["priority"],
    reason: r.reason,
    hidden: Boolean(r.hidden),
  }));
}

export function parseAnalysis(raw: string): import("./types").IdeaAnalysis | null {
  try {
    const parsed = JSON.parse(raw) as import("./types").IdeaAnalysis;
    if (!parsed || !Array.isArray(parsed.roles)) return null;
    return parsed;
  } catch {
    return null;
  }
}
