import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as Navigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as MonoAvatar } from "./avatar-B8NRGib8.mjs";
import { l as Check, t as X } from "../_libs/lucide-react.mjs";
import { r as Route$1 } from "./router-CZhXfZ85.mjs";
import { C as removeMember, E as sendRequest, S as reanalyzeIdea, _ as getIdea, c as SectionTitle, i as CoverageRing, k as useMyProfile, m as followUpSeeds, n as Chip, o as PriorityMark, s as RedirectToSignIn, t as Card, u as cancelRequest } from "./bits-Cw7hr8uM.mjs";
import { t as AppShell } from "./shell-Br7xA0ge.mjs";
import { t as Button } from "./button-CrH1z0pi.mjs";
import { r as Textarea } from "./input-CU4m8PXb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ideas._ideaId.index-DJNhIR3K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IdeaPage() {
	const { ideaId } = Route$1.useParams();
	const { user, authPending, data: me, isPending } = useMyProfile();
	const qc = useQueryClient();
	const idea = useQuery({
		queryKey: ["idea", ideaId],
		queryFn: () => getIdea({ data: ideaId }),
		enabled: Boolean(user)
	});
	const [openWhy, setOpenWhy] = (0, import_react.useState)(null);
	const [desc, setDesc] = (0, import_react.useState)(null);
	const refresh = () => qc.invalidateQueries({ queryKey: ["idea", ideaId] });
	const send = useMutation({
		mutationFn: (input) => sendRequest({ data: {
			ideaId,
			...input
		} }),
		onSuccess: refresh
	});
	const cancel = useMutation({
		mutationFn: (id) => cancelRequest({ data: id }),
		onSuccess: refresh
	});
	const follow = useMutation({
		mutationFn: () => followUpSeeds({ data: ideaId }),
		onSuccess: () => {
			qc.invalidateQueries();
		}
	});
	const leave = useMutation({
		mutationFn: (profileId) => removeMember({ data: {
			ideaId,
			profileId
		} }),
		onSuccess: () => qc.invalidateQueries()
	});
	const rean = useMutation({
		mutationFn: () => reanalyzeIdea({ data: {
			ideaId,
			description: desc ?? void 0
		} }),
		onSuccess: () => qc.invalidateQueries()
	});
	if (authPending || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-canvas" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (me && !me.onboardingComplete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	if (idea.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		profile: me ?? null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-[28px] bg-brand/10" })
	});
	const d = idea.data;
	if (!d) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		profile: me ?? null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Idea not found." })
	});
	const isOwner = me?.id === d.ownerId;
	const grouped = /* @__PURE__ */ new Map();
	for (const m of d.matches) {
		const list = grouped.get(m.requirementId) ?? [];
		list.push(m);
		grouped.set(m.requirementId, list);
	}
	const pendingOut = d.requests.filter((r) => r.status === "pending" && r.senderId === me?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		profile: me ?? null,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold tracking-[0.18em] text-brand uppercase",
				children: d.status
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "max-w-3xl font-display text-5xl leading-[0.95] font-semibold tracking-tight md:text-6xl",
					children: d.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageRing, { value: d.validation.coverage })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-lg text-ink-soft",
				children: d.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [(d.analysis?.domains ?? []).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: true,
					children: x
				}, x)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/ideas/$ideaId/space",
					params: { ideaId },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						children: "Open workspace"
					})
				})]
			}),
			d.analysis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						kicker: "JODO understood",
						title: "The idea, unpacked"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.16em] text-brand uppercase",
							children: "Problem"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-2xl",
							children: d.analysis.problem
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.16em] text-brand uppercase",
							children: "Goal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-2xl",
							children: d.analysis.goal
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [d.analysis.technologies.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: t }, t)), d.analysis.subDomains.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: t }, t))]
					}),
					d.analysis.usedAi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-ink-soft",
						children: "Enhanced with live JODO analysis."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-ink-soft",
						children: "Analyzed with JODO’s local intelligence layer."
					})
				]
			}),
			d.analysis && d.analysis.hiddenRequirements.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "JODO noticed",
					title: "Hidden requirements"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 md:grid-cols-2",
					children: d.analysis.hiddenRequirements.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "stagger-item border-l-4 border-brand",
						style: { animationDelay: `${i * 80}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl",
								children: h.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-ink-soft",
								children: h.reason
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs tracking-[0.14em] text-brand uppercase",
								children: ["Tied to ", h.relatedRole]
							})
						]
					}, h.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						kicker: "Now",
						title: "Current team vs needs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: d.requirements.map((req) => {
							const covered = d.teammates.some((m) => d.validation.coveredRoles.includes(req.role)) && !d.missing.some((m) => m.requirementId === req.id);
							const who = d.teammates.find((m) => m.role === req.role);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: covered ? "bg-blush/50" : "",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-2xl",
											children: req.role
										}), covered ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "text-brand" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "text-brand" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityMark, { priority: req.priority }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-ink-soft",
										children: req.reason
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm",
										children: covered ? `Covered by ${who?.profile.name ?? "the team"}` : "Missing from the current team"
									})
								]
							}, req.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: d.teammates.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "jodo-gather flex items-center gap-2 rounded-full bg-canvas px-2 py-1 shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoAvatar, {
									name: m.profile.name,
									avatarKey: m.profile.avatarKey,
									avatarUrl: m.profile.avatarUrl,
									size: 32
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "pr-2 text-sm",
									children: [m.profile.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-ink-soft",
										children: [" · ", m.role]
									})]
								}),
								isOwner && m.source !== "owner" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "pr-2 text-xs text-brand",
									onClick: () => leave.mutate(m.profileId),
									children: "Remove"
								})
							]
						}, m.profileId))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Core",
					title: "Missing pieces"
				}), d.missing.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "bg-brand text-canvas",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl",
						children: "The team covers this idea."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-canvas/85",
						children: "If someone leaves, JODO will re-open the gap and search again."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: d.missing.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "stagger-item",
						style: { animationDelay: `${i * 70}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityMark, { priority: p.priority }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl",
									children: p.role
								})] }), p.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "JODO noticed" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "Stated need" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-ink-soft",
								children: p.reason
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: p.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: s }, s))
							})
						]
					}, p.requirementId))
				})]
			}),
			d.missing.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Talent",
					title: "Who can complete it"
				}), d.missing.map((piece) => {
					const cands = grouped.get(piece.requirementId) ?? [];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-3 font-display text-2xl",
							children: piece.role
						}), cands.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-ink-soft",
							children: "No strong matches in the network yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: cands.map((c) => {
								const pending = d.requests.find((r) => r.receiverId === c.profile.id && r.status === "pending");
								const accepted = d.teammates.some((m) => m.profileId === c.profile.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									className: "jodo-enter",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoAvatar, {
													name: c.profile.name,
													avatarKey: c.profile.avatarKey,
													avatarUrl: c.profile.avatarUrl,
													size: 56
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 flex-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/people/$profileId",
														params: { profileId: c.profile.id },
														className: "font-display text-2xl",
														children: c.profile.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm text-ink-soft",
														children: c.profile.bio
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "font-display text-4xl tabular-nums",
													children: [c.score, "%"]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "mt-3 text-sm underline-offset-4 hover:underline",
											onClick: () => setOpenWhy(openWhy === c.profile.id + piece.requirementId ? null : c.profile.id + piece.requirementId),
											children: "Why this person?"
										}),
										openWhy === c.profile.id + piece.requirementId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "mt-3 space-y-1 text-sm",
											children: c.reasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 text-brand" }),
													" ",
													r
												]
											}, r))
										}),
										isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-4 flex flex-wrap gap-2",
											children: accepted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
												active: true,
												children: "On the team"
											}) : pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "outline",
												size: "sm",
												onClick: () => cancel.mutate(pending.id),
												children: "Cancel request"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												disabled: send.isPending,
												onClick: () => send.mutate({
													receiverId: c.profile.id,
													role: piece.role,
													requirementId: piece.requirementId
												}),
												children: "Send collaboration request"
											})
										})
									]
								}, c.profile.id);
							})
						})]
					}, piece.requirementId);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Architect",
					title: "Proposed team"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-3",
					children: d.proposedTeam.map((seat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "jodo-gather w-full max-w-xs",
						style: { animationDelay: `${i * 90}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoAvatar, {
								name: seat.name,
								avatarKey: seat.avatarKey,
								avatarUrl: seat.avatarUrl,
								size: 48
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-2xl",
								children: seat.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-ink-soft",
								children: seat.role
							}),
							seat.matchScore != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-display text-xl tabular-nums",
								children: [seat.matchScore, "%"]
							}) : null
						]
					}, seat.profileId))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Validation",
					title: "Team coverage"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-wrap items-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageRing, {
						value: d.validation.coverage,
						size: 120
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [d.validation.gaps.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl",
						children: "Critical gaps: none"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl",
						children: "Remaining gaps"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2",
						children: d.validation.gaps.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							g.role,
							" · ",
							g.priority
						] }, g.role))
					})] }), d.validation.complementarity.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink-soft",
						children: c
					}, c))] })]
				})]
			}),
			isOwner && pendingOut.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Requests",
					title: "Waiting on the network"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: pendingOut.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								r.receiverName,
								" · ",
								r.role
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => cancel.mutate(r.id),
								children: "Cancel"
							})]
						}, r.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						disabled: follow.isPending,
						onClick: () => follow.mutate(),
						children: follow.isPending ? "Checking in…" : "Ask JODO to follow up"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink-soft",
						children: "JODO checks availability and interest. People who fit join. People who don’t, decline."
					})
				] })]
			}),
			isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						kicker: "Re-match",
						title: "The idea changed?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: desc ?? d.description,
						onChange: (e) => setDesc(e.target.value),
						className: "max-w-2xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						variant: "outline",
						disabled: rean.isPending,
						onClick: () => rean.mutate(),
						children: rean.isPending ? "Re-analyzing…" : "Re-analyze with JODO"
					})
				]
			})
		]
	});
}
//#endregion
export { IdeaPage as component };
