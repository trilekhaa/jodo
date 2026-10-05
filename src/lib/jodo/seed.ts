import type { Sql } from "@/lib/db";
import { analyzeIdeaLocal } from "./analyze";
import type { Availability, SkillConfidence } from "./types";

type SeedSkill = { name: string; domain: string; confidence: SkillConfidence };
type SeedPerson = {
  id: string;
  name: string;
  avatarKey: string;
  bio: string;
  availability: Availability;
  experienceYears: number;
  skills: SeedSkill[];
  domains: string[];
  interests: string[];
  projects: { id: string; title: string; description: string; skills: string[]; year: number }[];
  evidence: { id: string; skillName: string; type: string; title: string; detail: string; status: string }[];
};

const PEOPLE: SeedPerson[] = [
  {
    id: "seed-arjun",
    name: "Arjun Mehta",
    avatarKey: "orbit",
    bio: "Maps what satellites see into decisions people can actually use.",
    availability: "available",
    experienceYears: 6,
    skills: [
      { name: "GIS", domain: "Satellite Imaging", confidence: "verified" },
      { name: "Remote Sensing", domain: "Satellite Imaging", confidence: "evidence_supported" },
      { name: "Satellite imagery", domain: "Satellite Imaging", confidence: "verified" },
      { name: "Python", domain: "AI / ML", confidence: "evidence_supported" },
      { name: "Geospatial analysis", domain: "Climate", confidence: "verified" },
    ],
    domains: ["Agriculture", "Climate", "Satellite Imaging"],
    interests: ["food security", "drought", "smallholder farms", "earth observation"],
    projects: [
      {
        id: "p-arjun-1",
        title: "Village-level drought maps from Sentinel-2",
        description: "Built a GIS pipeline that turns Sentinel-2 scenes into drought risk layers for 400 villages.",
        skills: ["GIS", "Remote Sensing", "Satellite imagery", "Python"],
        year: 2024,
      },
      {
        id: "p-arjun-2",
        title: "Flood-risk GIS for Kerala",
        description: "Combined DEM, rainfall, and satellite water indices into a public flood map.",
        skills: ["GIS", "Geospatial analysis"],
        year: 2023,
      },
    ],
    evidence: [
      {
        id: "e-arjun-1",
        skillName: "GIS",
        type: "project",
        title: "Sentinel drought atlas",
        detail: "Open map tiles + processing notebook",
        status: "verified",
      },
      {
        id: "e-arjun-2",
        skillName: "Satellite imagery",
        type: "portfolio",
        title: "Scene preprocessing toolkit",
        detail: "Cloud mask, mosaic, and index generation",
        status: "evidence_supported",
      },
    ],
  },
  {
    id: "seed-riya",
    name: "Riya Sen",
    avatarKey: "split",
    bio: "Ships farmer-facing products that do not feel like research demos.",
    availability: "available",
    experienceYears: 5,
    skills: [
      { name: "React", domain: "Product", confidence: "verified" },
      { name: "Node.js", domain: "Product", confidence: "verified" },
      { name: "PostgreSQL", domain: "Product", confidence: "evidence_supported" },
      { name: "API design", domain: "Product", confidence: "evidence_supported" },
      { name: "UI engineering", domain: "Product", confidence: "self_declared" },
    ],
    domains: ["Agriculture", "Health", "SaaS"],
    interests: ["climate tech", "farmer tools", "rural connectivity"],
    projects: [
      {
        id: "p-riya-1",
        title: "KrishiMitra farm advisory",
        description: "Full-stack advisory app used by 12,000 farmers, with offline-first field notes.",
        skills: ["React", "Node.js", "PostgreSQL"],
        year: 2025,
      },
      {
        id: "p-riya-2",
        title: "ClinicOS patient portal",
        description: "Web portal for rural clinics: records, reminders, and a simple API.",
        skills: ["React", "API design"],
        year: 2023,
      },
    ],
    evidence: [
      {
        id: "e-riya-1",
        skillName: "React",
        type: "project",
        title: "KrishiMitra production app",
        detail: "Live product, not a prototype",
        status: "verified",
      },
    ],
  },
  {
    id: "seed-karan",
    name: "Karan Iyer",
    avatarKey: "petal",
    bio: "Agronomist who still walks fields. Translates pathology into product language.",
    availability: "available",
    experienceYears: 12,
    skills: [
      { name: "Agronomy", domain: "Agriculture", confidence: "verified" },
      { name: "Crop pathology", domain: "Agriculture", confidence: "verified" },
      { name: "Field research", domain: "Agriculture", confidence: "evidence_supported" },
      { name: "Farmer networks", domain: "Agriculture", confidence: "evidence_supported" },
    ],
    domains: ["Agriculture", "Sustainability"],
    interests: ["crop disease", "smallholders", "extension services"],
    projects: [
      {
        id: "p-karan-1",
        title: "ICAR wheat rust survey",
        description: "Multi-state rust survey with labeled field photos used later for vision models.",
        skills: ["Crop pathology", "Field research"],
        year: 2022,
      },
      {
        id: "p-karan-2",
        title: "Smallholder pest playbooks",
        description: "Wrote practical pest and disease playbooks for three staple crops.",
        skills: ["Agronomy", "Crop pathology"],
        year: 2024,
      },
    ],
    evidence: [
      {
        id: "e-karan-1",
        skillName: "Crop pathology",
        type: "certification",
        title: "Plant pathology fellowship",
        detail: "Verified academic + field credential",
        status: "verified",
      },
    ],
  },
  {
    id: "seed-meera",
    name: "Meera Kapoor",
    avatarKey: "tile",
    bio: "Trains vision models on messy real-world images, then makes them small enough to ship.",
    availability: "limited",
    experienceYears: 7,
    skills: [
      { name: "Machine Learning", domain: "AI / ML", confidence: "verified" },
      { name: "Computer Vision", domain: "AI / ML", confidence: "verified" },
      { name: "PyTorch", domain: "AI / ML", confidence: "evidence_supported" },
      { name: "Data pipelines", domain: "AI / ML", confidence: "evidence_supported" },
    ],
    domains: ["Agriculture", "Health", "AI / ML"],
    interests: ["crop yield", "medical imaging", "tiny models"],
    projects: [
      {
        id: "p-meera-1",
        title: "LeafNet disease classifier",
        description: "CNN for leaf disease with 91% field accuracy across four crops.",
        skills: ["Machine Learning", "Computer Vision", "PyTorch"],
        year: 2024,
      },
      {
        id: "p-meera-2",
        title: "Satellite crop-yield models",
        description: "Fused satellite indices with weather to estimate yield at block level.",
        skills: ["Machine Learning", "Satellite imagery"],
        year: 2023,
      },
    ],
    evidence: [
      {
        id: "e-meera-1",
        skillName: "Computer Vision",
        type: "project",
        title: "LeafNet paper + weights",
        detail: "Open weights and evaluation set",
        status: "verified",
      },
    ],
  },
  {
    id: "seed-aisha",
    name: "Aisha Rahman",
    avatarKey: "arc",
    bio: "Designs products for first-time digital users without talking down to them.",
    availability: "available",
    experienceYears: 8,
    skills: [
      { name: "Product design", domain: "Design", confidence: "verified" },
      { name: "UX research", domain: "Design", confidence: "evidence_supported" },
      { name: "Prototyping", domain: "Design", confidence: "evidence_supported" },
    ],
    domains: ["Agriculture", "Education", "Health"],
    interests: ["rural UX", "trust", "onboarding"],
    projects: [
      {
        id: "p-aisha-1",
        title: "Voice-first farm ledger",
        description: "Designed a voice-assisted ledger for farmers who prefer talking to typing.",
        skills: ["Product design", "UX research"],
        year: 2024,
      },
    ],
    evidence: [
      {
        id: "e-aisha-1",
        skillName: "Product design",
        type: "portfolio",
        title: "Selected case studies",
        detail: "Three shipped rural products",
        status: "evidence_supported",
      },
    ],
  },
  {
    id: "seed-leo",
    name: "Leo Zhang",
    avatarKey: "stack",
    bio: "Mobile engineer who obsesses over offline, battery, and cameras that work in harsh light.",
    availability: "available",
    experienceYears: 6,
    skills: [
      { name: "Mobile", domain: "Product", confidence: "verified" },
      { name: "React Native", domain: "Product", confidence: "verified" },
      { name: "Offline-first", domain: "Product", confidence: "evidence_supported" },
    ],
    domains: ["Agriculture", "Mobility", "Health"],
    interests: ["field tools", "camera capture", "sync"],
    projects: [
      {
        id: "p-leo-1",
        title: "ScoutCam field app",
        description: "Android app for agronomists to capture geotagged crop photos offline.",
        skills: ["Mobile", "Offline-first", "GIS"],
        year: 2025,
      },
    ],
    evidence: [
      {
        id: "e-leo-1",
        skillName: "Mobile",
        type: "project",
        title: "ScoutCam Play listing",
        detail: "Production Android app",
        status: "verified",
      },
    ],
  },
  {
    id: "seed-priya",
    name: "Priya Nair",
    avatarKey: "wave",
    bio: "NLP person who treats evaluation as the product, not a slide.",
    availability: "available",
    experienceYears: 5,
    skills: [
      { name: "NLP", domain: "AI / ML", confidence: "verified" },
      { name: "LLMs", domain: "AI / ML", confidence: "evidence_supported" },
      { name: "Evaluation", domain: "AI / ML", confidence: "verified" },
      { name: "Prompting", domain: "AI / ML", confidence: "self_declared" },
    ],
    domains: ["Education", "AI / ML", "Media"],
    interests: ["tutoring", "indic languages", "eval"],
    projects: [
      {
        id: "p-priya-1",
        title: "Bhasha tutor eval harness",
        description: "Built an eval set and tutor loop for Hindi/Tamil homework help.",
        skills: ["NLP", "LLMs", "Evaluation"],
        year: 2025,
      },
    ],
    evidence: [
      {
        id: "e-priya-1",
        skillName: "NLP",
        type: "project",
        title: "Open eval harness",
        detail: "Public fixtures + scoring",
        status: "verified",
      },
    ],
  },
  {
    id: "seed-sofia",
    name: "Sofia Alvarez",
    avatarKey: "ring",
    bio: "Climate scientist who will not let a product overclaim.",
    availability: "limited",
    experienceYears: 9,
    skills: [
      { name: "Climate science", domain: "Climate", confidence: "verified" },
      { name: "Earth systems", domain: "Climate", confidence: "verified" },
      { name: "Modeling", domain: "Climate", confidence: "evidence_supported" },
    ],
    domains: ["Climate", "Energy", "Agriculture"],
    interests: ["heat", "water", "adaptation"],
    projects: [
      {
        id: "p-sofia-1",
        title: "Urban heat atlas",
        description: "Downscaled heat-risk layers for 30 cities using satellite LST.",
        skills: ["Climate science", "Satellite imagery", "GIS"],
        year: 2024,
      },
    ],
    evidence: [
      {
        id: "e-sofia-1",
        skillName: "Climate science",
        type: "certification",
        title: "Published heat atlas",
        detail: "Peer-reviewed methods",
        status: "verified",
      },
    ],
  },
  {
    id: "seed-noah",
    name: "Noah Okonkwo",
    avatarKey: "node",
    bio: "Hardware that survives dust, heat, and being dropped off a truck.",
    availability: "available",
    experienceYears: 10,
    skills: [
      { name: "IoT", domain: "Hardware", confidence: "verified" },
      { name: "Embedded", domain: "Hardware", confidence: "verified" },
      { name: "Sensors", domain: "Hardware", confidence: "evidence_supported" },
      { name: "Firmware", domain: "Hardware", confidence: "evidence_supported" },
    ],
    domains: ["Hardware", "Agriculture", "Energy"],
    interests: ["soil sensors", "solar", "repairability"],
    projects: [
      {
        id: "p-noah-1",
        title: "Soil-moisture mesh",
        description: "Low-power soil sensors with a repairable radio mesh for farms.",
        skills: ["IoT", "Firmware", "Sensors"],
        year: 2023,
      },
    ],
    evidence: [
      {
        id: "e-noah-1",
        skillName: "IoT",
        type: "previous_work",
        title: "Field deployment in Kaduna",
        detail: "180 devices, 11 months uptime",
        status: "verified",
      },
    ],
  },
  {
    id: "seed-dev",
    name: "Dev Patel",
    avatarKey: "grid",
    bio: "Data engineer who likes boring pipelines that never page anyone at 2am.",
    availability: "available",
    experienceYears: 7,
    skills: [
      { name: "Data engineering", domain: "AI / ML", confidence: "verified" },
      { name: "Pipelines", domain: "AI / ML", confidence: "verified" },
      { name: "Python", domain: "AI / ML", confidence: "evidence_supported" },
      { name: "Warehousing", domain: "AI / ML", confidence: "evidence_supported" },
    ],
    domains: ["AI / ML", "Climate", "Commerce"],
    interests: ["data quality", "geospatial ETL"],
    projects: [
      {
        id: "p-dev-1",
        title: "Raster-to-warehouse pipeline",
        description: "Ingests satellite rasters into a queryable warehouse with validation gates.",
        skills: ["Data engineering", "Pipelines", "GIS"],
        year: 2024,
      },
    ],
    evidence: [
      {
        id: "e-dev-1",
        skillName: "Data engineering",
        type: "project",
        title: "Open pipeline templates",
        detail: "Airflow-style DAGs for rasters",
        status: "evidence_supported",
      },
    ],
  },
  {
    id: "seed-hana",
    name: "Hana Suzuki",
    avatarKey: "bloom",
    bio: "MLOps for models that have to run near the field, not only in a notebook.",
    availability: "available",
    experienceYears: 6,
    skills: [
      { name: "Model deployment", domain: "AI / ML", confidence: "verified" },
      { name: "MLOps", domain: "AI / ML", confidence: "verified" },
      { name: "Cloud", domain: "AI / ML", confidence: "evidence_supported" },
      { name: "Monitoring", domain: "AI / ML", confidence: "evidence_supported" },
    ],
    domains: ["AI / ML", "Health"],
    interests: ["edge inference", "drift", "reliability"],
    projects: [
      {
        id: "p-hana-1",
        title: "Edge crop-model serving",
        description: "Packed a vision model for offline inference on mid-range Android.",
        skills: ["Model deployment", "MLOps", "Mobile"],
        year: 2025,
      },
    ],
    evidence: [
      {
        id: "e-hana-1",
        skillName: "MLOps",
        type: "project",
        title: "Serving runbook",
        detail: "Canary + rollback for vision models",
        status: "verified",
      },
    ],
  },
  {
    id: "seed-jonah",
    name: "Jonah Blake",
    avatarKey: "spark",
    bio: "Gets two-sided products to their first hundred honest users.",
    availability: "limited",
    experienceYears: 8,
    skills: [
      { name: "Growth", domain: "Commerce", confidence: "evidence_supported" },
      { name: "Community", domain: "Social / Community", confidence: "evidence_supported" },
      { name: "Go-to-market", domain: "Commerce", confidence: "self_declared" },
    ],
    domains: ["Commerce", "Social / Community", "Education"],
    interests: ["creator tools", "local commerce"],
    projects: [
      {
        id: "p-jonah-1",
        title: "Sunday market network",
        description: "Grew a hyperlocal vendor network across 9 neighborhoods.",
        skills: ["Growth", "Community"],
        year: 2024,
      },
    ],
    evidence: [
      {
        id: "e-jonah-1",
        skillName: "Growth",
        type: "previous_work",
        title: "Launch retrospective",
        detail: "First 100 vendors, documented",
        status: "evidence_supported",
      },
    ],
  },
];

