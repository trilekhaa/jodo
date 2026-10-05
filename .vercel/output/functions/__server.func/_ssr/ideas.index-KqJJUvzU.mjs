import { S as Navigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { a as Plus } from "../_libs/lucide-react.mjs";
import { a as EmptyNote, c as SectionTitle, h as getDashboard, i as CoverageRing, k as useMyProfile, n as Chip, s as RedirectToSignIn, t as Card } from "./bits-Cw7hr8uM.mjs";
import { t as AppShell } from "./shell-Br7xA0ge.mjs";
import { t as Button } from "./button-CrH1z0pi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ideas.index-KqJJUvzU.js
var import_jsx_runtime = require_jsx_runtime();
function Ideas() {
	const { user, authPending, data: profile, isPending } = useMyProfile();
	const dash = useQuery({
		queryKey: ["dashboard", user?.id],
		queryFn: () => getDashboard(),
		enabled: Boolean(user) && Boolean(profile?.onboardingComplete)
	});
	if (authPending || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-canvas" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (profile && !profile.onboardingComplete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		profile: profile ?? null,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				kicker: "Ideas",
				title: "Things you’re building"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/ideas/new",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New idea"] })
			})]
		}), dash.data?.ideas.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: dash.data.ideas.map((idea) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/ideas/$ideaId",
				params: { ideaId: idea.id },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "h-full hover:shadow-lift",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-3xl",
							children: idea.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-3 text-sm text-ink-soft",
							children: idea.description
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageRing, {
							value: idea.coverage,
							size: 76
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: true,
							children: idea.missingCount ? `${idea.missingCount} missing` : "Team complete"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [idea.teamSize, " on team"] })]
					})]
				})
			}, idea.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "No ideas yet. Start with a sentence — JODO will extract the missing pieces." })]
	});
}
//#endregion
export { Ideas as component };
