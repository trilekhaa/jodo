import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as Navigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as MonoAvatar } from "./avatar-B8NRGib8.mjs";
import { n as Route } from "./router-CZhXfZ85.mjs";
import { C as removeMember, O as updateTask, f as createTask, i as CoverageRing, k as useMyProfile, n as Chip, p as endorseSkill, s as RedirectToSignIn, t as Card, y as getWorkspace } from "./bits-Cw7hr8uM.mjs";
import { t as AppShell } from "./shell-Br7xA0ge.mjs";
import { t as Button } from "./button-CrH1z0pi.mjs";
import { t as Input } from "./input-CU4m8PXb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ideas._ideaId.space-CUR0lPJU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Space() {
	const { ideaId } = Route.useParams();
	const { user, authPending, data: me, isPending } = useMyProfile();
	const qc = useQueryClient();
	const ws = useQuery({
		queryKey: ["workspace", ideaId],
		queryFn: () => getWorkspace({ data: ideaId }),
		enabled: Boolean(user)
	});
	const [title, setTitle] = (0, import_react.useState)("");
	const [tab, setTab] = (0, import_react.useState)("overview");
	const add = useMutation({
		mutationFn: () => createTask({ data: {
			ideaId,
			title
		} }),
		onSuccess: () => {
			setTitle("");
			qc.invalidateQueries({ queryKey: ["workspace", ideaId] });
		}
	});
	const patch = useMutation({
		mutationFn: (input) => updateTask({ data: input }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["workspace", ideaId] })
	});
	const leave = useMutation({
		mutationFn: (profileId) => removeMember({ data: {
			ideaId,
			profileId
		} }),
		onSuccess: () => qc.invalidateQueries()
	});
	const endorse = useMutation({
		mutationFn: (input) => endorseSkill({ data: {
			ideaId,
			...input
		} }),
		onSuccess: () => qc.invalidateQueries()
	});
	if (authPending || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-canvas" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (me && !me.onboardingComplete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	const data = ws.data;
	if (ws.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		profile: me ?? null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-[28px] bg-brand/10" })
	});
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		profile: me ?? null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Workspace not found." })
	});
	const idea = data.idea;
	const onTeam = idea.teammates.some((m) => m.profileId === me?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		profile: me ?? null,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold tracking-[0.18em] text-brand uppercase",
				children: "Workspace"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl font-semibold tracking-tight",
				children: idea.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [[
					"overview",
					"team",
					"tasks",
					"progress"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: tab === t,
					onClick: () => setTab(t),
					children: t
				}, t)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/ideas/$ideaId",
					params: { ideaId },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						children: "Back to matching"
					})
				})]
			}),
			tab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-ink-soft",
						children: idea.description
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: idea.teammates.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-full bg-blush/60 px-2 py-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoAvatar, {
								name: m.profile.name,
								avatarKey: m.profile.avatarKey,
								size: 28
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pr-2 text-sm",
								children: m.profile.name
							})]
						}, m.profileId))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageRing, { value: data.progress }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-ink-soft",
							children: "Task progress"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-2xl",
							children: [idea.validation.coverage, "% skill cover"]
						})
					]
				})]
			}),
			tab === "team" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-2",
				children: idea.teammates.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoAvatar, {
							name: m.profile.name,
							avatarKey: m.profile.avatarKey,
							avatarUrl: m.profile.avatarUrl,
							size: 52
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/people/$profileId",
							params: { profileId: m.profile.id },
							className: "font-display text-2xl",
							children: m.profile.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-ink-soft",
							children: m.role
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: m.profile.skills.slice(0, 5).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded-full bg-gold px-3 py-1 text-xs",
							onClick: () => {
								if (onTeam && me && me.id !== m.profileId) endorse.mutate({
									profileId: m.profileId,
									skillName: s.name
								});
							},
							title: onTeam && me?.id !== m.profileId ? "Verify this skill as a teammate" : s.confidence,
							children: s.name
						}, s.id))
					}),
					me && m.source !== "owner" && (me.id === idea.ownerId || me.id === m.profileId) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						variant: "outline",
						size: "sm",
						onClick: () => leave.mutate(m.profileId),
						children: me.id === m.profileId ? "Leave team" : "Remove from team"
					})
				] }, m.profileId))
			}),
			tab === "tasks" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [onTeam ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mb-4 flex gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						if (title.trim()) add.mutate();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "A task the team can actually do"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Add"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-ink-soft",
					children: "Join the team to add tasks."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [data.tasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `flex-1 font-medium ${t.status === "done" ? "line-through opacity-60" : ""}`,
								children: t.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "h-10 rounded-xl bg-canvas-deep px-2 text-sm",
								value: t.assigneeId ?? "",
								onChange: (e) => patch.mutate({
									taskId: t.id,
									assigneeId: e.target.value || null
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Unassigned"
								}), idea.teammates.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: m.profileId,
									children: m.profile.name
								}, m.profileId))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "h-10 rounded-xl bg-canvas-deep px-2 text-sm",
								value: t.status,
								onChange: (e) => patch.mutate({
									taskId: t.id,
									status: e.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "todo",
										children: "To do"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "doing",
										children: "Doing"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "done",
										children: "Done"
									})
								]
							})
						]
					}, t.id)), data.tasks.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-ink-soft",
						children: "No tasks yet. Progress stays at 0 until work exists."
					})]
				})]
			}),
			tab === "progress" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col items-center py-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageRing, {
						value: data.progress,
						size: 140
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 font-display text-2xl",
						children: [
							data.tasks.filter((t) => t.status === "done").length,
							" / ",
							data.tasks.length,
							" tasks done"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: "Skill coverage"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-ink-soft",
						children: [idea.validation.coverage, "% of required capabilities are present on the current team."]
					}),
					idea.missing.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-2",
						children: [idea.missing.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Still missing: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: m.role })] }, m.requirementId)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/ideas/$ideaId",
							params: { ideaId },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-2",
								children: "Find replacements"
							})
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4",
						children: "No missing pieces right now."
					})
				] })]
			})
		]
	});
}
//#endregion
export { Space as component };
