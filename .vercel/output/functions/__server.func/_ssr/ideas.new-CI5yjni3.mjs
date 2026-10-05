import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useNavigate, S as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as MonoAvatar } from "./avatar-B8NRGib8.mjs";
import { d as createIdea, k as useMyProfile, n as Chip, s as RedirectToSignIn, x as listPeople } from "./bits-Cw7hr8uM.mjs";
import { t as AppShell } from "./shell-Br7xA0ge.mjs";
import { t as Button } from "./button-CrH1z0pi.mjs";
import { n as Label, r as Textarea, t as Input } from "./input-CU4m8PXb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ideas.new-CI5yjni3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STARTERS = [
	"I want to detect crop diseases using satellite images.",
	"I want a tutor that helps with homework in Hindi and Tamil.",
	"I want cheap soil-moisture sensors farmers can repair themselves.",
	"I want a public map of which neighborhoods will overheat this summer."
];
function NewIdea() {
	const { user, authPending, data: profile, isPending } = useMyProfile();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const people = useQuery({
		queryKey: ["people"],
		queryFn: () => listPeople(),
		enabled: Boolean(user)
	});
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [domainHint, setDomainHint] = (0, import_react.useState)("");
	const [constraints, setConstraints] = (0, import_react.useState)("");
	const [timeline, setTimeline] = (0, import_react.useState)("");
	const [more, setMore] = (0, import_react.useState)(false);
	const [teammates, setTeammates] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)(null);
	const create = useMutation({
		mutationFn: () => createIdea({ data: {
			title,
			description,
			domainHint,
			constraints,
			timeline,
			existingTeammateIds: teammates
		} }),
		onSuccess: async (idea) => {
			await qc.invalidateQueries();
			if (idea) navigate({
				to: "/ideas/$ideaId",
				params: { ideaId: idea.id }
			});
		},
		onError: (e) => setError(e instanceof Error ? e.message : "Could not analyze idea")
	});
	if (authPending || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-canvas" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (profile && !profile.onboardingComplete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		profile: profile ?? null,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold tracking-[0.18em] text-brand uppercase",
				children: "Create idea"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl leading-tight font-semibold tracking-tight md:text-6xl",
				children: "Say it like you’d say it to a friend."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 max-w-2xl space-y-5",
				onSubmit: (e) => {
					e.preventDefault();
					create.mutate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "title",
						children: "Title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "title",
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "CropVision",
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "desc",
							children: "The idea"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "desc",
							value: description,
							onChange: (e) => setDescription(e.target.value),
							placeholder: "I want to detect crop diseases using satellite images.",
							required: true,
							className: "min-h-40 text-lg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: STARTERS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								onClick: () => {
									setDescription(s);
									if (!title) setTitle(s.split(" ").slice(0, 3).join(" "));
								},
								children: [s.slice(0, 42), "…"]
							}, s))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm underline-offset-4 hover:underline",
						onClick: () => setMore(!more),
						children: more ? "Hide optional details" : "Add teammates, domain, constraints"
					}),
					more && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 rounded-[24px] bg-canvas-deep/60 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "domain",
								children: "Domain"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "domain",
								value: domainHint,
								onChange: (e) => setDomainHint(e.target.value),
								placeholder: "Agriculture"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "constraints",
								children: "Constraints"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "constraints",
								value: constraints,
								onChange: (e) => setConstraints(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "timeline",
								children: "Timeline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "timeline",
								value: timeline,
								onChange: (e) => setTimeline(e.target.value),
								placeholder: "First field test in 90 days"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Existing teammates" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 grid max-h-56 gap-2 overflow-auto",
								children: (people.data ?? []).map((p) => {
									const on = teammates.includes(p.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setTeammates(on ? teammates.filter((id) => id !== p.id) : [...teammates, p.id]),
										className: `flex items-center gap-3 rounded-2xl px-3 py-2 text-left ${on ? "bg-brand text-canvas" : "bg-canvas"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoAvatar, {
											name: p.name,
											avatarKey: p.avatarKey,
											avatarUrl: p.avatarUrl,
											size: 36
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [p.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: on ? "block text-xs text-canvas/80" : "block text-xs text-ink-soft",
											children: p.skills.slice(0, 3).map((s) => s.name).join(" · ")
										})] })]
									}, p.id);
								})
							})] })
						]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-brand-deep",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						disabled: create.isPending,
						children: create.isPending ? "JODO is reading the idea…" : "Analyze with JODO"
					})
				]
			})
		]
	});
}
//#endregion
export { NewIdea as component };
