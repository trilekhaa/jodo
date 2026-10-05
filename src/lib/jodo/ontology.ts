export type RoleDef = {
  id: string;
  title: string;
  skills: string[];
  keywords: string[];
  domains: string[];
  defaultPriority: "high" | "medium" | "low";
  reason: string;
};

export const SKILL_ALIASES: Record<string, string[]> = {
  "machine learning": ["ml", "deep learning", "neural", "pytorch", "tensorflow", "model", "classifier"],
  "computer vision": ["cv", "image recognition", "satellite images", "imagery", "vision", "cnn"],
  gis: ["geospatial", "geographic", "mapping", "qgis", "arcgis", "spatial"],
  "remote sensing": ["satellite", "sentinel", "landsat", "earth observation", "eo"],
  agronomy: ["agriculture", "crop", "farming", "agri", "agronom"],
  "crop pathology": ["disease", "pest", "blight", "rust", "pathogen"],
  "full-stack": ["fullstack", "full stack", "web app", "end-to-end"],
  react: ["frontend", "ui", "web", "javascript", "typescript"],
  "node.js": ["backend", "api", "server", "express"],
  postgres: ["database", "sql", "data store"],
  "data engineering": ["pipeline", "etl", "data processing", "spark"],
  "model deployment": ["mlops", "inference", "serve model", "productionize"],
  "product design": ["ux", "ui design", "figma", "interface"],
  mobile: ["ios", "android", "react native", "flutter", "app"],
  nlp: ["language model", "llm", "chatbot", "transformers", "text"],
  iot: ["sensor", "embedded", "firmware", "hardware"],
  climate: ["carbon", "emissions", "weather", "sustainability"],
  health: ["clinical", "medical", "patient", "diagnos"],
  fintech: ["payments", "banking", "ledger", "wallet"],
};

export const DOMAIN_KEYWORDS: Record<string, string[]> = {
  Agriculture: ["crop", "farm", "soil", "agri", "harvest", "pest", "irrigation", "livestock", "grain"],
  "AI / ML": ["ml", "machine learning", "model", "neural", "ai", "classifier", "predict", "vision", "llm"],
  "Satellite Imaging": ["satellite", "sentinel", "landsat", "remote sensing", "earth observation", "orbital"],
  Health: ["health", "patient", "clinic", "medical", "diagnos", "hospital", "wellness"],
  Climate: ["climate", "carbon", "emission", "weather", "drought", "flood", "heat"],
  Education: ["learn", "tutor", "student", "classroom", "course", "school"],
  Fintech: ["payment", "bank", "loan", "wallet", "credit", "invoice"],
  "Social / Community": ["community", "social", "network", "forum", "together"],
  Mobility: ["transport", "route", "logistics", "delivery", "fleet", "ride"],
  Energy: ["solar", "grid", "battery", "energy", "power"],
  Commerce: ["shop", "marketplace", "store", "checkout", "retail"],
  Media: ["video", "podcast", "publish", "content", "stream"],
  Hardware: ["iot", "sensor", "device", "embedded", "robot"],
  Space: ["orbit", "spacecraft", "satellite bus", "ground station"],
};

