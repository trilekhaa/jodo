import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { m as useRouterState, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as signOut } from "./client-1vAx-gM_.mjs";
import { a as useCurrentUserState, i as useCurrentUser, n as MonoAvatar, r as cn } from "./avatar-B8NRGib8.mjs";
import { a as hasGateSessionMarker } from "./server-B9t0ij-0.mjs";
import { c as Compass, n as Users, o as Lightbulb, r as UserRound, s as House } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-Br7xA0ge.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/ideas",
		label: "Ideas",
		icon: Lightbulb
	},
	{
		to: "/discover",
		label: "Discover",
		icon: Compass
	},
	{
		to: "/teams",
		label: "Teams",
		icon: Users
	},
	{
		to: "/profile",
		label: "Profile",
		icon: UserRound
	}
];
function AccountChip({ profile }) {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(() => () => {}, hasGateSessionMarker, () => false);
	const name = profile?.name ?? user?.displayName ?? "You";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoAvatar, {
			name,
			avatarKey: profile?.avatarKey ?? "orbit",
			avatarUrl: profile?.avatarUrl ?? user?.profileImageUrl,
			size: 36
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 hidden lg:block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate font-medium leading-tight",
				children: name
			}), !gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut("/").catch(() => setSigningOut(false));
				},
				className: "text-xs text-ink-soft underline-offset-2 hover:underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})]
		})]
	});
}
function AppShell({ children, profile }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { isPending } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-canvas text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed top-0 left-0 z-30 hidden h-dvh w-56 flex-col border-r border-brand/20 p-5 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-display text-3xl font-semibold tracking-tight",
						children: "JODO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs tracking-wide text-ink-soft uppercase",
						children: "No idea builds alone"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-10 flex flex-1 flex-col gap-1",
						children: NAV.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-11 items-center gap-3 rounded-[14px] px-3 text-sm font-medium transition-colors", active ? "bg-brand text-canvas" : "text-ink hover:bg-brand/10"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
							}, item.to);
						})
					}),
					isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-9 w-full animate-pulse rounded-full bg-brand/15" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountChip, { profile })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex items-center justify-between border-b border-brand/20 bg-canvas/90 px-4 py-3 backdrop-blur md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-display text-2xl font-semibold",
					children: "JODO"
				}), isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-9 animate-pulse rounded-full bg-brand/15" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountChip, { profile })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-6xl px-4 pb-28 pt-6 md:ml-56 md:px-10 md:pb-16 md:pt-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-brand/20 bg-canvas/95 px-1 pb-[env(safe-area-inset-bottom)] pt-1 md:hidden",
				children: NAV.map((item) => {
					const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] font-medium", active ? "text-brand" : "text-ink-soft"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), item.label]
					}, item.to);
				})
			})
		]
	});
}
function Blob({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 200 200",
		className: cn("pointer-events-none absolute text-brand/20", className),
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M47.5,-61.3C60.6,-53.2,69.4,-37.2,74.1,-20.3C78.8,-3.4,79.3,14.3,72.6,29.1C65.9,43.9,52,55.7,36.4,63.2C20.8,70.7,3.6,73.9,-13.7,72.1C-31,70.3,-48.4,63.5,-60.2,50.8C-72,38.1,-78.3,19.1,-77.4,0.5C-76.6,-18,-68.6,-36.1,-55.5,-45.7C-42.4,-55.3,-24.2,-56.4,-5.9,-50.2C12.4,-44,31.3,-30.5,47.5,-61.3Z",
			transform: "translate(100 100)"
		})
	});
}
//#endregion
export { Blob as n, AppShell as t };