async function insertPerson(sql: Sql, person: SeedPerson) {
  await sql`
    insert into profiles (id, user_id, name, avatar_key, bio, availability, experience_years, onboarding_complete, is_seed)
    values (
      ${person.id}, ${person.id}, ${person.name}, ${person.avatarKey}, ${person.bio},
      ${person.availability}, ${person.experienceYears}, true, true
    )
    on conflict (id) do nothing
  `;
  for (const [i, skill] of person.skills.entries()) {
    await sql`
      insert into profile_skills (id, profile_id, name, domain, confidence)
      values (${`${person.id}-sk-${i}`}, ${person.id}, ${skill.name}, ${skill.domain}, ${skill.confidence})
      on conflict (id) do nothing
    `;
  }
  for (const [i, domain] of person.domains.entries()) {
    await sql`
      insert into profile_domains (id, profile_id, name)
      values (${`${person.id}-d-${i}`}, ${person.id}, ${domain})
      on conflict (id) do nothing
    `;
  }
  for (const [i, interest] of person.interests.entries()) {
    await sql`
      insert into profile_interests (id, profile_id, name)
      values (${`${person.id}-i-${i}`}, ${person.id}, ${interest})
      on conflict (id) do nothing
    `;
  }
  for (const project of person.projects) {
    await sql`
      insert into past_projects (id, profile_id, title, description, skills_json, year)
      values (${project.id}, ${person.id}, ${project.title}, ${project.description}, ${JSON.stringify(project.skills)}, ${project.year})
      on conflict (id) do nothing
    `;
  }
  for (const ev of person.evidence) {
    await sql`
      insert into evidence (id, profile_id, skill_name, type, title, detail, status)
      values (${ev.id}, ${person.id}, ${ev.skillName}, ${ev.type}, ${ev.title}, ${ev.detail}, ${ev.status})
      on conflict (id) do nothing
    `;
  }
}

