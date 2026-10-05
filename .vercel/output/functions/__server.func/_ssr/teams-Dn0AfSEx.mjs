import { S as Navigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { a as EmptyNote, c as SectionTitle, h as getDashboard, i as CoverageRing, k as useMyProfile, n as Chip, s as RedirectToSignIn, t as Card } from "./bits-Cw7hr8uM.mjs";
import { t as AppShell } from "./shell-Br7xA0ge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teams-Dn0AfSEx.js
var import_jsx_runtime = require_jsx_runtime();
function Teams() {
	const { user, authPending, data: profile, isPending } = useMyProfile();
	const dash = useQuery({
		queryKey: ["dashboard", user?.id],
		queryFn: () => getDashboard(),
		enabled: Boolean(user) && Boolean(profile?.onboardingComplete)
	});
	if (authPending || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-canvas" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (profile && !profile.onboardingComplete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	const teams = dash.data?.teams ?? [];
	const incoming = dash.data?.incoming.filter((r) => r.status === "pending") ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		profile: profile ?? null,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				kicker: "Teams",
				title: "Where you already belong"
			}),
			incoming.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-2xl",
					children: [
						incoming.length,
						" pending invitation",
						incoming.length === 1 ? "" : "s"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/inbox",
					className: "mt-2 inline-block text-sm underline-offset-4 hover:underline",
					children: "Review them"
				})]
			}),
			teams.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: teams.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/ideas/$ideaId/space",
					params: { ideaId: t.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "h-full hover:shadow-lift",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] tracking-[0.16em] text-brand uppercase",
									children: t.ownerId === profile?.id ? "You own this" : "You’re on this"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-3xl",
									children: t.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 line-clamp-2 text-sm text-ink-soft",
									children: t.description
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageRing, {
								value: t.coverage,
								size: 72
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [t.teamSize, " members"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: t.missingCount > 0,
								children: t.missingCount ? `${t.missingCount} gaps` : "Covered"
							})]
						})]
					})
				}, t.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "Join or start an idea and the team workspace appears here." })
		]
	});
}
//#endregion
export { Teams as component };
