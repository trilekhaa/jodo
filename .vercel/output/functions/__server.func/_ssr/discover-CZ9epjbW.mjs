import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as Navigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { n as MonoAvatar } from "./avatar-B8NRGib8.mjs";
import { a as EmptyNote, c as SectionTitle, g as getDiscover, i as CoverageRing, k as useMyProfile, n as Chip, s as RedirectToSignIn, t as Card } from "./bits-Cw7hr8uM.mjs";
import { t as AppShell } from "./shell-Br7xA0ge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discover-CZ9epjbW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Discover() {
	const { user, authPending, data: profile, isPending } = useMyProfile();
	const q = useQuery({
		queryKey: ["discover"],
		queryFn: () => getDiscover(),
		enabled: Boolean(user) && Boolean(profile?.onboardingComplete)
	});
	const [tab, setTab] = (0, import_react.useState)("people");
	if (authPending || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-canvas" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (profile && !profile.onboardingComplete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	const data = q.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		profile: profile ?? null,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				kicker: "Discover",
				title: "Around your missing pieces"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-6 max-w-xl text-ink-soft",
				children: "This is not a generic social feed. Rankings follow your skills, interests, and the gaps on ideas you own."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 flex flex-wrap gap-2",
				children: [
					"people",
					"projects",
					"skills",
					"domains"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: tab === t,
					onClick: () => setTab(t),
					children: t
				}, t))
			}),
			data?.missingRoles.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-4 text-sm",
				children: ["Currently missing on your ideas: ", data.missingRoles.join(" · ")]
			}) : null,
			tab === "people" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: (data?.people ?? []).slice(0, 12).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/people/$profileId",
					params: { profileId: m.profile.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex items-center gap-4 hover:shadow-lift",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoAvatar, {
								name: m.profile.name,
								avatarKey: m.profile.avatarKey,
								avatarUrl: m.profile.avatarUrl,
								size: 56
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl",
									children: m.profile.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm text-ink-soft",
									children: m.profile.skills.map((s) => s.name).slice(0, 3).join(" · ")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-2xl tabular-nums",
								children: [m.score, "%"]
							})
						]
					})
				}, m.profile.id))
			}),
			tab === "projects" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: (data?.projects ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/ideas/$ideaId",
					params: { ideaId: p.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "hover:shadow-lift",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl",
									children: p.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 line-clamp-2 text-sm text-ink-soft",
									children: p.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm",
									children: ["by ", p.ownerName]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageRing, {
								value: p.coverage,
								size: 68
							})]
						})
					})
				}, p.id))
			}),
			tab === "skills" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: (data?.skills ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: s }, s))
			}),
			tab === "domains" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: (data?.domains ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: true,
					children: s
				}, s))
			}),
			!data && !q.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "Nothing to discover yet." }) : null
		]
	});
}
//#endregion
export { Discover as component };
