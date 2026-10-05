import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as Navigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { a as useCurrentUserState } from "./avatar-B8NRGib8.mjs";
import { t as GROK_PROVIDERS } from "./server-B9t0ij-0.mjs";
import { n as Blob } from "./shell-Br7xA0ge.mjs";
import { t as Button } from "./button-CrH1z0pi.mjs";
import { n as Label, t as Input } from "./input-CU4m8PXb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DXVySDk9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-canvas" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	async function onEmail(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		try {
			if (mode === "up") {
				const { error: err } = await authClient.signUp.email({
					email,
					password,
					name: name || email.split("@")[0]
				});
				if (err) throw new Error(err.message);
			} else {
				const { error: err } = await authClient.signIn.email({
					email,
					password
				});
				if (err) throw new Error(err.message);
			}
			window.location.href = "/";
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not continue");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-dvh overflow-hidden bg-canvas px-5 py-10 text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blob, { className: "-top-24 -right-16 w-[28rem]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blob, { className: "-bottom-24 -left-20 w-[24rem] rotate-12" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-display text-5xl font-semibold",
						children: "JODO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 font-display text-4xl leading-[1.05] font-medium tracking-tight md:text-5xl",
						children: [
							"Come in.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Bring an idea."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-sm text-ink-soft",
						children: "JODO figures out what the idea is missing, then finds the people who can complete it."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[32px] bg-canvas p-6 shadow-card md:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold",
						children: mode === "in" ? "Sign in" : "Create account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-3",
						children: [
							GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "w-full",
								type: "button",
								onClick: () => signIn(p.providerId, { callbackURL: "/" }),
								children: ["Continue with ", p.label]
							}, p.providerId)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pt-2 text-center text-xs tracking-[0.2em] text-ink-soft uppercase",
								children: "or email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: onEmail,
								className: "space-y-3",
								children: [
									mode === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "name",
										children: "Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "name",
										value: name,
										onChange: (e) => setName(e.target.value),
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "email",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "email",
										type: "email",
										autoComplete: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "password",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "password",
										type: "password",
										autoComplete: mode === "up" ? "new-password" : "current-password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										minLength: 8,
										required: true
									})] }),
									error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-brand-deep",
										children: error
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										className: "w-full",
										disabled: busy,
										children: busy ? "Working…" : mode === "in" ? "Enter JODO" : "Create account"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "w-full text-sm text-ink-soft underline-offset-4 hover:underline",
								onClick: () => setMode(mode === "in" ? "up" : "in"),
								children: mode === "in" ? "New here? Create an account" : "Already have an account? Sign in"
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Login as component };
