export type Availability = "available" | "limited" | "unavailable";
export type SkillConfidence = "self_declared" | "evidence_supported" | "verified";
export type Priority = "high" | "medium" | "low";
export type RequestStatus = "pending" | "accepted" | "rejected" | "cancelled";
export type TaskStatus = "todo" | "doing" | "done";
export type IdeaStatus = "draft" | "analyzed" | "recruiting" | "active" | "complete";
export type EvidenceType = "project" | "certification" | "portfolio" | "previous_work" | "verification_task";
export type EvidenceStatus = "submitted" | "evidence_supported" | "verified";

export type ProfileSkill = {
  id: string;
  name: string;
  domain: string;
  confidence: SkillConfidence;
};

export type Evidence = {
  id: string;
  skillName: string;
  type: EvidenceType;
  title: string;
  detail: string;
  status: EvidenceStatus;
};

export type PastProject = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  year: number;
};

export type Profile = {
  id: string;
  userId: string;
  name: string;
  avatarKey: string;
  avatarUrl: string | null;
  bio: string;
  availability: Availability;
  experienceYears: number;
  onboardingComplete: boolean;
  isSeed: boolean;
  skills: ProfileSkill[];
  domains: string[];
  interests: string[];
  pastProjects: PastProject[];
  evidence: Evidence[];
  createdAt: string;
};

export type AnalyzedRole = {
  id: string;
  title: string;
  skills: string[];
  priority: Priority;
  reason: string;
  hidden: boolean;
};

export type HiddenRequirement = {
  id: string;
  title: string;
  reason: string;
  relatedRole: string;
  skills: string[];
};

export type IdeaAnalysis = {
  problem: string;
  goal: string;
  domains: string[];
  subDomains: string[];
  technologies: string[];
  capabilities: string[];
  constraints: string[];
  dependencies: string[];
  roles: AnalyzedRole[];
  hiddenRequirements: HiddenRequirement[];
  usedAi: boolean;
};

export type Requirement = {
  id: string;
  ideaId: string;
  role: string;
  skills: string[];
  priority: Priority;
  reason: string;
  hidden: boolean;
};

export type Teammate = {
  profileId: string;
  role: string;
  source: "owner" | "existing" | "joined";
  profile: Profile;
};

export type MissingPiece = {
  requirementId: string;
  role: string;
  skills: string[];
  priority: Priority;
  reason: string;
  satisfies: string;
  hidden: boolean;
};

export type MatchBreakdown = {
  skillRelevance: number;
  domainRelevance: number;
  projectExperience: number;
  evidenceConfidence: number;
  availability: number;
  interestAlignment: number;
};

export type RankedCandidate = {
  profile: Profile;
  requirementId: string;
  role: string;
  score: number;
  breakdown: MatchBreakdown;
  reasons: string[];
};

export type ProposedSeat = {
  profileId: string;
  name: string;
  avatarKey: string;
  avatarUrl: string | null;
  role: string;
  source: "owner" | "existing" | "recommended" | "joined";
  matchScore: number | null;
  reasons: string[];
};

export type TeamValidation = {
  coverage: number;
  coveredRoles: string[];
  gaps: { role: string; priority: Priority; reason: string }[];
  complementarity: string[];
  availabilityNotes: string[];
};

export type CollaborationRequest = {
  id: string;
  ideaId: string;
  ideaTitle: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  role: string;
  status: RequestStatus;
  createdAt: string;
};

export type Task = {
  id: string;
  ideaId: string;
  title: string;
  assigneeId: string | null;
  assigneeName: string | null;
  status: TaskStatus;
  createdAt: string;
};

export type IdeaSummary = {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  description: string;
  status: IdeaStatus;
  domains: string[];
  createdAt: string;
  teamSize: number;
  missingCount: number;
  coverage: number;
};

export type IdeaDetail = {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  description: string;
  domainHint: string;
  constraints: string;
  timeline: string;
  availabilityNeed: string;
  status: IdeaStatus;
  analysis: IdeaAnalysis | null;
  requirements: Requirement[];
  teammates: Teammate[];
  missing: MissingPiece[];
  matches: RankedCandidate[];
  proposedTeam: ProposedSeat[];
  validation: TeamValidation;
  requests: CollaborationRequest[];
  createdAt: string;
};

export type DashboardData = {
  profile: Profile;
  ideas: IdeaSummary[];
  missingHighlights: { ideaId: string; ideaTitle: string; pieces: MissingPiece[] }[];
  recommended: RankedCandidate[];
  incoming: CollaborationRequest[];
  outgoing: CollaborationRequest[];
  teams: IdeaSummary[];
};