export const ROLES: RoleDef[] = [
  {
    id: "ml-engineer",
    title: "ML Engineer",
    skills: ["Machine Learning", "Computer Vision", "Python", "Model evaluation"],
    keywords: ["ml", "machine learning", "model", "classifier", "detect", "predict", "neural", "vision"],
    domains: ["AI / ML"],
    defaultPriority: "high",
    reason: "Required to train and evaluate models that turn raw signals into decisions.",
  },
  {
    id: "gis-specialist",
    title: "GIS Specialist",
    skills: ["GIS", "Remote Sensing", "Geospatial analysis", "Satellite imagery"],
    keywords: ["satellite", "gis", "geospatial", "map", "remote sensing", "imagery", "spatial"],
    domains: ["Satellite Imaging", "Climate", "Agriculture"],
    defaultPriority: "high",
    reason: "Required for satellite and geospatial data processing.",
  },
  {
    id: "agriculture-expert",
    title: "Agriculture Expert",
    skills: ["Agronomy", "Crop pathology", "Field research"],
    keywords: ["crop", "farm", "disease", "pest", "soil", "agri", "harvest"],
    domains: ["Agriculture"],
    defaultPriority: "high",
    reason: "Required to ground the product in real agronomy and field conditions.",
  },
  {
    id: "full-stack",
    title: "Full-Stack Developer",
    skills: ["React", "Node.js", "PostgreSQL", "API design"],
    keywords: ["app", "platform", "dashboard", "web", "product", "user", "portal"],
    domains: ["Commerce", "Health", "Agriculture", "Education"],
    defaultPriority: "medium",
    reason: "Required to build the user-facing application and APIs.",
  },
  {
    id: "frontend",
    title: "Frontend Engineer",
    skills: ["React", "UI engineering", "Accessibility"],
    keywords: ["interface", "frontend", "dashboard", "web ui"],
    domains: [],
    defaultPriority: "medium",
    reason: "Required to craft a usable product surface.",
  },
  {
    id: "backend",
    title: "Backend Engineer",
    skills: ["Node.js", "PostgreSQL", "API design", "Auth"],
    keywords: ["backend", "api", "database", "server"],
    domains: [],
    defaultPriority: "medium",
    reason: "Required to persist data, auth, and business logic.",
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    skills: ["Data engineering", "Pipelines", "Python", "Warehousing"],
    keywords: ["pipeline", "etl", "ingest", "data processing", "warehouse"],
    domains: ["AI / ML"],
    defaultPriority: "medium",
    reason: "Required to move, clean, and store incoming data at scale.",
  },
  {
    id: "mlops",
    title: "MLOps Engineer",
    skills: ["Model deployment", "MLOps", "Cloud", "Monitoring"],
    keywords: ["deploy", "production", "inference", "mlops"],
    domains: ["AI / ML"],
    defaultPriority: "medium",
    reason: "Required to ship models reliably, not just train them.",
  },
  {
    id: "mobile",
    title: "Mobile Developer",
    skills: ["Mobile", "React Native", "Offline-first"],
    keywords: ["mobile", "ios", "android", "phone", "field app"],
    domains: [],
    defaultPriority: "medium",
    reason: "Required when the product must live in someone's pocket or in the field.",
  },
  {
    id: "designer",
    title: "Product Designer",
    skills: ["Product design", "UX research", "Prototyping"],
    keywords: ["design", "ux", "experience", "onboarding"],
    domains: [],
    defaultPriority: "low",
    reason: "Required to make the product understandable for non-technical users.",
  },
  {
    id: "nlp",
    title: "NLP Engineer",
    skills: ["NLP", "LLMs", "Evaluation", "Prompting"],
    keywords: ["language", "chatbot", "llm", "text", "summar", "translate"],
    domains: ["AI / ML", "Education", "Media"],
    defaultPriority: "high",
    reason: "Required to understand and generate language at product quality.",
  },
  {
    id: "hardware",
    title: "Hardware / IoT Engineer",
    skills: ["IoT", "Embedded", "Sensors", "Firmware"],
    keywords: ["sensor", "device", "iot", "hardware", "wearable", "drone"],
    domains: ["Hardware", "Energy", "Agriculture"],
    defaultPriority: "high",
    reason: "Required when the idea depends on physical sensing or actuation.",
  },
  {
    id: "climate",
    title: "Climate Scientist",
    skills: ["Climate science", "Earth systems", "Modeling"],
    keywords: ["climate", "carbon", "emission", "warming", "drought"],
    domains: ["Climate"],
    defaultPriority: "high",
    reason: "Required to keep climate claims scientifically honest.",
  },
  {
    id: "health-expert",
    title: "Healthcare Expert",
    skills: ["Clinical workflow", "Health privacy", "Care delivery"],
    keywords: ["patient", "clinic", "diagnos", "hospital", "care"],
    domains: ["Health"],
    defaultPriority: "high",
    reason: "Required to design for real clinical or care constraints.",
  },
  {
    id: "growth",
    title: "Growth Lead",
    skills: ["Growth", "Community", "Go-to-market"],
    keywords: ["users", "marketplace", "community", "launch", "adoption"],
    domains: ["Commerce", "Social / Community"],
    defaultPriority: "low",
    reason: "Required when the idea only works if two-sided adoption happens.",
  },
];

export type HiddenRule = {
  id: string;
  title: string;
  relatedRole: string;
  skills: string[];
  priority: "high" | "medium" | "low";
  reason: string;
  trigger: (text: string, explicit: Set<string>) => boolean;
};

function hasAny(text: string, words: string[]) {
  return words.some((w) => text.includes(w));
}

