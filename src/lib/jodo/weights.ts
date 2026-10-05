/** Configurable match weights. Sum should be 1. */
export const MATCH_WEIGHTS = {
  skillRelevance: 0.3,
  domainRelevance: 0.2,
  projectExperience: 0.15,
  evidenceConfidence: 0.15,
  availability: 0.1,
  interestAlignment: 0.1,
} as const;

export const CONFIDENCE_WEIGHT: Record<string, number> = {
  self_declared: 0.58,
  evidence_supported: 0.84,
  verified: 1,
};

export const AVAILABILITY_WEIGHT: Record<string, number> = {
  available: 1,
  limited: 0.62,
  unavailable: 0.12,
};
