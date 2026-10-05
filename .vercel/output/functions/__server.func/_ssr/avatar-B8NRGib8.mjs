import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as authClient } from "./client-1vAx-gM_.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/avatar-B8NRGib8.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "J";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
var PATTERNS = {
	orbit: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "32",
		cy: "32",
		r: "18",
		fill: "var(--color-canvas)"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "44",
		cy: "20",
		r: "10",
		fill: "var(--color-canvas)",
		opacity: "0.7"
	})] }),
	split: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: "M8 8h24v48H8z",
		fill: "var(--color-canvas)"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "40",
		cy: "32",
		r: "16",
		fill: "var(--color-canvas)",
		opacity: "0.75"
	})] }),
	petal: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: "32",
			cy: "22",
			rx: "12",
			ry: "16",
			fill: "var(--color-canvas)"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: "22",
			cy: "38",
			rx: "12",
			ry: "16",
			fill: "var(--color-canvas)",
			opacity: "0.7"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: "42",
			cy: "38",
			rx: "12",
			ry: "16",
			fill: "var(--color-canvas)",
			opacity: "0.7"
		})
	] }),
	tile: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "10",
			y: "10",
			width: "20",
			height: "20",
			rx: "4",
			fill: "var(--color-canvas)"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "34",
			y: "10",
			width: "20",
			height: "20",
			rx: "4",
			fill: "var(--color-canvas)",
			opacity: "0.55"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "10",
			y: "34",
			width: "20",
			height: "20",
			rx: "4",
			fill: "var(--color-canvas)",
			opacity: "0.55"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "34",
			y: "34",
			width: "20",
			height: "20",
			rx: "4",
			fill: "var(--color-canvas)"
		})
	] }),
	arc: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: "M8 48a24 24 0 0 1 48 0",
		fill: "var(--color-canvas)"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "32",
		cy: "22",
		r: "10",
		fill: "var(--color-canvas)"
	})] }),
	stack: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: "14",
		y: "28",
		width: "36",
		height: "24",
		rx: "8",
		fill: "var(--color-canvas)"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: "20",
		y: "14",
		width: "24",
		height: "18",
		rx: "8",
		fill: "var(--color-canvas)",
		opacity: "0.7"
	})] }),
	wave: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: "M4 40c8-16 16 16 24 0s16 16 24 0v20H4z",
		fill: "var(--color-canvas)"
	}),
	ring: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "32",
		cy: "32",
		r: "20",
		fill: "none",
		stroke: "var(--color-canvas)",
		strokeWidth: "8"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "32",
		cy: "32",
		r: "8",
		fill: "var(--color-canvas)"
	})] }),
	node: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "18",
			cy: "20",
			r: "7",
			fill: "var(--color-canvas)"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "46",
			cy: "20",
			r: "7",
			fill: "var(--color-canvas)"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "32",
			cy: "44",
			r: "9",
			fill: "var(--color-canvas)"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M18 20 L32 44 L46 20",
			stroke: "var(--color-canvas)",
			strokeWidth: "3",
			fill: "none"
		})
	] }),
	grid: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: 16 + i % 3 * 16,
		cy: 16 + Math.floor(i / 3) * 16,
		r: i === 4 ? 7 : 5,
		fill: "var(--color-canvas)",
		opacity: i === 4 ? 1 : .65
	}, i)) }),
	bloom: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "32",
			cy: "32",
			r: "8",
			fill: "var(--color-canvas)"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "32",
			cy: "14",
			r: "8",
			fill: "var(--color-canvas)",
			opacity: "0.7"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "32",
			cy: "50",
			r: "8",
			fill: "var(--color-canvas)",
			opacity: "0.7"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "14",
			cy: "32",
			r: "8",
			fill: "var(--color-canvas)",
			opacity: "0.7"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "50",
			cy: "32",
			r: "8",
			fill: "var(--color-canvas)",
			opacity: "0.7"
		})
	] }),
	spark: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: "M32 6l6 18 18 6-18 6-6 18-6-18-18-6 18-6z",
		fill: "var(--color-canvas)"
	})
};
var AVATAR_KEYS = Object.keys(PATTERNS);
function MonoAvatar({ name, avatarKey, avatarUrl, size = 48, className }) {
	if (avatarUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: avatarUrl,
		alt: "",
		width: size,
		height: size,
		className: cn("rounded-full object-cover outline outline-1 -outline-offset-1 outline-brand/30", className),
		style: {
			width: size,
			height: size
		}
	});
	const draw = PATTERNS[avatarKey] ?? PATTERNS.orbit;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative shrink-0 overflow-hidden rounded-full bg-brand", className),
		style: {
			width: size,
			height: size
		},
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 64 64",
			className: "absolute inset-0 size-full",
			children: draw()
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute inset-0 grid place-items-center font-display font-semibold text-canvas",
			style: { fontSize: Math.max(12, size * .32) },
			children: initials(name)
		})]
	});
}
//#endregion
export { useCurrentUserState as a, useCurrentUser as i, MonoAvatar as n, cn as r, AVATAR_KEYS as t };
