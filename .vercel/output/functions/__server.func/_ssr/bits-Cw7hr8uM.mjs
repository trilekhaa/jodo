import "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CHqmpfGL.mjs";
import { a as useCurrentUserState, r as cn } from "./avatar-B8NRGib8.mjs";
import { a as createSsrRpc } from "./router-CZhXfZ85.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d05e08efb7a9abe2c0e0b728ac2ec31a9dcc6ddfe61a6aa1f9f3f1aeb1d730b0"));
var saveOnboarding = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("e22e05ed7a39c03d0d1cb083cb6f9ee9223a9b4d8c02651f99c27c8814c9a719"));
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("0e07dbcf9d79bcba90462b2839fbbb80143e087d3d7d715ffce98b76541e549f"));
var addEvidence = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("34aad2e6833300ab92f311109d0505c7a0e5b192b0ef9e92281b76ff6a47df8d"));
var endorseSkill = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("3fb7523ebbdf58739d6812018ec00ed93539f8bf6d53c0193db8e4a6453044f8"));
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d2277df187ab6909c2a22581e58a4b1ee31e42de5c0e278d1fb7327bfaf337b6"));
var createIdea = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("5f667ff6c668f65ead0482263a696d6c2ee37fee46620f566954851f7bfd637b"));
var getIdea = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("deb29fded458da06979d85afa61899d6e23d8d53fc1089fe4a6872aa1dcfbc51"));
var reanalyzeIdea = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("ccf49ec50e0e068a47ddf0d1665abc81a1883dfaaffcf2fc93bfa419995fe27f"));
var sendRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("dc562a9faa29fafeceff3263c049565b9ba4d2a5c15d4d76afcd1d7c3b9714d2"));
var cancelRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("6a916bdbd4ef07919c86b424681e7d7b3625e57c871bf27a62a432d959d6960e"));
var respondRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("3d2cc956040eee323b1089dc6fa7b8bd36a2b67369724a3e5a29312af8688936"));
var followUpSeeds = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((ideaId) => ideaId).handler(createSsrRpc("8cf314183c88d7f535e1fe28d61c147d72eecba091e26738b9f67dc3190c0934"));
var removeMember = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("d00ea535f8836ee98c0d11303d47991e29de996c26bc06b34afc2a26a17b8b05"));
var listPeople = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("3565484760e548ab29de56de73c2c057ec9bab431ebb31ed822077eaadaeae9d"));
var getPublicProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("46688cc37f7d13c0f8105486ecb59b412ea5b464a8815ecfeb4d491039e9430a"));
var getDiscover = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d9c04dd90822bc3cee31be255cd256331e3ce0be49d21367f4881ba252730c39"));
var createTask = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("2cc902ff9983c35408c7b3756bce02b8391108b06ffd9766095b9938c7c87112"));
var updateTask = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("0ffda267fecc9d5f550d47a22c44a249d406413efe8bffad45ef67e934eff4cd"));
var getWorkspace = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((ideaId) => ideaId).handler(createSsrRpc("f67e15b7f5c550b1a4b0be239eb1e59b5b7d25ed495da21335d81d9cc2f5d395"));
var listInbox = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("02ba97157595566d29f2968b7e1afdfe3cfeff0052588fc1c82c0d76b4edd8d6"));
function useMyProfile() {
	const { user, isPending } = useCurrentUserState();
	return {
		user,
		authPending: isPending,
		...useQuery({
			queryKey: ["me", user?.id],
			queryFn: () => getMyProfile(),
			enabled: Boolean(user)
		})
	};
}
function Card({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-[28px] bg-canvas p-5 shadow-card md:p-6", className),
		children
	});
}
function Chip({ children, active, onClick, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(onClick ? "button" : "span", {
		type: onClick ? "button" : void 0,
		onClick,
		className: cn("inline-flex h-9 items-center rounded-full px-3 text-sm", active ? "bg-brand text-canvas" : "bg-blush/70 text-ink", onClick && "transition-transform active:scale-[0.96]", className),
		children
	});
}
function PriorityMark({ priority }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-[11px] font-semibold tracking-[0.14em] uppercase text-brand",
		children: priority
	});
}
function ConfidenceMark({ confidence }) {
	const label = confidence === "verified" ? "Verified" : confidence === "evidence_supported" ? "Evidence-supported" : "Self-declared";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded-full px-2 py-0.5 text-[11px] font-medium", confidence === "verified" ? "bg-brand text-canvas" : confidence === "evidence_supported" ? "bg-ink text-canvas" : "bg-gold text-ink"),
		children: label
	});
}
function CoverageRing({ value, size = 92 }) {
	const r = 36;
	const c = 2 * Math.PI * r;
	const offset = c - Math.max(0, Math.min(100, value)) / 100 * c;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 88 88",
			className: "size-full -rotate-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "44",
				cy: "44",
				r,
				fill: "none",
				stroke: "var(--color-gold)",
				strokeWidth: "8"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "44",
				cy: "44",
				r,
				fill: "none",
				stroke: "var(--color-brand)",
				strokeWidth: "8",
				strokeDasharray: c,
				strokeDashoffset: offset,
				strokeLinecap: "round"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 grid place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-display text-xl font-semibold tabular-nums",
				children: [value, "%"]
			})
		})]
	});
}
function SectionTitle({ kicker, title, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1 text-[11px] font-semibold tracking-[0.18em] text-brand uppercase",
			children: kicker
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl font-semibold tracking-tight md:text-4xl",
			children: title
		})] }), action]
	});
}
function EmptyNote({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "text-ink-soft",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children })
	});
}
//#endregion
export { removeMember as C, updateProfile as D, sendRequest as E, updateTask as O, reanalyzeIdea as S, saveOnboarding as T, getIdea as _, EmptyNote as a, listInbox as b, SectionTitle as c, createIdea as d, createTask as f, getDiscover as g, getDashboard as h, CoverageRing as i, useMyProfile as k, addEvidence as l, followUpSeeds as m, Chip as n, PriorityMark as o, endorseSkill as p, ConfidenceMark as r, RedirectToSignIn as s, Card as t, cancelRequest as u, getPublicProfile as v, respondRequest as w, listPeople as x, getWorkspace as y };
