import {
  DOMAIN_KEYWORDS,
  HIDDEN_RULES,
  ROLES,
  normalizeText,
  type RoleDef,
} from "./ontology";
import type { AnalyzedRole, HiddenRequirement, IdeaAnalysis, Priority } from "./types";

export type AnalyzeInput = {
  title: string;
  description: string;
  domainHint?: string;
  constraints?: string;
  timeline?: string;
};

function unique(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const key = item.toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function scoreRole(role: RoleDef, text: string, hint: string): number {
  let score = 0;
  for (const kw of role.keywords) {
    if (text.includes(kw)) score += 2;
  }
  for (const d of role.domains) {
    if (hint.includes(d.toLowerCase()) || text.includes(d.toLowerCase())) score += 1.5;
  }
  return score;
}

function problemLine(title: string, description: string): string {
  const compact = description.trim().replace(/\s+/g, " ");
  if (compact.length < 80) return compact || title;
  const first = compact.split(/(?<=[.!?])\s/)[0] ?? compact;
  return first.slice(0, 180);
}

function goalLine(description: string, title: string): string {
  const lower = description.toLowerCase();
  if (lower.includes("detect")) return "Detect, surface, and act on the stated problem with a working product.";
  if (lower.includes("connect") || lower.includes("marketplace"))
    return "Connect the two sides of this idea and make the exchange trustworthy.";
  if (lower.includes("learn") || lower.includes("tutor"))
    return "Help people learn faster with a product they will actually finish.";
  return `Turn “${title}” into a team that can ship a first working version.`;
}

export function analyzeIdeaLocal(input: AnalyzeInput): IdeaAnalysis {
  const blob = `${input.title}\n${input.description}\n${input.domainHint ?? ""}\n${input.constraints ?? ""}`;
  const text = normalizeText(blob);
  const hint = normalizeText(input.domainHint ?? "");
  const explicit = new Set(text.split(" "));

  const domains = unique(
    Object.entries(DOMAIN_KEYWORDS)
      .filter(([name, kws]) => hint.includes(name.toLowerCase()) || kws.some((k) => text.includes(k)))
      .map(([name]) => name),
  );

  const subDomains: string[] = [];
  if (text.includes("satellite") || text.includes("remote sensing")) subDomains.push("Earth observation");
  if (text.includes("disease") || text.includes("patholog")) subDomains.push("Plant pathology");
  if (text.includes("computer vision") || text.includes("images") || text.includes("imagery"))
    subDomains.push("Computer vision");
  if (text.includes("llm") || text.includes("chatbot")) subDomains.push("Language models");
  if (text.includes("sensor") || text.includes("iot")) subDomains.push("Sensing");

  const technologies: string[] = [];
  if (text.includes("satellite") || text.includes("sentinel") || text.includes("landsat"))
    technologies.push("Satellite imagery");
  if (text.includes("ml") || text.includes("machine learning") || text.includes("detect") || text.includes("ai"))
    technologies.push("Machine learning");
  if (text.includes("gis") || text.includes("geospatial") || text.includes("map")) technologies.push("GIS");
  if (text.includes("react") || text.includes("web") || text.includes("app") || text.includes("platform"))
    technologies.push("Web application");
  if (text.includes("mobile") || text.includes("android") || text.includes("ios")) technologies.push("Mobile");
  if (text.includes("llm") || text.includes("gpt") || text.includes("grok")) technologies.push("Large language models");
  if (technologies.length === 0) technologies.push("Software product");

  const scored = ROLES.map((role) => ({ role, score: scoreRole(role, text, hint) }))
    .filter((row) => row.score >= 2)
    .sort((a, b) => b.score - a.score);

  // Always include a shipping role if anything product-like exists
  const hasShipping = scored.some((r) => r.role.id === "full-stack" || r.role.id === "frontend" || r.role.id === "mobile");
  if (!hasShipping && scored.length > 0) {
    const fs = ROLES.find((r) => r.id === "full-stack");
    if (fs) scored.push({ role: fs, score: 2 });
  }

  const roles: AnalyzedRole[] = scored.slice(0, 6).map((row) => {
    let priority: Priority = row.role.defaultPriority;
    if (row.score >= 6) priority = "high";
    else if (row.score < 3 && priority === "high") priority = "medium";
    return {
      id: row.role.id,
      title: row.role.title,
      skills: row.role.skills,
      priority,
      reason: row.role.reason,
      hidden: false,
    };
  });

  const hiddenRequirements: HiddenRequirement[] = [];
  for (const rule of HIDDEN_RULES) {
    if (!rule.trigger(text, explicit)) continue;
    hiddenRequirements.push({
      id: rule.id,
      title: rule.title,
      reason: rule.reason,
      relatedRole: rule.relatedRole,
      skills: rule.skills,
    });
    const existing = roles.find((r) => r.title === rule.relatedRole);
    if (!existing) {
      const def = ROLES.find((r) => r.title === rule.relatedRole);
      if (def) {
        roles.push({
          id: def.id,
          title: def.title,
          skills: unique([...def.skills, ...rule.skills]),
          priority: rule.priority,
          reason: rule.reason,
          hidden: true,
        });
      }
    }
  }

  const capabilities = unique([
    ...roles.flatMap((r) => r.skills),
    ...hiddenRequirements.flatMap((h) => h.skills),
  ]);

  const constraints: string[] = [];
  if (input.constraints?.trim()) constraints.push(input.constraints.trim());
  if (input.timeline?.trim()) constraints.push(`Timeline: ${input.timeline.trim()}`);
  if (text.includes("offline")) constraints.push("Must work with limited connectivity.");
  if (text.includes("smallholder") || text.includes("farmer"))
    constraints.push("Must be usable by people who are not GIS or ML specialists.");

  const dependencies: string[] = [];
  if (text.includes("satellite")) dependencies.push("Access to satellite scenes (Sentinel, Landsat, or commercial).");
  if (text.includes("ml") || text.includes("detect")) dependencies.push("Labeled examples for the detection task.");
  if (text.includes("marketplace")) dependencies.push("Liquidity on both sides of the marketplace.");

  return {
    problem: problemLine(input.title, input.description),
    goal: goalLine(input.description, input.title),
    domains: domains.length ? domains : hint ? [input.domainHint!.trim()] : ["General"],
    subDomains: unique(subDomains),
    technologies: unique(technologies),
    capabilities,
    constraints,
    dependencies,
    roles,
    hiddenRequirements,
    usedAi: false,
  };
}

export function mergeAnalyses(local: IdeaAnalysis, remote: Partial<IdeaAnalysis> | null): IdeaAnalysis {
  if (!remote) return local;
  const rolesByTitle = new Map(local.roles.map((r) => [r.title.toLowerCase(), r]));
  for (const role of remote.roles ?? []) {
    const key = role.title.toLowerCase();
    if (!rolesByTitle.has(key)) rolesByTitle.set(key, { ...role, hidden: role.hidden ?? false });
  }
  const hiddenByTitle = new Map(local.hiddenRequirements.map((h) => [h.title.toLowerCase(), h]));
  for (const hidden of remote.hiddenRequirements ?? []) {
    const key = hidden.title.toLowerCase();
    if (!hiddenByTitle.has(key)) hiddenByTitle.set(key, hidden);
  }
  return {
    problem: remote.problem || local.problem,
    goal: remote.goal || local.goal,
    domains: unique([...(remote.domains ?? []), ...local.domains]),
    subDomains: unique([...(remote.subDomains ?? []), ...local.subDomains]),
    technologies: unique([...(remote.technologies ?? []), ...local.technologies]),
    capabilities: unique([...(remote.capabilities ?? []), ...local.capabilities]),
    constraints: unique([...(remote.constraints ?? []), ...local.constraints]),
    dependencies: unique([...(remote.dependencies ?? []), ...local.dependencies]),
    roles: [...rolesByTitle.values()],
    hiddenRequirements: [...hiddenByTitle.values()],
    usedAi: true,
  };
}
