import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as MonoAvatar, t as AVATAR_KEYS } from "./avatar-B8NRGib8.mjs";
import { D as updateProfile, c as SectionTitle, k as useMyProfile, l as addEvidence, n as Chip, r as ConfidenceMark, s as RedirectToSignIn, t as Card } from "./bits-Cw7hr8uM.mjs";
import { t as AppShell } from "./shell-Br7xA0ge.mjs";
import { t as Button } from "./button-CrH1z0pi.mjs";
import { n as Label, r as Textarea, t as Input } from "./input-CU4m8PXb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-Mi6wy-kI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { user, authPending, data: profile, isPending } = useMyProfile();
	const qc = useQueryClient();
	const [name, setName] = (0, import_react.useState)("");
	const [avatarKey, setAvatarKey] = (0, import_react.useState)("orbit");
	const [bio, setBio] = (0, import_react.useState)("");
	const [availability, setAvailability] = (0, import_react.useState)("available");
	const [years, setYears] = (0, import_react.useState)(0);
	const [skillName, setSkillName] = (0, import_react.useState)("");
	const [skills, setSkills] = (0, import_react.useState)([]);
	const [domains, setDomains] = (0, import_react.useState)("");
	const [interests, setInterests] = (0, import_react.useState)("");
	const [evSkill, setEvSkill] = (0, import_react.useState)("");
	const [evTitle, setEvTitle] = (0, import_react.useState)("");
	const [evDetail, setEvDetail] = (0, import_react.useState)("");
	const [evType, setEvType] = (0, import_react.useState)("project");
	(0, import_react.useEffect)(() => {
		if (!profile) return;
		setName(profile.name);
		setAvatarKey(profile.avatarKey);
		setBio(profile.bio);
		setAvailability(profile.availability);
		setYears(profile.experienceYears);
		setSkills(profile.skills.map((s) => ({
			name: s.name,
			domain: s.domain,
			confidence: s.confidence
		})));
		setDomains(profile.domains.join(", "));
		setInterests(profile.interests.join(", "));
	}, [profile]);
	const save = useMutation({
		mutationFn: () => updateProfile({ data: {
			name,
			avatarKey,
			bio,
			availability,
			experienceYears: years,
			skills,
			domains: domains.split(",").map((s) => s.trim()).filter(Boolean),
			interests: interests.split(",").map((s) => s.trim()).filter(Boolean),
			pastProjects: (profile?.pastProjects ?? []).map((p) => ({
				title: p.title,
				description: p.description,
				skills: p.skills,
				year: p.year
			}))
		} }),
		onSuccess: () => qc.invalidateQueries()
	});
	const evidence = useMutation({
		mutationFn: () => addEvidence({ data: {
			skillName: evSkill,
			type: evType,
			title: evTitle,
			detail: evDetail
		} }),
		onSuccess: () => {
			setEvTitle("");
			setEvDetail("");
			qc.invalidateQueries();
		}
	});
	if (authPending || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-canvas" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (profile && !profile.onboardingComplete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-canvas" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		profile,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoAvatar, {
					name: name || profile.name,
					avatarKey,
					avatarUrl: profile.avatarUrl,
					size: 88
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Capability profile",
					title: profile.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-ink-soft",
					children: "Edits change future matching. Evidence upgrades confidence. Verified only happens with real verification data."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 max-w-2xl space-y-5",
				onSubmit: (e) => {
					e.preventDefault();
					save.mutate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Avatar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: AVATAR_KEYS.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setAvatarKey(key),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoAvatar, {
								name,
								avatarKey: key,
								size: 44,
								className: avatarKey === key ? "ring-2 ring-brand" : ""
							})
						}, key))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "name",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "name",
						value: name,
						onChange: (e) => setName(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "bio",
						children: "Bio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "bio",
						value: bio,
						onChange: (e) => setBio(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Years" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Skills" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: skillName,
								onChange: (e) => setSkillName(e.target.value),
								placeholder: "Add skill"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => {
									if (!skillName.trim()) return;
									setSkills([...skills, {
										name: skillName.trim(),
										domain: "",
										confidence: "self_declared"
									}]);
									setSkillName("");
								},
								children: "Add"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2",
							children: skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-2 rounded-2xl bg-blush/50 px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [
										s.name,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceMark, { confidence: s.confidence })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-sm text-brand",
									onClick: () => setSkills(skills.filter((x) => x.name !== s.name)),
									children: "Remove"
								})]
							}, s.name))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Domains (comma separated)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: domains,
						onChange: (e) => setDomains(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Interests (comma separated)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: interests,
						onChange: (e) => setInterests(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: save.isPending,
						children: save.isPending ? "Saving…" : "Save profile"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { title: "Add evidence" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: evSkill,
								onChange: (e) => setEvSkill(e.target.value),
								placeholder: "Skill this evidence supports"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: evTitle,
								onChange: (e) => setEvTitle(e.target.value),
								placeholder: "Title"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								className: "min-h-20",
								value: evDetail,
								onChange: (e) => setEvDetail(e.target.value),
								placeholder: "What can someone inspect?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "h-11 w-full rounded-[14px] bg-canvas-deep px-3",
								value: evType,
								onChange: (e) => setEvType(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "project",
										children: "Project"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "certification",
										children: "Certification"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "portfolio",
										children: "Portfolio"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "previous_work",
										children: "Previous work"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								disabled: !evSkill || !evTitle || evidence.isPending,
								onClick: () => evidence.mutate(),
								children: "Attach evidence"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-ink-soft",
								children: "This upgrades a matching skill from self-declared to evidence-supported. It does not mark it verified."
							})
						]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-3",
						children: profile.evidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceMark, { confidence: e.status === "verified" ? "verified" : "evidence_supported" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl",
								children: e.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-ink-soft",
								children: [
									e.skillName,
									" · ",
									e.type.replaceAll("_", " ")
								]
							})
						] }, e.id))
					})
				]
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
