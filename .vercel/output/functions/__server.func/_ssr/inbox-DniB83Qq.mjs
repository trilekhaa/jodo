import { S as Navigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as EmptyNote, b as listInbox, c as SectionTitle, k as useMyProfile, n as Chip, s as RedirectToSignIn, t as Card, u as cancelRequest, w as respondRequest } from "./bits-Cw7hr8uM.mjs";
import { t as AppShell } from "./shell-Br7xA0ge.mjs";
import { t as Button } from "./button-CrH1z0pi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox-DniB83Qq.js
var import_jsx_runtime = require_jsx_runtime();
function Inbox() {
	const { user, authPending, data: profile, isPending } = useMyProfile();
	const qc = useQueryClient();
	const box = useQuery({
		queryKey: ["inbox"],
		queryFn: () => listInbox(),
		enabled: Boolean(user) && Boolean(profile?.onboardingComplete)
	});
	const respond = useMutation({
		mutationFn: (input) => respondRequest({ data: input }),
		onSuccess: () => qc.invalidateQueries()
	});
	const cancel = useMutation({
		mutationFn: (id) => cancelRequest({ data: id }),
		onSuccess: () => qc.invalidateQueries()
	});
	if (authPending || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-canvas" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (profile && !profile.onboardingComplete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	const incoming = box.data?.incoming ?? [];
	const outgoing = box.data?.outgoing ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		profile: profile ?? null,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			kicker: "Inbox",
			title: "Collaboration"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-2xl",
				children: "Incoming"
			}), incoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "When someone wants you on an idea, it shows up here so you can accept or reject." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: incoming.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: r.status }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-2xl",
						children: r.ideaTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-ink-soft",
						children: [
							r.senderName,
							" · ",
							r.role
						]
					}),
					r.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => respond.mutate({
								requestId: r.id,
								accept: true
							}),
							children: "Accept"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => respond.mutate({
								requestId: r.id,
								accept: false
							}),
							children: "Reject"
						})]
					}),
					r.status === "accepted" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ideas/$ideaId/space",
						params: { ideaId: r.ideaId },
						className: "mt-2 inline-block text-sm underline",
						children: "Open workspace"
					})
				] }, r.id))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-2xl",
				children: "Sent"
			}), outgoing.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "Requests you send stay visible: pending, accepted, rejected, or cancelled." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: outgoing.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: r.status === "pending",
						children: r.status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-2xl",
						children: r.receiverName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-ink-soft",
						children: [
							r.role,
							" · ",
							r.ideaTitle
						]
					}),
					r.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						size: "sm",
						variant: "outline",
						onClick: () => cancel.mutate(r.id),
						children: "Cancel request"
					})
				] }, r.id))
			})] })]
		})]
	});
}
//#endregion
export { Inbox as component };
