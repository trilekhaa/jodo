import { skillAliasesFor, normalizeText } from "./ontology";
import type { MissingPiece, Profile, Requirement, Teammate } from "./types";

export function skillCovered(profile: Profile, needed: string): boolean {
  const needles = skillAliasesFor(needed).map(normalizeText);
  for (const skill of profile.skills) {
    const hay = `${skill.name} ${skill.domain}`.toLowerCase();
    if (needles.some((n) => hay.includes(n) || n.includes(normalizeText(skill.name)))) return true;
  }
  for (const project of profile.pastProjects) {
    const hay = `${project.title} ${project.description} ${project.skills.join(" ")}`.toLowerCase();
    if (needles.some((n) => hay.includes(n))) return true;
  }
  return false;
}

export function roleCovered(profile: Profile, requirement: Requirement): boolean {
  if (profile.skills.length === 0 && profile.pastProjects.length === 0) return false;
  const hits = requirement.skills.filter((s) => skillCovered(profile, s)).length;
  if (requirement.skills.length === 0) return false;
  return hits / requirement.skills.length >= 0.45;
}

export function computeMissing(requirements: Requirement[], teammates: Teammate[]): MissingPiece[] {
  return requirements
    .filter((req) => !teammates.some((m) => roleCovered(m.profile, req)))
    .map((req) => ({
      requirementId: req.id,
      role: req.role,
      skills: req.skills,
      priority: req.priority,
      reason: req.reason,
      satisfies: req.hidden
        ? `Hidden requirement: ${req.role}`
        : `Project requirement: ${req.role}`,
      hidden: req.hidden,
    }))
    .sort((a, b) => {
      const rank = { high: 0, medium: 1, low: 2 };
      return rank[a.priority] - rank[b.priority];
    });
}

export function coveragePercent(requirements: Requirement[], teammates: Teammate[]): number {
  if (requirements.length === 0) return 100;
  const weight = { high: 3, medium: 2, low: 1 };
  let total = 0;
  let got = 0;
  for (const req of requirements) {
    const w = weight[req.priority];
    total += w;
    if (teammates.some((m) => roleCovered(m.profile, req))) got += w;
  }
  return Math.round((got / total) * 100);
}