async function insertSeedIdea(
  sql: Sql,
  idea: {
    id: string;
    ownerId: string;
    title: string;
    description: string;
    members: { profileId: string; role: string; source: string }[];
  },
) {
  const analysis = analyzeIdeaLocal({ title: idea.title, description: idea.description });
  await sql`
    insert into ideas (id, owner_id, title, description, status, analysis_json)
    values (${idea.id}, ${idea.ownerId}, ${idea.title}, ${idea.description}, 'recruiting', ${JSON.stringify(analysis)})
    on conflict (id) do nothing
  `;
  for (const [i, role] of analysis.roles.entries()) {
    await sql`
      insert into idea_requirements (id, idea_id, role, skills_json, priority, reason, hidden)
      values (
        ${`${idea.id}-req-${i}`}, ${idea.id}, ${role.title}, ${JSON.stringify(role.skills)},
        ${role.priority}, ${role.reason}, ${role.hidden}
      )
      on conflict (id) do nothing
    `;
  }
  for (const [i, hidden] of analysis.hiddenRequirements.entries()) {
    const already = analysis.roles.some((r) => r.title === hidden.relatedRole);
    if (already) continue;
    await sql`
      insert into idea_requirements (id, idea_id, role, skills_json, priority, reason, hidden)
      values (
        ${`${idea.id}-hid-${i}`}, ${idea.id}, ${hidden.relatedRole}, ${JSON.stringify(hidden.skills)},
        'medium', ${hidden.reason}, true
      )
      on conflict (id) do nothing
    `;
  }
  for (const [i, member] of idea.members.entries()) {
    await sql`
      insert into idea_members (id, idea_id, profile_id, role, source)
      values (${`${idea.id}-m-${i}`}, ${idea.id}, ${member.profileId}, ${member.role}, ${member.source})
      on conflict (id) do nothing
    `;
  }
}

