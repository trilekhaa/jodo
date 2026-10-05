import { coveragePercent, roleCovered } from "./missing";
import type {
  ProposedSeat,
  RankedCandidate,
  Requirement,
  TeamValidation,
  Teammate,
} from "./types";

export function proposeTeam(
  teammates: Teammate[],
  missing: { requirementId: string; role: string }[],
  matches: RankedCandidate[],
): ProposedSeat[] {
  const seats: ProposedSeat[] = teammates.map((m) => ({
    profileId: m.profileId,
    name: m.profile.name,
    avatarKey: m.profile.avatarKey,
    avatarUrl: m.profile.avatarUrl,
    role: m.role,
    source: m.source,
    matchScore: null,
    reasons: m.source === "owner" ? ["Idea owner"] : ["Already on the team"],
  }));
  const taken = new Set(seats.map((s) => s.profileId));
  for (const piece of missing) {
    const pick = matches
      .filter((m) => m.requirementId === piece.requirementId && !taken.has(m.profile.id))
      .sort((a, b) => b.score - a.score)[0];
    if (!pick) continue;
    taken.add(pick.profile.id);
    seats.push({
      profileId: pick.profile.id,
      name: pick.profile.name,
      avatarKey: pick.profile.avatarKey,
      avatarUrl: pick.profile.avatarUrl,
      role: piece.role,
      source: "recommended",
      matchScore: pick.score,
      reasons: pick.reasons,
    });
  }
  return seats;
}

export function validateTeam(requirements: Requirement[], teammates: Teammate[]): TeamValidation {
  const coveredRoles = requirements.filter((r) => teammates.some((m) => roleCovered(m.profile, r))).map((r) => r.role);
  const gaps = requirements
    .filter((r) => !teammates.some((m) => roleCovered(m.profile, r)))
    .map((r) => ({ role: r.role, priority: r.priority, reason: r.reason }));
  const domains = new Set(teammates.flatMap((m) => m.profile.domains));
  const complementarity: string[] = [];
  if (domains.size >= 3) complementarity.push("Domains on the team already span multiple sides of the idea.");
  const avail = teammates.filter((m) => m.profile.availability === "available").length;
  const availabilityNotes: string[] = [];
  if (teammates.some((m) => m.profile.availability === "limited")) {
    availabilityNotes.push("At least one person has limited availability — plan around that.");
  }
  if (avail === teammates.length && teammates.length > 0) {
    availabilityNotes.push("Everyone currently on the team is marked available.");
  }
  const uniqueRoles = new Set(teammates.map((m) => m.role));
  if (uniqueRoles.size === teammates.length && teammates.length > 1) {
    complementarity.push("Roles do not overlap — each person covers a different piece.");
  }
  return {
    coverage: coveragePercent(requirements, teammates),
    coveredRoles,
    gaps,
    complementarity,
    availabilityNotes,
  };
}
