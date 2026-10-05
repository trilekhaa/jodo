import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-CMa7rnpH.mjs";
import { t as authMiddleware } from "./middleware-CHqmpfGL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-BcKaQ7DB.js
var SKILL_ALIASES = {
	"machine learning": [
		"ml",
		"deep learning",
		"neural",
		"pytorch",
		"tensorflow",
		"model",
		"classifier"
	],
	"computer vision": [
		"cv",
		"image recognition",
		"satellite images",
		"imagery",
		"vision",
		"cnn"
	],
	gis: [
		"geospatial",
		"geographic",
		"mapping",
		"qgis",
		"arcgis",
		"spatial"
	],
	"remote sensing": [
		"satellite",
		"sentinel",
		"landsat",
		"earth observation",
		"eo"
	],
	agronomy: [
		"agriculture",
		"crop",
		"farming",
		"agri",
		"agronom"
	],
	"crop pathology": [
		"disease",
		"pest",
		"blight",
		"rust",
		"pathogen"
	],
	"full-stack": [
		"fullstack",
		"full stack",
		"web app",
		"end-to-end"
	],
	react: [
		"frontend",
		"ui",
		"web",
		"javascript",
		"typescript"
	],
	"node.js": [
		"backend",
		"api",
		"server",
		"express"
	],
	postgres: [
		"database",
		"sql",
		"data store"
	],
	"data engineering": [
		"pipeline",
		"etl",
		"data processing",
		"spark"
	],
	"model deployment": [
		"mlops",
		"inference",
		"serve model",
		"productionize"
	],
	"product design": [
		"ux",
		"ui design",
		"figma",
		"interface"
	],
	mobile: [
		"ios",
		"android",
		"react native",
		"flutter",
		"app"
	],
	nlp: [
		"language model",
		"llm",
		"chatbot",
		"transformers",
		"text"
	],
	iot: [
		"sensor",
		"embedded",
		"firmware",
		"hardware"
	],
	climate: [
		"carbon",
		"emissions",
		"weather",
		"sustainability"
	],
	health: [
		"clinical",
		"medical",
		"patient",
		"diagnos"
	],
	fintech: [
		"payments",
		"banking",
		"ledger",
		"wallet"
	]
};
var DOMAIN_KEYWORDS = {
	Agriculture: [
		"crop",
		"farm",
		"soil",
		"agri",
		"harvest",
		"pest",
		"irrigation",
		"livestock",
		"grain"
	],
	"AI / ML": [
		"ml",
		"machine learning",
		"model",
		"neural",
		"ai",
		"classifier",
		"predict",
		"vision",
		"llm"
	],
	"Satellite Imaging": [
		"satellite",
		"sentinel",
		"landsat",
		"remote sensing",
		"earth observation",
		"orbital"
	],
	Health: [
		"health",
		"patient",
		"clinic",
		"medical",
		"diagnos",
		"hospital",
		"wellness"
	],
	Climate: [
		"climate",
		"carbon",
		"emission",
		"weather",
		"drought",
		"flood",
		"heat"
	],
	Education: [
		"learn",
		"tutor",
		"student",
		"classroom",
		"course",
		"school"
	],
	Fintech: [
		"payment",
		"bank",
		"loan",
		"wallet",
		"credit",
		"invoice"
	],
	"Social / Community": [
		"community",
		"social",
		"network",
		"forum",
		"together"
	],
	Mobility: [
		"transport",
		"route",
		"logistics",
		"delivery",
		"fleet",
		"ride"
	],
	Energy: [
		"solar",
		"grid",
		"battery",
		"energy",
		"power"
	],
	Commerce: [
		"shop",
		"marketplace",
		"store",
		"checkout",
		"retail"
	],
	Media: [
		"video",
		"podcast",
		"publish",
		"content",
		"stream"
	],
	Hardware: [
		"iot",
		"sensor",
		"device",
		"embedded",
		"robot"
	],
	Space: [
		"orbit",
		"spacecraft",
		"satellite bus",
		"ground station"
	]
};
var ROLES = [
	{
		id: "ml-engineer",
		title: "ML Engineer",
		skills: [
			"Machine Learning",
			"Computer Vision",
			"Python",
			"Model evaluation"
		],
		keywords: [
			"ml",
			"machine learning",
			"model",
			"classifier",
			"detect",
			"predict",
			"neural",
			"vision"
		],
		domains: ["AI / ML"],
		defaultPriority: "high",
		reason: "Required to train and evaluate models that turn raw signals into decisions."
	},
	{
		id: "gis-specialist",
		title: "GIS Specialist",
		skills: [
			"GIS",
			"Remote Sensing",
			"Geospatial analysis",
			"Satellite imagery"
		],
		keywords: [
			"satellite",
			"gis",
			"geospatial",
			"map",
			"remote sensing",
			"imagery",
			"spatial"
		],
		domains: [
			"Satellite Imaging",
			"Climate",
			"Agriculture"
		],
		defaultPriority: "high",
		reason: "Required for satellite and geospatial data processing."
	},
	{
		id: "agriculture-expert",
		title: "Agriculture Expert",
		skills: [
			"Agronomy",
			"Crop pathology",
			"Field research"
		],
		keywords: [
			"crop",
			"farm",
			"disease",
			"pest",
			"soil",
			"agri",
			"harvest"
		],
		domains: ["Agriculture"],
		defaultPriority: "high",
		reason: "Required to ground the product in real agronomy and field conditions."
	},
	{
		id: "full-stack",
		title: "Full-Stack Developer",
		skills: [
			"React",
			"Node.js",
			"PostgreSQL",
			"API design"
		],
		keywords: [
			"app",
			"platform",
			"dashboard",
			"web",
			"product",
			"user",
			"portal"
		],
		domains: [
			"Commerce",
			"Health",
			"Agriculture",
			"Education"
		],
		defaultPriority: "medium",
		reason: "Required to build the user-facing application and APIs."
	},
	{
		id: "frontend",
		title: "Frontend Engineer",
		skills: [
			"React",
			"UI engineering",
			"Accessibility"
		],
		keywords: [
			"interface",
			"frontend",
			"dashboard",
			"web ui"
		],
		domains: [],
		defaultPriority: "medium",
		reason: "Required to craft a usable product surface."
	},
	{
		id: "backend",
		title: "Backend Engineer",
		skills: [
			"Node.js",
			"PostgreSQL",
			"API design",
			"Auth"
		],
		keywords: [
			"backend",
			"api",
			"database",
			"server"
		],
		domains: [],
		defaultPriority: "medium",
		reason: "Required to persist data, auth, and business logic."
	},
	{
		id: "data-engineer",
		title: "Data Engineer",
		skills: [
			"Data engineering",
			"Pipelines",
			"Python",
			"Warehousing"
		],
		keywords: [
			"pipeline",
			"etl",
			"ingest",
			"data processing",
			"warehouse"
		],
		domains: ["AI / ML"],
		defaultPriority: "medium",
		reason: "Required to move, clean, and store incoming data at scale."
	},
	{
		id: "mlops",
		title: "MLOps Engineer",
		skills: [
			"Model deployment",
			"MLOps",
			"Cloud",
			"Monitoring"
		],
		keywords: [
			"deploy",
			"production",
			"inference",
			"mlops"
		],
		domains: ["AI / ML"],
		defaultPriority: "medium",
		reason: "Required to ship models reliably, not just train them."
	},
	{
		id: "mobile",
		title: "Mobile Developer",
		skills: [
			"Mobile",
			"React Native",
			"Offline-first"
		],
		keywords: [
			"mobile",
			"ios",
			"android",
			"phone",
			"field app"
		],
		domains: [],
		defaultPriority: "medium",
		reason: "Required when the product must live in someone's pocket or in the field."
	},
	{
		id: "designer",
		title: "Product Designer",
		skills: [
			"Product design",
			"UX research",
			"Prototyping"
		],
		keywords: [
			"design",
			"ux",
			"experience",
			"onboarding"
		],
		domains: [],
		defaultPriority: "low",
		reason: "Required to make the product understandable for non-technical users."
	},
	{
		id: "nlp",
		title: "NLP Engineer",
		skills: [
			"NLP",
			"LLMs",
			"Evaluation",
			"Prompting"
		],
		keywords: [
			"language",
			"chatbot",
			"llm",
			"text",
			"summar",
			"translate"
		],
		domains: [
			"AI / ML",
			"Education",
			"Media"
		],
		defaultPriority: "high",
		reason: "Required to understand and generate language at product quality."
	},
	{
		id: "hardware",
		title: "Hardware / IoT Engineer",
		skills: [
			"IoT",
			"Embedded",
			"Sensors",
			"Firmware"
		],
		keywords: [
			"sensor",
			"device",
			"iot",
			"hardware",
			"wearable",
			"drone"
		],
		domains: [
			"Hardware",
			"Energy",
			"Agriculture"
		],
		defaultPriority: "high",
		reason: "Required when the idea depends on physical sensing or actuation."
	},
	{
		id: "climate",
		title: "Climate Scientist",
		skills: [
			"Climate science",
			"Earth systems",
			"Modeling"
		],
		keywords: [
			"climate",
			"carbon",
			"emission",
			"warming",
			"drought"
		],
		domains: ["Climate"],
		defaultPriority: "high",
		reason: "Required to keep climate claims scientifically honest."
	},
	{
		id: "health-expert",
		title: "Healthcare Expert",
		skills: [
			"Clinical workflow",
			"Health privacy",
			"Care delivery"
		],
		keywords: [
			"patient",
			"clinic",
			"diagnos",
			"hospital",
			"care"
		],
		domains: ["Health"],
		defaultPriority: "high",
		reason: "Required to design for real clinical or care constraints."
	},
	{
		id: "growth",
		title: "Growth Lead",
		skills: [
			"Growth",
			"Community",
			"Go-to-market"
		],
		keywords: [
			"users",
			"marketplace",
			"community",
			"launch",
			"adoption"
		],
		domains: ["Commerce", "Social / Community"],
		defaultPriority: "low",
		reason: "Required when the idea only works if two-sided adoption happens."
	}
];
function hasAny(text, words) {
	return words.some((w) => text.includes(w));
}
var HIDDEN_RULES = [
	{
		id: "geo-preprocess",
		title: "Satellite imagery preprocessing",
		relatedRole: "GIS Specialist",
		skills: [
			"Remote Sensing",
			"GIS",
			"Image preprocessing"
		],
		priority: "high",
		reason: "Raw satellite scenes need atmospheric correction, tiling, and cloud masking before any model can see a crop.",
		trigger: (t, explicit) => hasAny(t, [
			"satellite",
			"imagery",
			"remote sensing"
		]) && !explicit.has("preprocess")
	},
	{
		id: "geospatial-pipeline",
		title: "Geospatial data processing",
		relatedRole: "GIS Specialist",
		skills: [
			"GIS",
			"Geospatial analysis",
			"Data engineering"
		],
		priority: "high",
		reason: "Geospatial rasters and vectors need a dedicated processing path, not a generic backend.",
		trigger: (t) => hasAny(t, [
			"satellite",
			"gis",
			"map",
			"geospatial",
			"remote sensing"
		])
	},
	{
		id: "model-deploy",
		title: "Model deployment",
		relatedRole: "MLOps Engineer",
		skills: [
			"Model deployment",
			"MLOps",
			"Monitoring"
		],
		priority: "medium",
		reason: "A trained detector is not a product until it can be served, versioned, and watched in production.",
		trigger: (t, explicit) => hasAny(t, [
			"ml",
			"machine learning",
			"detect",
			"model",
			"classifier",
			"ai"
		]) && !explicit.has("deploy")
	},
	{
		id: "data-pipeline",
		title: "Data pipeline",
		relatedRole: "Data Engineer",
		skills: [
			"Data engineering",
			"Pipelines",
			"Python"
		],
		priority: "medium",
		reason: "Continuous data (images, sensors, logs) needs ingestion, validation, and storage before modeling.",
		trigger: (t) => hasAny(t, [
			"satellite",
			"sensor",
			"stream",
			"detect",
			"images",
			"iot"
		])
	},
	{
		id: "gis-knowledge",
		title: "GIS knowledge",
		relatedRole: "GIS Specialist",
		skills: ["GIS"],
		priority: "high",
		reason: "Coordinate systems, resolution, and spatial joins are easy to get silently wrong.",
		trigger: (t, explicit) => hasAny(t, [
			"satellite",
			"map",
			"geospatial",
			"location"
		]) && !explicit.has("gis")
	},
	{
		id: "field-ux",
		title: "Field-first mobile experience",
		relatedRole: "Mobile Developer",
		skills: ["Mobile", "Offline-first"],
		priority: "medium",
		reason: "People who work outdoors often have patchy connectivity and need the product in their pocket.",
		trigger: (t) => hasAny(t, [
			"farm",
			"field",
			"crop",
			"worker",
			"driver",
			"on-site"
		])
	},
	{
		id: "privacy",
		title: "Privacy and compliance",
		relatedRole: "Healthcare Expert",
		skills: ["Health privacy", "Security"],
		priority: "high",
		reason: "Health and identity data cannot be treated like ordinary app analytics.",
		trigger: (t) => hasAny(t, [
			"patient",
			"health",
			"clinic",
			"medical",
			"diagnos"
		])
	},
	{
		id: "payments",
		title: "Payments and ledger integrity",
		relatedRole: "Backend Engineer",
		skills: [
			"Payments",
			"PostgreSQL",
			"Security"
		],
		priority: "high",
		reason: "Marketplaces and wallets fail if money movement is an afterthought.",
		trigger: (t) => hasAny(t, [
			"marketplace",
			"pay",
			"wallet",
			"checkout",
			"payout"
		])
	},
	{
		id: "eval",
		title: "Language-model evaluation",
		relatedRole: "NLP Engineer",
		skills: [
			"Evaluation",
			"NLP",
			"Prompting"
		],
		priority: "medium",
		reason: "LLM features need eval sets and failure analysis, not just a prompt.",
		trigger: (t) => hasAny(t, [
			"chatbot",
			"llm",
			"tutor",
			"summar",
			"copilot"
		])
	},
	{
		id: "trust",
		title: "Trust and safety",
		relatedRole: "Growth Lead",
		skills: ["Community", "Moderation"],
		priority: "medium",
		reason: "Social products collapse without moderation, reporting, and abuse response.",
		trigger: (t) => hasAny(t, [
			"community",
			"social",
			"forum",
			"chat",
			"network"
		])
	},
	{
		id: "firmware",
		title: "Firmware and device reliability",
		relatedRole: "Hardware / IoT Engineer",
		skills: [
			"Firmware",
			"Embedded",
			"IoT"
		],
		priority: "high",
		reason: "Hardware ideas live or die on firmware, power, and field reliability.",
		trigger: (t) => hasAny(t, [
			"sensor",
			"iot",
			"wearable",
			"drone",
			"device"
		])
	}
];
function normalizeText(input) {
	return input.toLowerCase().replace(/[^a-z0-9+.# ]+/g, " ").replace(/\s+/g, " ").trim();
}
function skillAliasesFor(name) {
	const key = name.toLowerCase();
	return [key, ...SKILL_ALIASES[key] ?? []];
}
function unique(items) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const item of items) {
		const key = item.toLowerCase();
		if (!key || seen.has(key)) continue;
		seen.add(key);
		out.push(item);
	}
	return out;
}
function scoreRole(role, text, hint) {
	let score = 0;
	for (const kw of role.keywords) if (text.includes(kw)) score += 2;
	for (const d of role.domains) if (hint.includes(d.toLowerCase()) || text.includes(d.toLowerCase())) score += 1.5;
	return score;
}
function problemLine(title, description) {
	const compact = description.trim().replace(/\s+/g, " ");
	if (compact.length < 80) return compact || title;
	return (compact.split(/(?<=[.!?])\s/)[0] ?? compact).slice(0, 180);
}
function goalLine(description, title) {
	const lower = description.toLowerCase();
	if (lower.includes("detect")) return "Detect, surface, and act on the stated problem with a working product.";
	if (lower.includes("connect") || lower.includes("marketplace")) return "Connect the two sides of this idea and make the exchange trustworthy.";
	if (lower.includes("learn") || lower.includes("tutor")) return "Help people learn faster with a product they will actually finish.";
	return `Turn “${title}” into a team that can ship a first working version.`;
}
function analyzeIdeaLocal(input) {
	const text = normalizeText(`${input.title}\n${input.description}\n${input.domainHint ?? ""}\n${input.constraints ?? ""}`);
	const hint = normalizeText(input.domainHint ?? "");
	const explicit = new Set(text.split(" "));
	const domains = unique(Object.entries(DOMAIN_KEYWORDS).filter(([name, kws]) => hint.includes(name.toLowerCase()) || kws.some((k) => text.includes(k))).map(([name]) => name));
	const subDomains = [];
	if (text.includes("satellite") || text.includes("remote sensing")) subDomains.push("Earth observation");
	if (text.includes("disease") || text.includes("patholog")) subDomains.push("Plant pathology");
	if (text.includes("computer vision") || text.includes("images") || text.includes("imagery")) subDomains.push("Computer vision");
	if (text.includes("llm") || text.includes("chatbot")) subDomains.push("Language models");
	if (text.includes("sensor") || text.includes("iot")) subDomains.push("Sensing");
	const technologies = [];
	if (text.includes("satellite") || text.includes("sentinel") || text.includes("landsat")) technologies.push("Satellite imagery");
	if (text.includes("ml") || text.includes("machine learning") || text.includes("detect") || text.includes("ai")) technologies.push("Machine learning");
	if (text.includes("gis") || text.includes("geospatial") || text.includes("map")) technologies.push("GIS");
	if (text.includes("react") || text.includes("web") || text.includes("app") || text.includes("platform")) technologies.push("Web application");
	if (text.includes("mobile") || text.includes("android") || text.includes("ios")) technologies.push("Mobile");
	if (text.includes("llm") || text.includes("gpt") || text.includes("grok")) technologies.push("Large language models");
	if (technologies.length === 0) technologies.push("Software product");
	const scored = ROLES.map((role) => ({
		role,
		score: scoreRole(role, text, hint)
	})).filter((row) => row.score >= 2).sort((a, b) => b.score - a.score);
	if (!scored.some((r) => r.role.id === "full-stack" || r.role.id === "frontend" || r.role.id === "mobile") && scored.length > 0) {
		const fs = ROLES.find((r) => r.id === "full-stack");
		if (fs) scored.push({
			role: fs,
			score: 2
		});
	}
	const roles = scored.slice(0, 6).map((row) => {
		let priority = row.role.defaultPriority;
		if (row.score >= 6) priority = "high";
		else if (row.score < 3 && priority === "high") priority = "medium";
		return {
			id: row.role.id,
			title: row.role.title,
			skills: row.role.skills,
			priority,
			reason: row.role.reason,
			hidden: false
		};
	});
	const hiddenRequirements = [];
	for (const rule of HIDDEN_RULES) {
		if (!rule.trigger(text, explicit)) continue;
		hiddenRequirements.push({
			id: rule.id,
			title: rule.title,
			reason: rule.reason,
			relatedRole: rule.relatedRole,
			skills: rule.skills
		});
		if (!roles.find((r) => r.title === rule.relatedRole)) {
			const def = ROLES.find((r) => r.title === rule.relatedRole);
			if (def) roles.push({
				id: def.id,
				title: def.title,
				skills: unique([...def.skills, ...rule.skills]),
				priority: rule.priority,
				reason: rule.reason,
				hidden: true
			});
		}
	}
	const capabilities = unique([...roles.flatMap((r) => r.skills), ...hiddenRequirements.flatMap((h) => h.skills)]);
	const constraints = [];
	if (input.constraints?.trim()) constraints.push(input.constraints.trim());
	if (input.timeline?.trim()) constraints.push(`Timeline: ${input.timeline.trim()}`);
	if (text.includes("offline")) constraints.push("Must work with limited connectivity.");
	if (text.includes("smallholder") || text.includes("farmer")) constraints.push("Must be usable by people who are not GIS or ML specialists.");
	const dependencies = [];
	if (text.includes("satellite")) dependencies.push("Access to satellite scenes (Sentinel, Landsat, or commercial).");
	if (text.includes("ml") || text.includes("detect")) dependencies.push("Labeled examples for the detection task.");
	if (text.includes("marketplace")) dependencies.push("Liquidity on both sides of the marketplace.");
	return {
		problem: problemLine(input.title, input.description),
		goal: goalLine(input.description, input.title),
		domains: domains.length ? domains : hint ? [input.domainHint.trim()] : ["General"],
		subDomains: unique(subDomains),
		technologies: unique(technologies),
		capabilities,
		constraints,
		dependencies,
		roles,
		hiddenRequirements,
		usedAi: false
	};
}
function mergeAnalyses(local, remote) {
	if (!remote) return local;
	const rolesByTitle = new Map(local.roles.map((r) => [r.title.toLowerCase(), r]));
	for (const role of remote.roles ?? []) {
		const key = role.title.toLowerCase();
		if (!rolesByTitle.has(key)) rolesByTitle.set(key, {
			...role,
			hidden: role.hidden ?? false
		});
	}
	const hiddenByTitle = new Map(local.hiddenRequirements.map((h) => [h.title.toLowerCase(), h]));
	for (const hidden of remote.hiddenRequirements ?? []) {
		const key = hidden.title.toLowerCase();
		if (!hiddenByTitle.has(key)) hiddenByTitle.set(key, hidden);
	}
	return {
		problem: remote.problem || local.problem,
		goal: remote.goal || local.goal,
		domains: unique([...remote.domains ?? [], ...local.domains]),
		subDomains: unique([...remote.subDomains ?? [], ...local.subDomains]),
		technologies: unique([...remote.technologies ?? [], ...local.technologies]),
		capabilities: unique([...remote.capabilities ?? [], ...local.capabilities]),
		constraints: unique([...remote.constraints ?? [], ...local.constraints]),
		dependencies: unique([...remote.dependencies ?? [], ...local.dependencies]),
		roles: [...rolesByTitle.values()],
		hiddenRequirements: [...hiddenByTitle.values()],
		usedAi: true
	};
}
function skillCovered(profile, needed) {
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
function roleCovered(profile, requirement) {
	if (profile.skills.length === 0 && profile.pastProjects.length === 0) return false;
	const hits = requirement.skills.filter((s) => skillCovered(profile, s)).length;
	if (requirement.skills.length === 0) return false;
	return hits / requirement.skills.length >= .45;
}
function computeMissing(requirements, teammates) {
	return requirements.filter((req) => !teammates.some((m) => roleCovered(m.profile, req))).map((req) => ({
		requirementId: req.id,
		role: req.role,
		skills: req.skills,
		priority: req.priority,
		reason: req.reason,
		satisfies: req.hidden ? `Hidden requirement: ${req.role}` : `Project requirement: ${req.role}`,
		hidden: req.hidden
	})).sort((a, b) => {
		const rank = {
			high: 0,
			medium: 1,
			low: 2
		};
		return rank[a.priority] - rank[b.priority];
	});
}
function coveragePercent(requirements, teammates) {
	if (requirements.length === 0) return 100;
	const weight = {
		high: 3,
		medium: 2,
		low: 1
	};
	let total = 0;
	let got = 0;
	for (const req of requirements) {
		const w = weight[req.priority];
		total += w;
		if (teammates.some((m) => roleCovered(m.profile, req))) got += w;
	}
	return Math.round(got / total * 100);
}
function proposeTeam(teammates, missing, matches) {
	const seats = teammates.map((m) => ({
		profileId: m.profileId,
		name: m.profile.name,
		avatarKey: m.profile.avatarKey,
		avatarUrl: m.profile.avatarUrl,
		role: m.role,
		source: m.source,
		matchScore: null,
		reasons: m.source === "owner" ? ["Idea owner"] : ["Already on the team"]
	}));
	const taken = new Set(seats.map((s) => s.profileId));
	for (const piece of missing) {
		const pick = matches.filter((m) => m.requirementId === piece.requirementId && !taken.has(m.profile.id)).sort((a, b) => b.score - a.score)[0];
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
			reasons: pick.reasons
		});
	}
	return seats;
}
function validateTeam(requirements, teammates) {
	const coveredRoles = requirements.filter((r) => teammates.some((m) => roleCovered(m.profile, r))).map((r) => r.role);
	const gaps = requirements.filter((r) => !teammates.some((m) => roleCovered(m.profile, r))).map((r) => ({
		role: r.role,
		priority: r.priority,
		reason: r.reason
	}));
	const domains = new Set(teammates.flatMap((m) => m.profile.domains));
	const complementarity = [];
	if (domains.size >= 3) complementarity.push("Domains on the team already span multiple sides of the idea.");
	const avail = teammates.filter((m) => m.profile.availability === "available").length;
	const availabilityNotes = [];
	if (teammates.some((m) => m.profile.availability === "limited")) availabilityNotes.push("At least one person has limited availability — plan around that.");
	if (avail === teammates.length && teammates.length > 0) availabilityNotes.push("Everyone currently on the team is marked available.");
	if (new Set(teammates.map((m) => m.role)).size === teammates.length && teammates.length > 1) complementarity.push("Roles do not overlap — each person covers a different piece.");
	return {
		coverage: coveragePercent(requirements, teammates),
		coveredRoles,
		gaps,
		complementarity,
		availabilityNotes
	};
}
/** Configurable match weights. Sum should be 1. */
var MATCH_WEIGHTS = {
	skillRelevance: .3,
	domainRelevance: .2,
	projectExperience: .15,
	evidenceConfidence: .15,
	availability: .1,
	interestAlignment: .1
};
var CONFIDENCE_WEIGHT = {
	self_declared: .58,
	evidence_supported: .84,
	verified: 1
};
var AVAILABILITY_WEIGHT = {
	available: 1,
	limited: .62,
	unavailable: .12
};
function clamp01(n) {
	return Math.max(0, Math.min(1, n));
}
function overlap(a, b) {
	if (a.length === 0 || b.length === 0) return 0;
	const nb = b.map(normalizeText);
	let hits = 0;
	for (const item of a) {
		const n = normalizeText(item);
		if (nb.some((x) => x.includes(n) || n.includes(x))) hits += 1;
	}
	return hits / Math.max(a.length, 1);
}
function skillRelevance(profile, req) {
	if (req.skills.length === 0) return 0;
	let sum = 0;
	for (const needed of req.skills) {
		const needles = skillAliasesFor(needed).map(normalizeText);
		let best = 0;
		for (const skill of profile.skills) {
			const hay = `${skill.name} ${skill.domain}`.toLowerCase();
			if (needles.some((n) => hay.includes(n) || n.includes(normalizeText(skill.name)))) best = Math.max(best, CONFIDENCE_WEIGHT[skill.confidence] ?? .5);
		}
		if (best === 0 && skillCovered(profile, needed)) best = .55;
		sum += best;
	}
	return clamp01(sum / req.skills.length);
}
function projectExperience(profile, req, domains) {
	if (profile.pastProjects.length === 0) return .15;
	let best = 0;
	for (const project of profile.pastProjects) {
		const hay = normalizeText(`${project.title} ${project.description} ${project.skills.join(" ")}`);
		let score = 0;
		for (const skill of req.skills) if (skillAliasesFor(skill).some((a) => hay.includes(normalizeText(a)))) score += .35;
		for (const domain of domains) if (hay.includes(normalizeText(domain))) score += .2;
		best = Math.max(best, Math.min(1, score));
	}
	const years = Math.min(profile.experienceYears / 10, 1) * .2;
	return clamp01(best + years);
}
function evidenceConfidence(profile, req) {
	const matched = profile.skills.filter((s) => req.skills.some((needed) => skillCovered({
		...profile,
		skills: [s],
		pastProjects: []
	}, needed)));
	if (matched.length === 0) return .2;
	const avg = matched.reduce((acc, s) => acc + (CONFIDENCE_WEIGHT[s.confidence] ?? .5), 0) / matched.length;
	const extra = profile.evidence.filter((e) => matched.some((s) => normalizeText(s.name) === normalizeText(e.skillName))).length;
	return clamp01(avg + Math.min(extra, 3) * .04);
}
function buildReasons(profile, req, breakdown, domains) {
	const reasons = [];
	if (breakdown.skillRelevance >= .7) {
		const hits = req.skills.filter((s) => skillCovered(profile, s));
		if (hits[0]) reasons.push(`Strong ${hits[0]} experience`);
		else reasons.push(`Skills line up with ${req.role}`);
	} else if (breakdown.skillRelevance >= .4) reasons.push(`Partial skill coverage for ${req.role}`);
	const verified = profile.skills.find((s) => s.confidence === "verified" && req.skills.some((n) => skillCovered({
		...profile,
		skills: [s],
		pastProjects: []
	}, n)));
	if (verified) reasons.push(`Verified ${verified.name} skill`);
	const evidenced = profile.skills.find((s) => s.confidence === "evidence_supported" && req.skills.some((n) => skillCovered({
		...profile,
		skills: [s],
		pastProjects: []
	}, n)));
	if (evidenced) reasons.push(`Evidence-supported ${evidenced.name} skill`);
	const project = profile.pastProjects.find((p) => {
		const hay = normalizeText(`${p.title} ${p.description} ${p.skills.join(" ")}`);
		return req.skills.some((s) => skillAliasesFor(s).some((a) => hay.includes(normalizeText(a))));
	});
	if (project) reasons.push(`Related project: ${project.title}`);
	const domainHit = profile.domains.find((d) => domains.some((x) => normalizeText(x) === normalizeText(d)));
	if (domainHit) reasons.push(`Relevant ${domainHit} domain experience`);
	if (breakdown.interestAlignment >= .45) reasons.push("Interests already point at this problem");
	if (profile.availability === "available") reasons.push("Available for this project");
	else if (profile.availability === "limited") reasons.push("Limited availability — still a possible fit");
	return reasons.slice(0, 6);
}
function scoreCandidate(profile, req, domains, problemText) {
	const breakdown = {
		skillRelevance: skillRelevance(profile, req),
		domainRelevance: overlap(profile.domains, domains.length ? domains : [req.role]),
		projectExperience: projectExperience(profile, req, domains),
		evidenceConfidence: evidenceConfidence(profile, req),
		availability: AVAILABILITY_WEIGHT[profile.availability] ?? .5,
		interestAlignment: overlap(profile.interests, [
			...domains,
			problemText,
			req.role,
			...req.skills
		])
	};
	const raw = breakdown.skillRelevance * MATCH_WEIGHTS.skillRelevance + breakdown.domainRelevance * MATCH_WEIGHTS.domainRelevance + breakdown.projectExperience * MATCH_WEIGHTS.projectExperience + breakdown.evidenceConfidence * MATCH_WEIGHTS.evidenceConfidence + breakdown.availability * MATCH_WEIGHTS.availability + breakdown.interestAlignment * MATCH_WEIGHTS.interestAlignment;
	const score = Math.round(clamp01(raw) * 100);
	return {
		profile,
		requirementId: req.id,
		role: req.role,
		score,
		breakdown,
		reasons: buildReasons(profile, req, breakdown, domains)
	};
}
function rankCandidates(profiles, req, domains, problemText, excludeIds) {
	return profiles.filter((p) => !excludeIds.has(p.id) && p.availability !== "unavailable").map((p) => scoreCandidate(p, req, domains, problemText)).filter((m) => m.score >= 28).sort((a, b) => b.score - a.score).slice(0, 8);
}
function asIso$1(value) {
	if (value instanceof Date) return value.toISOString();
	return String(value);
}
function parseJsonArray(raw) {
	if (Array.isArray(raw)) return raw;
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.map(String) : [];
	} catch {
		return [];
	}
}
async function loadProfile(sql, id) {
	const row = (await sql`select * from profiles where id = ${id} or user_id = ${id} limit 1`)[0];
	if (!row) return null;
	const [skills, domains, interests, projects, evidence] = await Promise.all([
		sql`
      select id, name, domain, confidence from profile_skills where profile_id = ${row.id}
    `,
		sql`select name from profile_domains where profile_id = ${row.id}`,
		sql`select name from profile_interests where profile_id = ${row.id}`,
		sql`
      select id, title, description, skills_json, year from past_projects where profile_id = ${row.id}
    `,
		sql`
      select id, skill_name, type, title, detail, status from evidence where profile_id = ${row.id}
    `
	]);
	return {
		id: row.id,
		userId: row.user_id,
		name: row.name,
		avatarKey: row.avatar_key,
		avatarUrl: row.avatar_url,
		bio: row.bio,
		availability: row.availability,
		experienceYears: Number(row.experience_years),
		onboardingComplete: Boolean(row.onboarding_complete),
		isSeed: Boolean(row.is_seed),
		skills: skills.map((s) => ({
			id: s.id,
			name: s.name,
			domain: s.domain,
			confidence: s.confidence
		})),
		domains: domains.map((d) => d.name),
		interests: interests.map((d) => d.name),
		pastProjects: projects.map((p) => ({
			id: p.id,
			title: p.title,
			description: p.description,
			skills: parseJsonArray(p.skills_json),
			year: Number(p.year)
		})),
		evidence: evidence.map((e) => ({
			id: e.id,
			skillName: e.skill_name,
			type: e.type,
			title: e.title,
			detail: e.detail,
			status: e.status
		})),
		createdAt: asIso$1(row.created_at)
	};
}
async function loadAllProfiles(sql) {
	const rows = await sql`select id from profiles`;
	const profiles = [];
	for (const row of rows) {
		const profile = await loadProfile(sql, row.id);
		if (profile) profiles.push(profile);
	}
	return profiles;
}
async function loadRequirements(sql, ideaId) {
	return (await sql`select * from idea_requirements where idea_id = ${ideaId}`).map((r) => ({
		id: r.id,
		ideaId: r.idea_id,
		role: r.role,
		skills: parseJsonArray(r.skills_json),
		priority: r.priority,
		reason: r.reason,
		hidden: Boolean(r.hidden)
	}));
}
function parseAnalysis(raw) {
	try {
		const parsed = JSON.parse(raw);
		if (!parsed || !Array.isArray(parsed.roles)) return null;
		return parsed;
	} catch {
		return null;
	}
}
var PEOPLE = [
	{
		id: "seed-arjun",
		name: "Arjun Mehta",
		avatarKey: "orbit",
		bio: "Maps what satellites see into decisions people can actually use.",
		availability: "available",
		experienceYears: 6,
		skills: [
			{
				name: "GIS",
				domain: "Satellite Imaging",
				confidence: "verified"
			},
			{
				name: "Remote Sensing",
				domain: "Satellite Imaging",
				confidence: "evidence_supported"
			},
			{
				name: "Satellite imagery",
				domain: "Satellite Imaging",
				confidence: "verified"
			},
			{
				name: "Python",
				domain: "AI / ML",
				confidence: "evidence_supported"
			},
			{
				name: "Geospatial analysis",
				domain: "Climate",
				confidence: "verified"
			}
		],
		domains: [
			"Agriculture",
			"Climate",
			"Satellite Imaging"
		],
		interests: [
			"food security",
			"drought",
			"smallholder farms",
			"earth observation"
		],
		projects: [{
			id: "p-arjun-1",
			title: "Village-level drought maps from Sentinel-2",
			description: "Built a GIS pipeline that turns Sentinel-2 scenes into drought risk layers for 400 villages.",
			skills: [
				"GIS",
				"Remote Sensing",
				"Satellite imagery",
				"Python"
			],
			year: 2024
		}, {
			id: "p-arjun-2",
			title: "Flood-risk GIS for Kerala",
			description: "Combined DEM, rainfall, and satellite water indices into a public flood map.",
			skills: ["GIS", "Geospatial analysis"],
			year: 2023
		}],
		evidence: [{
			id: "e-arjun-1",
			skillName: "GIS",
			type: "project",
			title: "Sentinel drought atlas",
			detail: "Open map tiles + processing notebook",
			status: "verified"
		}, {
			id: "e-arjun-2",
			skillName: "Satellite imagery",
			type: "portfolio",
			title: "Scene preprocessing toolkit",
			detail: "Cloud mask, mosaic, and index generation",
			status: "evidence_supported"
		}]
	},
	{
		id: "seed-riya",
		name: "Riya Sen",
		avatarKey: "split",
		bio: "Ships farmer-facing products that do not feel like research demos.",
		availability: "available",
		experienceYears: 5,
		skills: [
			{
				name: "React",
				domain: "Product",
				confidence: "verified"
			},
			{
				name: "Node.js",
				domain: "Product",
				confidence: "verified"
			},
			{
				name: "PostgreSQL",
				domain: "Product",
				confidence: "evidence_supported"
			},
			{
				name: "API design",
				domain: "Product",
				confidence: "evidence_supported"
			},
			{
				name: "UI engineering",
				domain: "Product",
				confidence: "self_declared"
			}
		],
		domains: [
			"Agriculture",
			"Health",
			"SaaS"
		],
		interests: [
			"climate tech",
			"farmer tools",
			"rural connectivity"
		],
		projects: [{
			id: "p-riya-1",
			title: "KrishiMitra farm advisory",
			description: "Full-stack advisory app used by 12,000 farmers, with offline-first field notes.",
			skills: [
				"React",
				"Node.js",
				"PostgreSQL"
			],
			year: 2025
		}, {
			id: "p-riya-2",
			title: "ClinicOS patient portal",
			description: "Web portal for rural clinics: records, reminders, and a simple API.",
			skills: ["React", "API design"],
			year: 2023
		}],
		evidence: [{
			id: "e-riya-1",
			skillName: "React",
			type: "project",
			title: "KrishiMitra production app",
			detail: "Live product, not a prototype",
			status: "verified"
		}]
	},
	{
		id: "seed-karan",
		name: "Karan Iyer",
		avatarKey: "petal",
		bio: "Agronomist who still walks fields. Translates pathology into product language.",
		availability: "available",
		experienceYears: 12,
		skills: [
			{
				name: "Agronomy",
				domain: "Agriculture",
				confidence: "verified"
			},
			{
				name: "Crop pathology",
				domain: "Agriculture",
				confidence: "verified"
			},
			{
				name: "Field research",
				domain: "Agriculture",
				confidence: "evidence_supported"
			},
			{
				name: "Farmer networks",
				domain: "Agriculture",
				confidence: "evidence_supported"
			}
		],
		domains: ["Agriculture", "Sustainability"],
		interests: [
			"crop disease",
			"smallholders",
			"extension services"
		],
		projects: [{
			id: "p-karan-1",
			title: "ICAR wheat rust survey",
			description: "Multi-state rust survey with labeled field photos used later for vision models.",
			skills: ["Crop pathology", "Field research"],
			year: 2022
		}, {
			id: "p-karan-2",
			title: "Smallholder pest playbooks",
			description: "Wrote practical pest and disease playbooks for three staple crops.",
			skills: ["Agronomy", "Crop pathology"],
			year: 2024
		}],
		evidence: [{
			id: "e-karan-1",
			skillName: "Crop pathology",
			type: "certification",
			title: "Plant pathology fellowship",
			detail: "Verified academic + field credential",
			status: "verified"
		}]
	},
	{
		id: "seed-meera",
		name: "Meera Kapoor",
		avatarKey: "tile",
		bio: "Trains vision models on messy real-world images, then makes them small enough to ship.",
		availability: "limited",
		experienceYears: 7,
		skills: [
			{
				name: "Machine Learning",
				domain: "AI / ML",
				confidence: "verified"
			},
			{
				name: "Computer Vision",
				domain: "AI / ML",
				confidence: "verified"
			},
			{
				name: "PyTorch",
				domain: "AI / ML",
				confidence: "evidence_supported"
			},
			{
				name: "Data pipelines",
				domain: "AI / ML",
				confidence: "evidence_supported"
			}
		],
		domains: [
			"Agriculture",
			"Health",
			"AI / ML"
		],
		interests: [
			"crop yield",
			"medical imaging",
			"tiny models"
		],
		projects: [{
			id: "p-meera-1",
			title: "LeafNet disease classifier",
			description: "CNN for leaf disease with 91% field accuracy across four crops.",
			skills: [
				"Machine Learning",
				"Computer Vision",
				"PyTorch"
			],
			year: 2024
		}, {
			id: "p-meera-2",
			title: "Satellite crop-yield models",
			description: "Fused satellite indices with weather to estimate yield at block level.",
			skills: ["Machine Learning", "Satellite imagery"],
			year: 2023
		}],
		evidence: [{
			id: "e-meera-1",
			skillName: "Computer Vision",
			type: "project",
			title: "LeafNet paper + weights",
			detail: "Open weights and evaluation set",
			status: "verified"
		}]
	},
	{
		id: "seed-aisha",
		name: "Aisha Rahman",
		avatarKey: "arc",
		bio: "Designs products for first-time digital users without talking down to them.",
		availability: "available",
		experienceYears: 8,
		skills: [
			{
				name: "Product design",
				domain: "Design",
				confidence: "verified"
			},
			{
				name: "UX research",
				domain: "Design",
				confidence: "evidence_supported"
			},
			{
				name: "Prototyping",
				domain: "Design",
				confidence: "evidence_supported"
			}
		],
		domains: [
			"Agriculture",
			"Education",
			"Health"
		],
		interests: [
			"rural UX",
			"trust",
			"onboarding"
		],
		projects: [{
			id: "p-aisha-1",
			title: "Voice-first farm ledger",
			description: "Designed a voice-assisted ledger for farmers who prefer talking to typing.",
			skills: ["Product design", "UX research"],
			year: 2024
		}],
		evidence: [{
			id: "e-aisha-1",
			skillName: "Product design",
			type: "portfolio",
			title: "Selected case studies",
			detail: "Three shipped rural products",
			status: "evidence_supported"
		}]
	},
	{
		id: "seed-leo",
		name: "Leo Zhang",
		avatarKey: "stack",
		bio: "Mobile engineer who obsesses over offline, battery, and cameras that work in harsh light.",
		availability: "available",
		experienceYears: 6,
		skills: [
			{
				name: "Mobile",
				domain: "Product",
				confidence: "verified"
			},
			{
				name: "React Native",
				domain: "Product",
				confidence: "verified"
			},
			{
				name: "Offline-first",
				domain: "Product",
				confidence: "evidence_supported"
			}
		],
		domains: [
			"Agriculture",
			"Mobility",
			"Health"
		],
		interests: [
			"field tools",
			"camera capture",
			"sync"
		],
		projects: [{
			id: "p-leo-1",
			title: "ScoutCam field app",
			description: "Android app for agronomists to capture geotagged crop photos offline.",
			skills: [
				"Mobile",
				"Offline-first",
				"GIS"
			],
			year: 2025
		}],
		evidence: [{
			id: "e-leo-1",
			skillName: "Mobile",
			type: "project",
			title: "ScoutCam Play listing",
			detail: "Production Android app",
			status: "verified"
		}]
	},
	{
		id: "seed-priya",
		name: "Priya Nair",
		avatarKey: "wave",
		bio: "NLP person who treats evaluation as the product, not a slide.",
		availability: "available",
		experienceYears: 5,
		skills: [
			{
				name: "NLP",
				domain: "AI / ML",
				confidence: "verified"
			},
			{
				name: "LLMs",
				domain: "AI / ML",
				confidence: "evidence_supported"
			},
			{
				name: "Evaluation",
				domain: "AI / ML",
				confidence: "verified"
			},
			{
				name: "Prompting",
				domain: "AI / ML",
				confidence: "self_declared"
			}
		],
		domains: [
			"Education",
			"AI / ML",
			"Media"
		],
		interests: [
			"tutoring",
			"indic languages",
			"eval"
		],
		projects: [{
			id: "p-priya-1",
			title: "Bhasha tutor eval harness",
			description: "Built an eval set and tutor loop for Hindi/Tamil homework help.",
			skills: [
				"NLP",
				"LLMs",
				"Evaluation"
			],
			year: 2025
		}],
		evidence: [{
			id: "e-priya-1",
			skillName: "NLP",
			type: "project",
			title: "Open eval harness",
			detail: "Public fixtures + scoring",
			status: "verified"
		}]
	},
	{
		id: "seed-sofia",
		name: "Sofia Alvarez",
		avatarKey: "ring",
		bio: "Climate scientist who will not let a product overclaim.",
		availability: "limited",
		experienceYears: 9,
		skills: [
			{
				name: "Climate science",
				domain: "Climate",
				confidence: "verified"
			},
			{
				name: "Earth systems",
				domain: "Climate",
				confidence: "verified"
			},
			{
				name: "Modeling",
				domain: "Climate",
				confidence: "evidence_supported"
			}
		],
		domains: [
			"Climate",
			"Energy",
			"Agriculture"
		],
		interests: [
			"heat",
			"water",
			"adaptation"
		],
		projects: [{
			id: "p-sofia-1",
			title: "Urban heat atlas",
			description: "Downscaled heat-risk layers for 30 cities using satellite LST.",
			skills: [
				"Climate science",
				"Satellite imagery",
				"GIS"
			],
			year: 2024
		}],
		evidence: [{
			id: "e-sofia-1",
			skillName: "Climate science",
			type: "certification",
			title: "Published heat atlas",
			detail: "Peer-reviewed methods",
			status: "verified"
		}]
	},
	{
		id: "seed-noah",
		name: "Noah Okonkwo",
		avatarKey: "node",
		bio: "Hardware that survives dust, heat, and being dropped off a truck.",
		availability: "available",
		experienceYears: 10,
		skills: [
			{
				name: "IoT",
				domain: "Hardware",
				confidence: "verified"
			},
			{
				name: "Embedded",
				domain: "Hardware",
				confidence: "verified"
			},
			{
				name: "Sensors",
				domain: "Hardware",
				confidence: "evidence_supported"
			},
			{
				name: "Firmware",
				domain: "Hardware",
				confidence: "evidence_supported"
			}
		],
		domains: [
			"Hardware",
			"Agriculture",
			"Energy"
		],
		interests: [
			"soil sensors",
			"solar",
			"repairability"
		],
		projects: [{
			id: "p-noah-1",
			title: "Soil-moisture mesh",
			description: "Low-power soil sensors with a repairable radio mesh for farms.",
			skills: [
				"IoT",
				"Firmware",
				"Sensors"
			],
			year: 2023
		}],
		evidence: [{
			id: "e-noah-1",
			skillName: "IoT",
			type: "previous_work",
			title: "Field deployment in Kaduna",
			detail: "180 devices, 11 months uptime",
			status: "verified"
		}]
	},
	{
		id: "seed-dev",
		name: "Dev Patel",
		avatarKey: "grid",
		bio: "Data engineer who likes boring pipelines that never page anyone at 2am.",
		availability: "available",
		experienceYears: 7,
		skills: [
			{
				name: "Data engineering",
				domain: "AI / ML",
				confidence: "verified"
			},
			{
				name: "Pipelines",
				domain: "AI / ML",
				confidence: "verified"
			},
			{
				name: "Python",
				domain: "AI / ML",
				confidence: "evidence_supported"
			},
			{
				name: "Warehousing",
				domain: "AI / ML",
				confidence: "evidence_supported"
			}
		],
		domains: [
			"AI / ML",
			"Climate",
			"Commerce"
		],
		interests: ["data quality", "geospatial ETL"],
		projects: [{
			id: "p-dev-1",
			title: "Raster-to-warehouse pipeline",
			description: "Ingests satellite rasters into a queryable warehouse with validation gates.",
			skills: [
				"Data engineering",
				"Pipelines",
				"GIS"
			],
			year: 2024
		}],
		evidence: [{
			id: "e-dev-1",
			skillName: "Data engineering",
			type: "project",
			title: "Open pipeline templates",
			detail: "Airflow-style DAGs for rasters",
			status: "evidence_supported"
		}]
	},
	{
		id: "seed-hana",
		name: "Hana Suzuki",
		avatarKey: "bloom",
		bio: "MLOps for models that have to run near the field, not only in a notebook.",
		availability: "available",
		experienceYears: 6,
		skills: [
			{
				name: "Model deployment",
				domain: "AI / ML",
				confidence: "verified"
			},
			{
				name: "MLOps",
				domain: "AI / ML",
				confidence: "verified"
			},
			{
				name: "Cloud",
				domain: "AI / ML",
				confidence: "evidence_supported"
			},
			{
				name: "Monitoring",
				domain: "AI / ML",
				confidence: "evidence_supported"
			}
		],
		domains: ["AI / ML", "Health"],
		interests: [
			"edge inference",
			"drift",
			"reliability"
		],
		projects: [{
			id: "p-hana-1",
			title: "Edge crop-model serving",
			description: "Packed a vision model for offline inference on mid-range Android.",
			skills: [
				"Model deployment",
				"MLOps",
				"Mobile"
			],
			year: 2025
		}],
		evidence: [{
			id: "e-hana-1",
			skillName: "MLOps",
			type: "project",
			title: "Serving runbook",
			detail: "Canary + rollback for vision models",
			status: "verified"
		}]
	},
	{
		id: "seed-jonah",
		name: "Jonah Blake",
		avatarKey: "spark",
		bio: "Gets two-sided products to their first hundred honest users.",
		availability: "limited",
		experienceYears: 8,
		skills: [
			{
				name: "Growth",
				domain: "Commerce",
				confidence: "evidence_supported"
			},
			{
				name: "Community",
				domain: "Social / Community",
				confidence: "evidence_supported"
			},
			{
				name: "Go-to-market",
				domain: "Commerce",
				confidence: "self_declared"
			}
		],
		domains: [
			"Commerce",
			"Social / Community",
			"Education"
		],
		interests: ["creator tools", "local commerce"],
		projects: [{
			id: "p-jonah-1",
			title: "Sunday market network",
			description: "Grew a hyperlocal vendor network across 9 neighborhoods.",
			skills: ["Growth", "Community"],
			year: 2024
		}],
		evidence: [{
			id: "e-jonah-1",
			skillName: "Growth",
			type: "previous_work",
			title: "Launch retrospective",
			detail: "First 100 vendors, documented",
			status: "evidence_supported"
		}]
	}
];
async function insertPerson(sql, person) {
	await sql`
    insert into profiles (id, user_id, name, avatar_key, bio, availability, experience_years, onboarding_complete, is_seed)
    values (
      ${person.id}, ${person.id}, ${person.name}, ${person.avatarKey}, ${person.bio},
      ${person.availability}, ${person.experienceYears}, true, true
    )
    on conflict (id) do nothing
  `;
	for (const [i, skill] of person.skills.entries()) await sql`
      insert into profile_skills (id, profile_id, name, domain, confidence)
      values (${`${person.id}-sk-${i}`}, ${person.id}, ${skill.name}, ${skill.domain}, ${skill.confidence})
      on conflict (id) do nothing
    `;
	for (const [i, domain] of person.domains.entries()) await sql`
      insert into profile_domains (id, profile_id, name)
      values (${`${person.id}-d-${i}`}, ${person.id}, ${domain})
      on conflict (id) do nothing
    `;
	for (const [i, interest] of person.interests.entries()) await sql`
      insert into profile_interests (id, profile_id, name)
      values (${`${person.id}-i-${i}`}, ${person.id}, ${interest})
      on conflict (id) do nothing
    `;
	for (const project of person.projects) await sql`
      insert into past_projects (id, profile_id, title, description, skills_json, year)
      values (${project.id}, ${person.id}, ${project.title}, ${project.description}, ${JSON.stringify(project.skills)}, ${project.year})
      on conflict (id) do nothing
    `;
	for (const ev of person.evidence) await sql`
      insert into evidence (id, profile_id, skill_name, type, title, detail, status)
      values (${ev.id}, ${person.id}, ${ev.skillName}, ${ev.type}, ${ev.title}, ${ev.detail}, ${ev.status})
      on conflict (id) do nothing
    `;
}
async function insertSeedIdea(sql, idea) {
	const analysis = analyzeIdeaLocal({
		title: idea.title,
		description: idea.description
	});
	await sql`
    insert into ideas (id, owner_id, title, description, status, analysis_json)
    values (${idea.id}, ${idea.ownerId}, ${idea.title}, ${idea.description}, 'recruiting', ${JSON.stringify(analysis)})
    on conflict (id) do nothing
  `;
	for (const [i, role] of analysis.roles.entries()) await sql`
      insert into idea_requirements (id, idea_id, role, skills_json, priority, reason, hidden)
      values (
        ${`${idea.id}-req-${i}`}, ${idea.id}, ${role.title}, ${JSON.stringify(role.skills)},
        ${role.priority}, ${role.reason}, ${role.hidden}
      )
      on conflict (id) do nothing
    `;
	for (const [i, hidden] of analysis.hiddenRequirements.entries()) {
		if (analysis.roles.some((r) => r.title === hidden.relatedRole)) continue;
		await sql`
      insert into idea_requirements (id, idea_id, role, skills_json, priority, reason, hidden)
      values (
        ${`${idea.id}-hid-${i}`}, ${idea.id}, ${hidden.relatedRole}, ${JSON.stringify(hidden.skills)},
        'medium', ${hidden.reason}, true
      )
      on conflict (id) do nothing
    `;
	}
	for (const [i, member] of idea.members.entries()) await sql`
      insert into idea_members (id, idea_id, profile_id, role, source)
      values (${`${idea.id}-m-${i}`}, ${idea.id}, ${member.profileId}, ${member.role}, ${member.source})
      on conflict (id) do nothing
    `;
}
async function ensureSeed(sql) {
	if (((await sql`select count(*)::int as c from profiles where is_seed = true`)[0]?.c ?? 0) > 0) return;
	for (const person of PEOPLE) await insertPerson(sql, person);
	await insertSeedIdea(sql, {
		id: "idea-heat",
		ownerId: "seed-sofia",
		title: "Shade the city before the next heat wave",
		description: "I want a public map that shows which neighborhoods will overheat this summer and which trees or cool roofs would help first.",
		members: [{
			profileId: "seed-sofia",
			role: "Climate Scientist",
			source: "owner"
		}]
	});
	await insertSeedIdea(sql, {
		id: "idea-tutor",
		ownerId: "seed-priya",
		title: "A tutor that speaks the house language",
		description: "I want an after-school tutor that can help with homework in Hindi and Tamil, keep parents in the loop, and actually measure if kids improve.",
		members: [{
			profileId: "seed-priya",
			role: "NLP Engineer",
			source: "owner"
		}]
	});
	await insertSeedIdea(sql, {
		id: "idea-soil",
		ownerId: "seed-noah",
		title: "Soil that can text you",
		description: "I want cheap soil-moisture sensors that farmers can repair themselves, with a simple phone alert when irrigation is actually needed.",
		members: [{
			profileId: "seed-noah",
			role: "Hardware / IoT Engineer",
			source: "owner"
		}]
	});
}
var SYSTEM = `You analyze product ideas for JODO, a talent-idea collaboration platform.
Return ONLY compact JSON with this shape:
{
  "problem": string,
  "goal": string,
  "domains": string[],
  "subDomains": string[],
  "technologies": string[],
  "capabilities": string[],
  "constraints": string[],
  "dependencies": string[],
  "roles": [{"id": string, "title": string, "skills": string[], "priority": "high"|"medium"|"low", "reason": string, "hidden": boolean}],
  "hiddenRequirements": [{"id": string, "title": string, "reason": string, "relatedRole": string, "skills": string[]}]
}
Rules:
- Roles are people needed to complete the idea, not jobs to fill for hire.
- hiddenRequirements are things the author did not explicitly mention.
- Do not invent companies or named people.
- Keep lists short and specific.`;
function extractJson(text) {
	const trimmed = text.trim();
	const raw = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] ?? trimmed;
	const start = raw.indexOf("{");
	const end = raw.lastIndexOf("}");
	if (start < 0 || end <= start) return null;
	try {
		return JSON.parse(raw.slice(start, end + 1));
	} catch {
		return null;
	}
}
async function enhanceAnalysis(input, local) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return local;
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .2,
				max_tokens: 1100,
				messages: [{
					role: "system",
					content: SYSTEM
				}, {
					role: "user",
					content: `Title: ${input.title}\nDescription: ${input.description}\nDomain hint: ${input.domainHint || "none"}\nConstraints: ${input.constraints || "none"}\nTimeline: ${input.timeline || "none"}`
				}]
			})
		});
		if (!res.ok) return local;
		return mergeAnalyses(local, extractJson((await res.json()).choices?.[0]?.message?.content ?? ""));
	} catch {
		return local;
	}
}
function nid() {
	return crypto.randomUUID();
}
function asIso(value) {
	if (value instanceof Date) return value.toISOString();
	return String(value);
}
async function replaceList(sql, table, profileId) {
	await sql.query(`delete from ${table} where profile_id = $1`, [profileId]);
}
async function saveLists(sql, profileId, data) {
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
async function ensureMyRow(sql, userId, hint) {
	await ensureSeed(sql);
	const existing = await loadProfile(sql, userId);
	if (existing) return existing;
	await sql`
    insert into profiles (id, user_id, name, avatar_key, avatar_url, bio, availability, experience_years, onboarding_complete, is_seed)
    values (${userId}, ${userId}, ${hint?.name?.trim() || "New collaborator"}, ${"orbit"}, ${hint?.avatarUrl ?? null}, ${""}, ${"available"}, ${0}, ${false}, ${false})
  `;
	const created = await loadProfile(sql, userId);
	if (!created) throw new Error("Could not create profile");
	return created;
}
async function persistRequirements(sql, ideaId, analysis) {
	await sql`delete from idea_requirements where idea_id = ${ideaId}`;
	for (const role of analysis.roles) await sql`
      insert into idea_requirements (id, idea_id, role, skills_json, priority, reason, hidden)
      values (${nid()}, ${ideaId}, ${role.title}, ${JSON.stringify(role.skills)}, ${role.priority}, ${role.reason}, ${role.hidden})
    `;
}
async function loadTeammates(sql, ideaId) {
	const rows = await sql`
    select profile_id, role, source from idea_members where idea_id = ${ideaId}
  `;
	const teammates = [];
	for (const row of rows) {
		const profile = await loadProfile(sql, row.profile_id);
		if (!profile) continue;
		teammates.push({
			profileId: profile.id,
			role: row.role,
			source: row.source,
			profile
		});
	}
	return teammates;
}
async function loadRequests(sql, ideaId) {
	const rows = ideaId ? await sql`
        select r.*, i.title from collab_requests r join ideas i on i.id = r.idea_id where r.idea_id = ${ideaId} order by r.created_at desc
      ` : await sql`
        select r.*, i.title from collab_requests r join ideas i on i.id = r.idea_id order by r.created_at desc
      `;
	const out = [];
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
			createdAt: asIso(row.created_at)
		});
	}
	return out;
}
async function buildIdeaSummary(sql, idea) {
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
		status: idea.status,
		domains: analysis?.domains ?? [],
		createdAt: asIso(idea.created_at),
		teamSize: teammates.length,
		missingCount: missing.length,
		coverage: coveragePercent(requirements, teammates)
	};
}
async function assembleIdea(sql, ideaId) {
	const idea = (await sql`select * from ideas where id = ${ideaId} limit 1`)[0];
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
	const matches = [];
	for (const req of requirements.filter((r) => missing.some((m) => m.requirementId === r.id))) matches.push(...rankCandidates(everyone, req, domains, problem, exclude));
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
		status: idea.status,
		analysis,
		requirements,
		teammates,
		missing,
		matches,
		proposedTeam,
		validation,
		requests,
		createdAt: asIso(idea.created_at)
	};
}
async function maybeInviteUserToSeed(sql, profile) {
	if (((await sql`
    select count(*)::int as c from collab_requests where receiver_id = ${profile.id} and idea_id = ${"idea-heat"}
  `)[0]?.c ?? 0) > 0) return;
	const hay = `${profile.skills.map((s) => s.name).join(" ")} ${profile.domains.join(" ")} ${profile.interests.join(" ")}`.toLowerCase();
	if (!/(gis|climate|design|ml|machine|map|heat|product)/.test(hay) && profile.skills.length === 0) {}
	await sql`
    insert into collab_requests (id, idea_id, sender_id, receiver_id, role, status)
    values (${nid()}, ${"idea-heat"}, ${"seed-sofia"}, ${profile.id}, ${"Collaborator"}, ${"pending"})
  `;
}
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "d05e08efb7a9abe2c0e0b728ac2ec31a9dcc6ddfe61a6aa1f9f3f1aeb1d730b0",
	name: "getMyProfile",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyProfile_createServerFn_handler, async ({ context }) => {
	return ensureMyRow(await getSql(), context.userId);
});
var saveOnboarding_createServerFn_handler = createServerRpc({
	id: "e22e05ed7a39c03d0d1cb083cb6f9ee9223a9b4d8c02651f99c27c8814c9a719",
	name: "saveOnboarding",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => saveOnboarding.__executeServer(opts));
var saveOnboarding = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(saveOnboarding_createServerFn_handler, async ({ context, data }) => {
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
var updateProfile_createServerFn_handler = createServerRpc({
	id: "0e07dbcf9d79bcba90462b2839fbbb80143e087d3d7d715ffce98b76541e549f",
	name: "updateProfile",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => updateProfile.__executeServer(opts));
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(updateProfile_createServerFn_handler, async ({ context, data }) => {
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
var addEvidence_createServerFn_handler = createServerRpc({
	id: "34aad2e6833300ab92f311109d0505c7a0e5b192b0ef9e92281b76ff6a47df8d",
	name: "addEvidence",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => addEvidence.__executeServer(opts));
var addEvidence = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(addEvidence_createServerFn_handler, async ({ context, data }) => {
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
var endorseSkill_createServerFn_handler = createServerRpc({
	id: "3fb7523ebbdf58739d6812018ec00ed93539f8bf6d53c0193db8e4a6453044f8",
	name: "endorseSkill",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => endorseSkill.__executeServer(opts));
var endorseSkill = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(endorseSkill_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const me = await ensureMyRow(sql, context.userId);
	if (((await sql`
      select count(*)::int as c from idea_members
      where idea_id = ${data.ideaId} and profile_id in (${me.id}, ${data.profileId})
    `)[0]?.c ?? 0) < 2) throw new Error("Only teammates can verify a skill");
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
var getDashboard_createServerFn_handler = createServerRpc({
	id: "d2277df187ab6909c2a22581e58a4b1ee31e42de5c0e278d1fb7327bfaf337b6",
	name: "getDashboard",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => getDashboard.__executeServer(opts));
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getDashboard_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const profile = await ensureMyRow(sql, context.userId);
	await ensureSeed(sql);
	const ideaRows = await sql`
      select distinct i.id, i.owner_id, i.title, i.description, i.status, i.analysis_json, i.created_at
      from ideas i
      left join idea_members m on m.idea_id = i.id
      where i.owner_id = ${profile.id} or m.profile_id = ${profile.id}
      order by i.created_at desc
    `;
	const ideas = [];
	for (const row of ideaRows) ideas.push(await buildIdeaSummary(sql, row));
	const owned = ideas.filter((i) => i.ownerId === profile.id);
	const missingHighlights = [];
	const recommended = [];
	const everyone = await loadAllProfiles(sql);
	for (const idea of owned) {
		const detail = await assembleIdea(sql, idea.id);
		if (!detail) continue;
		if (detail.missing.length) missingHighlights.push({
			ideaId: idea.id,
			ideaTitle: idea.title,
			pieces: detail.missing
		});
		for (const match of detail.matches.slice(0, 2)) if (!recommended.some((r) => r.profile.id === match.profile.id)) recommended.push(match);
	}
	if (recommended.length === 0) {
		const fakeReq = {
			id: "discover",
			ideaId: "",
			role: "Collaborator",
			skills: profile.skills.map((s) => s.name),
			priority: "medium",
			reason: "Shared craft",
			hidden: false
		};
		recommended.push(...everyone.filter((p) => p.id !== profile.id).map((p) => scoreCandidate(p, fakeReq, profile.domains, profile.interests.join(" "))).sort((a, b) => b.score - a.score).slice(0, 4));
	}
	const allReq = await loadRequests(sql);
	return {
		profile,
		ideas: owned,
		missingHighlights,
		recommended: recommended.slice(0, 6),
		incoming: allReq.filter((r) => r.receiverId === profile.id),
		outgoing: allReq.filter((r) => r.senderId === profile.id),
		teams: ideas
	};
});
var createIdea_createServerFn_handler = createServerRpc({
	id: "5f667ff6c668f65ead0482263a696d6c2ee37fee46620f566954851f7bfd637b",
	name: "createIdea",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => createIdea.__executeServer(opts));
var createIdea = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createIdea_createServerFn_handler, async ({ context, data }) => {
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
		timeline: data.timeline
	});
	const analysis = await enhanceAnalysis({
		title,
		description,
		domainHint: data.domainHint,
		constraints: data.constraints,
		timeline: data.timeline
	}, local);
	const id = nid();
	await sql`
      insert into ideas (id, owner_id, title, description, domain_hint, constraints_text, timeline, availability_need, status, analysis_json)
      values (
        ${id}, ${me.id}, ${title}, ${description}, ${data.domainHint ?? ""}, ${data.constraints ?? ""},
        ${data.timeline ?? ""}, ${data.availabilityNeed ?? ""}, ${"analyzed"}, ${JSON.stringify(analysis)}
      )
    `;
	await persistRequirements(sql, id, analysis);
	const ownerRole = analysis.roles.find((r) => roleCovered(me, {
		id: "owner",
		ideaId: id,
		role: r.title,
		skills: r.skills,
		priority: r.priority,
		reason: r.reason,
		hidden: false
	}))?.title ?? "Idea owner";
	await sql`
      insert into idea_members (id, idea_id, profile_id, role, source)
      values (${nid()}, ${id}, ${me.id}, ${ownerRole}, ${"owner"})
    `;
	for (const teammateId of data.existingTeammateIds ?? []) {
		if (teammateId === me.id) continue;
		const person = await loadProfile(sql, teammateId);
		if (!person) continue;
		const role = analysis.roles.find((r) => roleCovered(person, {
			id: r.id,
			ideaId: id,
			role: r.title,
			skills: r.skills,
			priority: r.priority,
			reason: r.reason,
			hidden: false
		}))?.title ?? "Teammate";
		await sql`
        insert into idea_members (id, idea_id, profile_id, role, source)
        values (${nid()}, ${id}, ${person.id}, ${role}, ${"existing"})
        on conflict (idea_id, profile_id) do nothing
      `;
	}
	await sql`update ideas set status = ${"recruiting"} where id = ${id}`;
	return assembleIdea(sql, id);
});
var getIdea_createServerFn_handler = createServerRpc({
	id: "deb29fded458da06979d85afa61899d6e23d8d53fc1089fe4a6872aa1dcfbc51",
	name: "getIdea",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => getIdea.__executeServer(opts));
var getIdea = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(getIdea_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await ensureSeed(sql);
	return assembleIdea(sql, data);
});
var reanalyzeIdea_createServerFn_handler = createServerRpc({
	id: "ccf49ec50e0e068a47ddf0d1665abc81a1883dfaaffcf2fc93bfa419995fe27f",
	name: "reanalyzeIdea",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => reanalyzeIdea.__executeServer(opts));
var reanalyzeIdea = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(reanalyzeIdea_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const me = await ensureMyRow(sql, context.userId);
	const idea = (await sql`
      select owner_id, title, description, domain_hint, constraints_text, timeline from ideas where id = ${data.ideaId}
    `)[0];
	if (!idea) throw new Error("Idea not found");
	if (idea.owner_id !== me.id) throw new Error("Only the idea owner can re-analyze");
	const title = data.title?.trim() || idea.title;
	const description = data.description?.trim() || idea.description;
	const local = analyzeIdeaLocal({
		title,
		description,
		domainHint: idea.domain_hint,
		constraints: idea.constraints_text,
		timeline: idea.timeline
	});
	const analysis = await enhanceAnalysis({
		title,
		description,
		domainHint: idea.domain_hint,
		constraints: idea.constraints_text,
		timeline: idea.timeline
	}, local);
	await sql`
      update ideas set title = ${title}, description = ${description}, analysis_json = ${JSON.stringify(analysis)}, updated_at = now()
      where id = ${data.ideaId}
    `;
	await persistRequirements(sql, data.ideaId, analysis);
	return assembleIdea(sql, data.ideaId);
});
var sendRequest_createServerFn_handler = createServerRpc({
	id: "dc562a9faa29fafeceff3263c049565b9ba4d2a5c15d4d76afcd1d7c3b9714d2",
	name: "sendRequest",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => sendRequest.__executeServer(opts));
var sendRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(sendRequest_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const me = await ensureMyRow(sql, context.userId);
	if ((await sql`select owner_id from ideas where id = ${data.ideaId}`)[0]?.owner_id !== me.id) throw new Error("Only the idea owner can send requests");
	if ((await sql`
      select id from collab_requests
      where idea_id = ${data.ideaId} and receiver_id = ${data.receiverId} and status = ${"pending"}
    `)[0]) return assembleIdea(sql, data.ideaId);
	await sql`
      insert into collab_requests (id, idea_id, sender_id, receiver_id, role, requirement_id, status)
      values (${nid()}, ${data.ideaId}, ${me.id}, ${data.receiverId}, ${data.role}, ${data.requirementId ?? null}, ${"pending"})
    `;
	return assembleIdea(sql, data.ideaId);
});
var cancelRequest_createServerFn_handler = createServerRpc({
	id: "6a916bdbd4ef07919c86b424681e7d7b3625e57c871bf27a62a432d959d6960e",
	name: "cancelRequest",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => cancelRequest.__executeServer(opts));
var cancelRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(cancelRequest_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const me = await ensureMyRow(sql, context.userId);
	const req = (await sql`
      select idea_id, sender_id, status from collab_requests where id = ${data}
    `)[0];
	if (!req) throw new Error("Request not found");
	if (req.sender_id !== me.id) throw new Error("Only the sender can cancel");
	if (req.status !== "pending") throw new Error("Only pending requests can be cancelled");
	await sql`update collab_requests set status = ${"cancelled"} where id = ${data}`;
	return assembleIdea(sql, req.idea_id);
});
var respondRequest_createServerFn_handler = createServerRpc({
	id: "3d2cc956040eee323b1089dc6fa7b8bd36a2b67369724a3e5a29312af8688936",
	name: "respondRequest",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => respondRequest.__executeServer(opts));
var respondRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(respondRequest_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const me = await ensureMyRow(sql, context.userId);
	const req = (await sql`
      select idea_id, receiver_id, status, role from collab_requests where id = ${data.requestId}
    `)[0];
	if (!req) throw new Error("Request not found");
	if (req.receiver_id !== me.id) throw new Error("Only the invited person can respond");
	if (req.status !== "pending") throw new Error("This request is no longer pending");
	await sql`update collab_requests set status = ${data.accept ? "accepted" : "rejected"} where id = ${data.requestId}`;
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
var followUpSeeds_createServerFn_handler = createServerRpc({
	id: "8cf314183c88d7f535e1fe28d61c147d72eecba091e26738b9f67dc3190c0934",
	name: "followUpSeeds",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => followUpSeeds.__executeServer(opts));
var followUpSeeds = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((ideaId) => ideaId).handler(followUpSeeds_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const me = await ensureMyRow(sql, context.userId);
	const idea = (await sql`
      select owner_id, title, description, analysis_json from ideas where id = ${data}
    `)[0];
	if (!idea || idea.owner_id !== me.id) throw new Error("Only the idea owner can follow up");
	const pending = await sql`
      select id, receiver_id, role from collab_requests
      where idea_id = ${data} and sender_id = ${me.id} and status = ${"pending"}
    `;
	const analysis = parseAnalysis(idea.analysis_json);
	const requirements = await loadRequirements(sql, data);
	for (const row of pending) {
		const person = await loadProfile(sql, row.receiver_id);
		if (!person?.isSeed) continue;
		const ranked = scoreCandidate(person, requirements.find((r) => r.role === row.role) ?? {
			id: "tmp",
			ideaId: data,
			role: row.role,
			skills: analysis?.roles.find((r) => r.title === row.role)?.skills ?? [],
			priority: "medium",
			reason: "",
			hidden: false
		}, analysis?.domains ?? [], `${idea.title} ${idea.description}`);
		if (person.availability === "available" ? ranked.score >= 55 : person.availability === "limited" ? ranked.score >= 78 : false) {
			await sql`update collab_requests set status = ${"accepted"} where id = ${row.id}`;
			await sql`
          insert into idea_members (id, idea_id, profile_id, role, source)
          values (${nid()}, ${data}, ${person.id}, ${row.role}, ${"joined"})
          on conflict (idea_id, profile_id) do nothing
        `;
		} else if (person.availability === "unavailable" || ranked.score < 40) await sql`update collab_requests set status = ${"rejected"} where id = ${row.id}`;
	}
	if ((await loadTeammates(sql, data)).length > 1) await sql`update ideas set status = ${"active"} where id = ${data}`;
	return assembleIdea(sql, data);
});
var removeMember_createServerFn_handler = createServerRpc({
	id: "d00ea535f8836ee98c0d11303d47991e29de996c26bc06b34afc2a26a17b8b05",
	name: "removeMember",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => removeMember.__executeServer(opts));
var removeMember = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(removeMember_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const me = await ensureMyRow(sql, context.userId);
	const idea = await sql`select owner_id from ideas where id = ${data.ideaId}`;
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
var listPeople_createServerFn_handler = createServerRpc({
	id: "3565484760e548ab29de56de73c2c057ec9bab431ebb31ed822077eaadaeae9d",
	name: "listPeople",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => listPeople.__executeServer(opts));
var listPeople = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listPeople_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const me = await ensureMyRow(sql, context.userId);
	await ensureSeed(sql);
	return (await loadAllProfiles(sql)).filter((p) => p.id !== me.id);
});
var getPublicProfile_createServerFn_handler = createServerRpc({
	id: "46688cc37f7d13c0f8105486ecb59b412ea5b464a8815ecfeb4d491039e9430a",
	name: "getPublicProfile",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => getPublicProfile.__executeServer(opts));
var getPublicProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(getPublicProfile_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await ensureSeed(sql);
	return loadProfile(sql, data);
});
var getDiscover_createServerFn_handler = createServerRpc({
	id: "d9c04dd90822bc3cee31be255cd256331e3ce0be49d21367f4881ba252730c39",
	name: "getDiscover",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => getDiscover.__executeServer(opts));
var getDiscover = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getDiscover_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const me = await ensureMyRow(sql, context.userId);
	await ensureSeed(sql);
	const people = (await loadAllProfiles(sql)).filter((p) => p.id !== me.id);
	const ideaRows = await sql`select id, owner_id, title, description, status, analysis_json, created_at from ideas order by created_at desc`;
	const projects = [];
	for (const row of ideaRows) projects.push(await buildIdeaSummary(sql, row));
	const owned = await sql`select id from ideas where owner_id = ${me.id}`;
	const missingRoles = [];
	for (const row of owned) {
		const detail = await assembleIdea(sql, row.id);
		if (!detail) continue;
		for (const piece of detail.missing) if (!missingRoles.includes(piece.role)) missingRoles.push(piece.role);
	}
	return {
		people: people.map((p) => {
			return scoreCandidate(p, {
				id: "disc",
				ideaId: "",
				role: missingRoles[0] ?? "Collaborator",
				skills: [.../* @__PURE__ */ new Set([...me.skills.map((s) => s.name), ...missingRoles])],
				priority: "medium",
				reason: "Discover",
				hidden: false
			}, me.domains, me.interests.join(" "));
		}).sort((a, b) => b.score - a.score),
		projects,
		skills: [...new Set(people.flatMap((p) => p.skills.map((s) => s.name)))].sort(),
		domains: [...new Set(people.flatMap((p) => p.domains))].sort(),
		missingRoles
	};
});
var createTask_createServerFn_handler = createServerRpc({
	id: "2cc902ff9983c35408c7b3756bce02b8391108b06ffd9766095b9938c7c87112",
	name: "createTask",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => createTask.__executeServer(opts));
var createTask = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createTask_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const me = await ensureMyRow(sql, context.userId);
	if (((await sql`
      select count(*)::int as c from idea_members where idea_id = ${data.ideaId} and profile_id = ${me.id}
    `)[0]?.c ?? 0) === 0) throw new Error("Only teammates can add tasks");
	await sql`
      insert into tasks (id, idea_id, title, assignee_id, status)
      values (${nid()}, ${data.ideaId}, ${data.title.trim()}, ${data.assigneeId ?? null}, ${"todo"})
    `;
	return listTasksForIdea(sql, data.ideaId);
});
var updateTask_createServerFn_handler = createServerRpc({
	id: "0ffda267fecc9d5f550d47a22c44a249d406413efe8bffad45ef67e934eff4cd",
	name: "updateTask",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => updateTask.__executeServer(opts));
var updateTask = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(updateTask_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const me = await ensureMyRow(sql, context.userId);
	const task = (await sql`select idea_id from tasks where id = ${data.taskId}`)[0];
	if (!task) throw new Error("Task not found");
	if (((await sql`
      select count(*)::int as c from idea_members where idea_id = ${task.idea_id} and profile_id = ${me.id}
    `)[0]?.c ?? 0) === 0) throw new Error("Only teammates can update tasks");
	if (data.status) await sql`update tasks set status = ${data.status} where id = ${data.taskId}`;
	if (data.assigneeId !== void 0) await sql`update tasks set assignee_id = ${data.assigneeId} where id = ${data.taskId}`;
	if (data.title) await sql`update tasks set title = ${data.title} where id = ${data.taskId}`;
	return listTasksForIdea(sql, task.idea_id);
});
var getWorkspace_createServerFn_handler = createServerRpc({
	id: "f67e15b7f5c550b1a4b0be239eb1e59b5b7d25ed495da21335d81d9cc2f5d395",
	name: "getWorkspace",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => getWorkspace.__executeServer(opts));
var getWorkspace = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((ideaId) => ideaId).handler(getWorkspace_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await ensureSeed(sql);
	const idea = await assembleIdea(sql, data);
	if (!idea) return null;
	const tasks = await listTasksForIdea(sql, data);
	const done = tasks.filter((t) => t.status === "done").length;
	return {
		idea,
		tasks,
		progress: tasks.length === 0 ? 0 : Math.round(done / tasks.length * 100)
	};
});
async function listTasksForIdea(sql, ideaId) {
	const rows = await sql`select * from tasks where idea_id = ${ideaId} order by created_at asc`;
	const tasks = [];
	for (const row of rows) {
		const assignee = row.assignee_id ? await loadProfile(sql, row.assignee_id) : null;
		tasks.push({
			id: row.id,
			ideaId: row.idea_id,
			title: row.title,
			assigneeId: row.assignee_id,
			assigneeName: assignee?.name ?? null,
			status: row.status,
			createdAt: asIso(row.created_at)
		});
	}
	return tasks;
}
var listInbox_createServerFn_handler = createServerRpc({
	id: "02ba97157595566d29f2968b7e1afdfe3cfeff0052588fc1c82c0d76b4edd8d6",
	name: "listInbox",
	filename: "src/lib/jodo/actions.ts"
}, (opts) => listInbox.__executeServer(opts));
var listInbox = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listInbox_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const me = await ensureMyRow(sql, context.userId);
	const all = await loadRequests(sql);
	return {
		incoming: all.filter((r) => r.receiverId === me.id),
		outgoing: all.filter((r) => r.senderId === me.id)
	};
});
//#endregion
export { addEvidence_createServerFn_handler, cancelRequest_createServerFn_handler, createIdea_createServerFn_handler, createTask_createServerFn_handler, endorseSkill_createServerFn_handler, followUpSeeds_createServerFn_handler, getDashboard_createServerFn_handler, getDiscover_createServerFn_handler, getIdea_createServerFn_handler, getMyProfile_createServerFn_handler, getPublicProfile_createServerFn_handler, getWorkspace_createServerFn_handler, listInbox_createServerFn_handler, listPeople_createServerFn_handler, reanalyzeIdea_createServerFn_handler, removeMember_createServerFn_handler, respondRequest_createServerFn_handler, saveOnboarding_createServerFn_handler, sendRequest_createServerFn_handler, updateProfile_createServerFn_handler, updateTask_createServerFn_handler };