export const HIDDEN_RULES: HiddenRule[] = [
  {
    id: "geo-preprocess",
    title: "Satellite imagery preprocessing",
    relatedRole: "GIS Specialist",
    skills: ["Remote Sensing", "GIS", "Image preprocessing"],
    priority: "high",
    reason: "Raw satellite scenes need atmospheric correction, tiling, and cloud masking before any model can see a crop.",
    trigger: (t, explicit) =>
      hasAny(t, ["satellite", "imagery", "remote sensing"]) && !explicit.has("preprocess"),
  },
  {
    id: "geospatial-pipeline",
    title: "Geospatial data processing",
    relatedRole: "GIS Specialist",
    skills: ["GIS", "Geospatial analysis", "Data engineering"],
    priority: "high",
    reason: "Geospatial rasters and vectors need a dedicated processing path, not a generic backend.",
    trigger: (t) => hasAny(t, ["satellite", "gis", "map", "geospatial", "remote sensing"]),
  },
  {
    id: "model-deploy",
    title: "Model deployment",
    relatedRole: "MLOps Engineer",
    skills: ["Model deployment", "MLOps", "Monitoring"],
    priority: "medium",
    reason: "A trained detector is not a product until it can be served, versioned, and watched in production.",
    trigger: (t, explicit) =>
      hasAny(t, ["ml", "machine learning", "detect", "model", "classifier", "ai"]) &&
      !explicit.has("deploy"),
  },
  {
    id: "data-pipeline",
    title: "Data pipeline",
    relatedRole: "Data Engineer",
    skills: ["Data engineering", "Pipelines", "Python"],
    priority: "medium",
    reason: "Continuous data (images, sensors, logs) needs ingestion, validation, and storage before modeling.",
    trigger: (t) => hasAny(t, ["satellite", "sensor", "stream", "detect", "images", "iot"]),
  },
  {
    id: "gis-knowledge",
    title: "GIS knowledge",
    relatedRole: "GIS Specialist",
    skills: ["GIS"],
    priority: "high",
    reason: "Coordinate systems, resolution, and spatial joins are easy to get silently wrong.",
    trigger: (t, explicit) =>
      hasAny(t, ["satellite", "map", "geospatial", "location"]) && !explicit.has("gis"),
  },
  {
    id: "field-ux",
    title: "Field-first mobile experience",
    relatedRole: "Mobile Developer",
    skills: ["Mobile", "Offline-first"],
    priority: "medium",
    reason: "People who work outdoors often have patchy connectivity and need the product in their pocket.",
    trigger: (t) => hasAny(t, ["farm", "field", "crop", "worker", "driver", "on-site"]),
  },
  {
    id: "privacy",
    title: "Privacy and compliance",
    relatedRole: "Healthcare Expert",
    skills: ["Health privacy", "Security"],
    priority: "high",
    reason: "Health and identity data cannot be treated like ordinary app analytics.",
    trigger: (t) => hasAny(t, ["patient", "health", "clinic", "medical", "diagnos"]),
  },
  {
    id: "payments",
    title: "Payments and ledger integrity",
    relatedRole: "Backend Engineer",
    skills: ["Payments", "PostgreSQL", "Security"],
    priority: "high",
    reason: "Marketplaces and wallets fail if money movement is an afterthought.",
    trigger: (t) => hasAny(t, ["marketplace", "pay", "wallet", "checkout", "payout"]),
  },
  {
    id: "eval",
    title: "Language-model evaluation",
    relatedRole: "NLP Engineer",
    skills: ["Evaluation", "NLP", "Prompting"],
    priority: "medium",
    reason: "LLM features need eval sets and failure analysis, not just a prompt.",
    trigger: (t) => hasAny(t, ["chatbot", "llm", "tutor", "summar", "copilot"]),
  },
  {
    id: "trust",
    title: "Trust and safety",
    relatedRole: "Growth Lead",
    skills: ["Community", "Moderation"],
    priority: "medium",
    reason: "Social products collapse without moderation, reporting, and abuse response.",
    trigger: (t) => hasAny(t, ["community", "social", "forum", "chat", "network"]),
  },
  {
    id: "firmware",
    title: "Firmware and device reliability",
    relatedRole: "Hardware / IoT Engineer",
    skills: ["Firmware", "Embedded", "IoT"],
    priority: "high",
    reason: "Hardware ideas live or die on firmware, power, and field reliability.",
    trigger: (t) => hasAny(t, ["sensor", "iot", "wearable", "drone", "device"]),
  },
];

export function normalizeText(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9+.# ]+/g, " ").replace(/\s+/g, " ").trim();
}

export function skillAliasesFor(name: string): string[] {
  const key = name.toLowerCase();
  const extra = SKILL_ALIASES[key] ?? [];
  return [key, ...extra];
}
