import { S as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { n as MonoAvatar } from "./avatar-B8NRGib8.mjs";
import { i as Route$3 } from "./router-CZhXfZ85.mjs";
import { c as SectionTitle, k as useMyProfile, n as Chip, r as ConfidenceMark, s as RedirectToSignIn, t as Card, v as getPublicProfile } from "./bits-Cw7hr8uM.mjs";
import { t as AppShell } from "./shell-Br7xA0ge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people._profileId-Czfq6bfh.js
var import_jsx_runtime = require_jsx_runtime();
function Person() {
	const { profileId } = Route$3.useParams();
	const { user, authPending, data: me, isPending } = useMyProfile();
	const q = useQuery({
		queryKey: ["person", profileId],
		queryFn: () => getPublicProfile({ data: profileId }),
		enabled: Boolean(user)
	});
	if (authPending || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-canvas" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (me && !me.onboardingComplete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	const p = q.data;
	if (q.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		profile: me ?? null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-[28px] bg-brand/10" })
	});
	if (!p) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		profile: me ?? null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No profile." })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		profile: me ?? null,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoAvatar, {
					name: p.name,
					avatarKey: p.avatarKey,
					avatarUrl: p.avatarUrl,
					size: 96
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl font-semibold tracking-tight",
						children: p.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-ink-soft",
						children: p.bio
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: true,
							children: p.availability
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [p.experienceYears, " yrs"] })]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { title: "Capability" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: p.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full bg-blush/70 px-3 py-1.5 text-sm",
						children: [
							s.name,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceMark, { confidence: s.confidence })
						]
					}, s.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.16em] text-brand uppercase",
					children: "Domains"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: p.domains.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: d }, d))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.16em] text-brand uppercase",
					children: "Interests"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: p.interests.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: d }, d))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { title: "Evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 md:grid-cols-2",
					children: [p.evidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceMark, { confidence: e.status === "verified" ? "verified" : "evidence_supported" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-2xl",
							children: e.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-ink-soft",
							children: [
								e.skillName,
								" · ",
								e.type.replaceAll("_", " ")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: e.detail
						})
					] }, e.id)), p.evidence.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-ink-soft",
						children: "No evidence attached yet — skills stay self-declared."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { title: "Projects" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 md:grid-cols-2",
					children: p.pastProjects.map((proj) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl",
							children: proj.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-ink-soft",
							children: proj.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: proj.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: s }, s))
						})
					] }, proj.id))
				})]
			})
		]
	});
}
//#endregion
export { Person as component };
