import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useNavigate, S as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as MonoAvatar, t as AVATAR_KEYS } from "./avatar-B8NRGib8.mjs";
import { T as saveOnboarding, k as useMyProfile, n as Chip, s as RedirectToSignIn } from "./bits-Cw7hr8uM.mjs";
import { t as Button } from "./button-CrH1z0pi.mjs";
import { n as Label, r as Textarea, t as Input } from "./input-CU4m8PXb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-PmamTznb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SKILL_SUGGESTIONS = [
	"Machine Learning",
	"GIS",
	"React",
	"Agronomy",
	"Product design",
	"NLP",
	"Mobile",
	"IoT"
];
var DOMAIN_SUGGESTIONS = [
	"Agriculture",
	"AI / ML",
	"Health",
	"Climate",
	"Education",
	"Hardware"
];
var INTEREST_SUGGESTIONS = [
	"food security",
	"climate tech",
	"tutoring",
	"farmer tools",
	"earth observation"
];
function Onboarding() {
	const { user, authPending, data: profile, isPending } = useMyProfile();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const [name, setName] = (0, import_react.useState)(profile?.name ?? user?.displayName ?? "");
	const [avatarKey, setAvatarKey] = (0, import_react.useState)(profile?.avatarKey ?? "orbit");
	const [bio, setBio] = (0, import_react.useState)(profile?.bio ?? "");
	const [availability, setAvailability] = (0, import_react.useState)(profile?.availability ?? "available");
	const [years, setYears] = (0, import_react.useState)(profile?.experienceYears ?? 3);
	const [skillInput, setSkillInput] = (0, import_react.useState)("");
	const [skills, setSkills] = (0, import_react.useState)(profile?.skills.map((s) => ({
		name: s.name,
		domain: s.domain,
		confidence: s.confidence
	})) ?? []);
	const [domains, setDomains] = (0, import_react.useState)(profile?.domains ?? []);
	const [interests, setInterests] = (0, import_react.useState)(profile?.interests ?? []);
	const [projectTitle, setProjectTitle] = (0, import_react.useState)("");
	const [projectDetail, setProjectDetail] = (0, import_react.useState)("");
	const [projects, setProjects] = (0, import_react.useState)(profile?.pastProjects ?? []);
	const save = useMutation({
		mutationFn: () => saveOnboarding({ data: {
			name: name || user?.displayName || "Collaborator",
			avatarKey,
			bio,
			availability,
			experienceYears: years,
			skills,
			domains,
			interests,
			pastProjects: projects.map((p) => ({
				title: p.title,
				description: p.description,
				skills: p.skills,
				year: p.year
			}))
		} }),
		onSuccess: async () => {
			await qc.invalidateQueries();
			navigate({ to: "/" });
		}
	});
	if (authPending || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-canvas" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (profile?.onboardingComplete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	function addSkill(nameIn) {
		const n = nameIn.trim();
		if (!n || skills.some((s) => s.name.toLowerCase() === n.toLowerCase())) return;
		setSkills([...skills, {
			name: n,
			domain: "",
			confidence: "self_declared"
		}]);
		setSkillInput("");
	}
	function toggle(list, set, value) {
		set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-3xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl font-semibold",
				children: "JODO"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-5xl leading-tight font-semibold tracking-tight",
				children: "What can you actually contribute?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-ink-soft",
				children: "This is a capability profile, not a résumé. Matching uses it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-10 space-y-8",
				onSubmit: (e) => {
					e.preventDefault();
					save.mutate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "name",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "name",
						value: name,
						onChange: (e) => setName(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Avatar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: AVATAR_KEYS.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setAvatarKey(key),
							className: avatarKey === key ? "rounded-full ring-2 ring-brand ring-offset-2 ring-offset-canvas" : "",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoAvatar, {
								name: name || "You",
								avatarKey: key,
								size: 52
							})
						}, key))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "bio",
						children: "How you help teams"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "bio",
						value: bio,
						onChange: (e) => setBio(e.target.value),
						placeholder: "I take satellite scenes and turn them into maps people can act on."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Skills" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 flex flex-wrap gap-2",
							children: SKILL_SUGGESTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: skills.some((x) => x.name === s),
								onClick: () => addSkill(s),
								children: s
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: skillInput,
								onChange: (e) => setSkillInput(e.target.value),
								placeholder: "Add a skill"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => addSkill(skillInput),
								children: "Add"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2",
							children: skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between rounded-2xl bg-blush/50 px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-sm text-brand",
									onClick: () => setSkills(skills.filter((x) => x.name !== s.name)),
									children: "Remove"
								})]
							}, s.name))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Domains" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: DOMAIN_SUGGESTIONS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: domains.includes(d),
							onClick: () => toggle(domains, setDomains, d),
							children: d
						}, d))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Interests" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: INTEREST_SUGGESTIONS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: interests.includes(d),
							onClick: () => toggle(interests, setInterests, d),
							children: d
						}, d))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "years",
							children: "Years of experience"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "years",
							type: "number",
							min: 0,
							max: 50,
							value: years,
							onChange: (e) => setYears(Number(e.target.value))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Availability" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: [
								"available",
								"limited",
								"unavailable"
							].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: availability === a,
								onClick: () => setAvailability(a),
								children: a
							}, a))
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "A project you’ve already done" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mb-2",
							value: projectTitle,
							onChange: (e) => setProjectTitle(e.target.value),
							placeholder: "Title"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							className: "min-h-20",
							value: projectDetail,
							onChange: (e) => setProjectDetail(e.target.value),
							placeholder: "What you actually built"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "mt-2",
							onClick: () => {
								if (!projectTitle.trim()) return;
								setProjects([...projects, {
									id: projectTitle,
									title: projectTitle,
									description: projectDetail,
									skills: skills.map((s) => s.name),
									year: (/* @__PURE__ */ new Date()).getFullYear()
								}]);
								setProjectTitle("");
								setProjectDetail("");
							},
							children: "Add project"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2",
							children: projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-2xl bg-canvas-deep px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: p.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-ink-soft",
									children: p.description
								})]
							}, p.id))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						disabled: save.isPending,
						children: save.isPending ? "Saving capability profile…" : "Enter JODO"
					})
				]
			})
		]
	});
}
//#endregion
export { Onboarding as component };
