import { AVAILABILITY_WEIGHT, CONFIDENCE_WEIGHT, MATCH_WEIGHTS } from "./weights";
import { normalizeText, skillAliasesFor } from "./ontology";
import { skillCovered } from "./missing";
import type { MatchBreakdown, Profile, RankedCandidate, Requirement } from "./types";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function overlap(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const nb = b.map(normalizeText);
  let hits = 0;
  for (const item of a) {
    const n = normalizeText(item);
    if (nb.some((x) => x.includes(n) || n.includes(x))) hits += 1;
  }
  return hits / Math.max(a.length, 1);
}

function skillRelevance(profile: Profile, req: Requirement): number {
  if (req.skills.length === 0) return 0;
  let sum = 0;
  for (const needed of req.skills) {
    const needles = skillAliasesFor(needed).map(normalizeText);
    let best = 0;
    for (const skill of profile.skills) {
      const hay = `${skill.name} ${skill.domain}`.toLowerCase();
      if (needles.some((n) => hay.includes(n) || n.includes(normalizeText(skill.name)))) {
        best = Math.max(best, CONFIDENCE_WEIGHT[skill.confidence] ?? 0.5);
      }
    }
    if (best === 0 && skillCovered(profile, needed)) best = 0.55;
    sum += best;
  }
  return clamp01(sum / req.skills.length);
}

function projectExperience(profile: Profile, req: Requirement, domains: string[]): number {
  if (profile.pastProjects.length === 0) return 0.15;
  let best = 0;
  for (const project of profile.pastProjects) {
    const hay = normalizeText(`${project.title} ${project.description} ${project.skills.join(" ")}`);
    let score = 0;
    for (const skill of req.skills) {
      if (skillAliasesFor(skill).some((a) => hay.includes(normalizeText(a)))) score += 0.35;
    }
    for (const domain of domains) {
      if (hay.includes(normalizeText(domain))) score += 0.2;
    }
    best = Math.max(best, Math.min(1, score));
  }
  const years = Math.min(profile.experienceYears / 10, 1) * 0.2;
  return clamp01(best + years);
}

function evidenceConfidence(profile: Profile, req: Requirement): number {
  const matched = profile.skills.filter((s) =>
    req.skills.some((needed) => skillCovered({ ...profile, skills: [s], pastProjects: [] }, needed)),
  );
  if (matched.length === 0) return 0.2;
  const avg =
    matched.reduce((acc, s) => acc + (CONFIDENCE_WEIGHT[s.confidence] ?? 0.5), 0) / matched.length;
  const extra = profile.evidence.filter((e) =>
    matched.some((s) => normalizeText(s.name) === normalizeText(e.skillName)),
  ).length;
  return clamp01(avg + Math.min(extra, 3) * 0.04);
}

function buildReasons(profile: Profile, req: Requirement, breakdown: MatchBreakdown, domains: string[]): string[] {
  const reasons: string[] = [];
  if (breakdown.skillRelevance >= 0.7) {
    const hits = req.skills.filter((s) => skillCovered(profile, s));
    if (hits[0]) reasons.push(`Strong ${hits[0]} experience`);
    else reasons.push(`Skills line up with ${req.role}`);
  } else if (breakdown.skillRelevance >= 0.4) {
    reasons.push(`Partial skill coverage for ${req.role}`);
  }
  const verified = profile.skills.find(
    (s) => s.confidence === "verified" && req.skills.some((n) => skillCovered({ ...profile, skills: [s], pastProjects: [] }, n)),
  );
  if (verified) reasons.push(`Verified ${verified.name} skill`);
  const evidenced = profile.skills.find(
    (s) =>
      s.confidence === "evidence_supported" &&
      req.skills.some((n) => skillCovered({ ...profile, skills: [s], pastProjects: [] }, n)),
  );
  if (evidenced) reasons.push(`Evidence-supported ${evidenced.name} skill`);
  const project = profile.pastProjects.find((p) => {
    const hay = normalizeText(`${p.title} ${p.description} ${p.skills.join(" ")}`);
    return req.skills.some((s) => skillAliasesFor(s).some((a) => hay.includes(normalizeText(a))));
  });
  if (project) reasons.push(`Related project: ${project.title}`);
  const domainHit = profile.domains.find((d) => domains.some((x) => normalizeText(x) === normalizeText(d)));
  if (domainHit) reasons.push(`Relevant ${domainHit} domain experience`);
  if (breakdown.interestAlignment >= 0.45) reasons.push("Interests already point at this problem");
  if (profile.availability === "available") reasons.push("Available for this project");
  else if (profile.availability === "limited") reasons.push("Limited availability — still a possible fit");
  return reasons.slice(0, 6);
}

export function scoreCandidate(
  profile: Profile,
  req: Requirement,
  domains: string[],
  problemText: string,
): RankedCandidate {
  const breakdown: MatchBreakdown = {
    skillRelevance: skillRelevance(profile, req),
    domainRelevance: overlap(profile.domains, domains.length ? domains : [req.role]),
    projectExperience: projectExperience(profile, req, domains),
    evidenceConfidence: evidenceConfidence(profile, req),
    availability: AVAILABILITY_WEIGHT[profile.availability] ?? 0.5,
    interestAlignment: overlap(profile.interests, [...domains, problemText, req.role, ...req.skills]),
  };
  const raw =
    breakdown.skillRelevance * MATCH_WEIGHTS.skillRelevance +
    breakdown.domainRelevance * MATCH_WEIGHTS.domainRelevance +
    breakdown.projectExperience * MATCH_WEIGHTS.projectExperience +
    breakdown.evidenceConfidence * MATCH_WEIGHTS.evidenceConfidence +
    breakdown.availability * MATCH_WEIGHTS.availability +
    breakdown.interestAlignment * MATCH_WEIGHTS.interestAlignment;
  const score = Math.round(clamp01(raw) * 100);
  return {
    profile,
    requirementId: req.id,
    role: req.role,
    score,
    breakdown,
    reasons: buildReasons(profile, req, breakdown, domains),
  };
}

export function rankCandidates(
  profiles: Profile[],
  req: Requirement,
  domains: string[],
  problemText: string,
  excludeIds: Set<string>,
): RankedCandidate[] {
  return profiles
    .filter((p) => !excludeIds.has(p.id) && p.availability !== "unavailable")
    .map((p) => scoreCandidate(p, req, domains, problemText))
    .filter((m) => m.score >= 28)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}