export async function ensureSeed(sql: Sql) {
  const rows = await sql<{ c: number }>`select count(*)::int as c from profiles where is_seed = true`;
  if ((rows[0]?.c ?? 0) > 0) return;
  for (const person of PEOPLE) {
    await insertPerson(sql, person);
  }
  await insertSeedIdea(sql, {
    id: "idea-heat",
    ownerId: "seed-sofia",
    title: "Shade the city before the next heat wave",
    description:
      "I want a public map that shows which neighborhoods will overheat this summer and which trees or cool roofs would help first.",
    members: [{ profileId: "seed-sofia", role: "Climate Scientist", source: "owner" }],
  });
  await insertSeedIdea(sql, {
    id: "idea-tutor",
    ownerId: "seed-priya",
    title: "A tutor that speaks the house language",
    description:
      "I want an after-school tutor that can help with homework in Hindi and Tamil, keep parents in the loop, and actually measure if kids improve.",
    members: [{ profileId: "seed-priya", role: "NLP Engineer", source: "owner" }],
  });
  await insertSeedIdea(sql, {
    id: "idea-soil",
    ownerId: "seed-noah",
    title: "Soil that can text you",
    description:
      "I want cheap soil-moisture sensors that farmers can repair themselves, with a simple phone alert when irrigation is actually needed.",
    members: [{ profileId: "seed-noah", role: "Hardware / IoT Engineer", source: "owner" }],
  });
}
