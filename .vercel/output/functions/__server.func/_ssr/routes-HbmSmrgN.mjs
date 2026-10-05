import { S as Navigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { a as useCurrentUserState, n as MonoAvatar } from "./avatar-B8NRGib8.mjs";
import { a as Plus, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as EmptyNote, c as SectionTitle, h as getDashboard, i as CoverageRing, k as useMyProfile, n as Chip, s as RedirectToSignIn, t as Card } from "./bits-Cw7hr8uM.mjs";
import { n as Blob, t as AppShell } from "./shell-Br7xA0ge.mjs";
import { t as Button } from "./button-CrH1z0pi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-HbmSmrgN.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-canvas" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landing, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {});
}
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-dvh overflow-hidden bg-canvas text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blob, { className: "-top-32 right-[-8rem] w-[36rem]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blob, { className: "bottom-[-10rem] left-[-8rem] w-[32rem] -rotate-12" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl font-semibold",
					children: "JODO"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						children: "Enter"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 mx-auto grid max-w-6xl items-end gap-10 px-5 pt-10 pb-20 md:grid-cols-[1.2fr_0.8fr] md:pt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-[11px] font-semibold tracking-[0.22em] text-brand uppercase",
						children: "Talent · Idea · Completion"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-6xl leading-[0.92] font-semibold tracking-tight md:text-8xl",
						children: [
							"No idea",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"builds",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"alone."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-md text-lg text-ink-soft",
						children: "JODO starts with an idea, finds the missing pieces, and introduces the people who can complete it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								children: ["Start with an idea ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rotate-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.18em] text-brand uppercase",
							children: "Missing pieces"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3",
							children: ["GIS Specialist", "Full-Stack Developer"].map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between rounded-2xl bg-blush/60 px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: role
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-brand",
									children: "Open"
								})]
							}, role))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "absolute -bottom-8 -left-4 w-[85%] -rotate-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-[0.18em] text-brand uppercase",
								children: "Why this person"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-2xl",
								children: "Arjun — 94%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-ink-soft",
								children: "Verified GIS · satellite drought maps · available"
							})
						]
					})]
				})]
			})
		]
	});
}
function Dashboard() {
	const { data: profile, isPending, user } = useMyProfile();
	const dash = useQuery({
		queryKey: ["dashboard", user?.id],
		queryFn: () => getDashboard(),
		enabled: Boolean(user) && Boolean(profile?.onboardingComplete)
	});
	if (isPending || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		profile: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-[28px] bg-brand/10" })
	});
	if (!profile.onboardingComplete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const first = profile.name.split(" ")[0];
	const data = dash.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		profile,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold tracking-[0.18em] text-brand uppercase",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-5xl font-semibold tracking-tight md:text-6xl",
						children: [
							"Hey ",
							first,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-ink-soft",
						children: "What is missing from the idea — and who can complete it?"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/ideas/new",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Create idea"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-4 md:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "md:col-span-2 bg-brand text-canvas",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.18em] uppercase opacity-80",
							children: "Start here"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-4xl leading-tight",
							children: "Drop a sentence. JODO does the rest."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-lg text-canvas/85",
							children: "Describe the idea in plain language. JODO extracts roles, hidden requirements, and the people who fill the gaps."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/ideas/new",
							className: "mt-6 inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "inverse",
								children: "Write the idea"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.18em] text-brand uppercase",
						children: "Active coverage"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-2xl",
						children: data?.ideas.length ? `${data.ideas.length} idea${data.ideas.length === 1 ? "" : "s"}` : "No ideas yet"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageRing, { value: data?.ideas[0]?.coverage ?? 0 })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Live",
					title: "Active projects"
				}), data?.ideas.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: data.ideas.map((idea, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ideas/$ideaId",
						params: { ideaId: idea.id },
						className: "stagger-item",
						style: { animationDelay: `${i * 70}ms` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "h-full hover:shadow-lift",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] tracking-[0.16em] text-brand uppercase",
										children: idea.status
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 font-display text-2xl",
										children: idea.title
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageRing, {
										value: idea.coverage,
										size: 72
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 line-clamp-2 text-sm text-ink-soft",
									children: idea.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-wrap gap-2",
									children: [idea.domains.slice(0, 3).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: d }, d)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										active: idea.missingCount > 0,
										children: idea.missingCount ? `${idea.missingCount} missing` : "Complete"
									})]
								})
							]
						})
					}, idea.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "Create an idea and JODO will show missing roles here — not a generic feed." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid gap-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Gaps",
					title: "Missing pieces"
				}), data?.missingHighlights.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: data.missingHighlights.flatMap((h) => h.pieces.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ideas/$ideaId",
						params: { ideaId: h.ideaId },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "jodo-enter",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-ink-soft",
									children: h.ideaTitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl",
									children: p.role
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-ink-soft",
									children: p.reason
								})
							]
						})
					}, p.requirementId)))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "No missing pieces yet. They appear the moment JODO compares the idea to your team." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "People",
					title: "Recommended"
				}), data?.recommended.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: data.recommended.slice(0, 4).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/people/$profileId",
						params: { profileId: m.profile.id },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoAvatar, {
									name: m.profile.name,
									avatarKey: m.profile.avatarKey,
									avatarUrl: m.profile.avatarUrl,
									size: 52
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl leading-tight",
										children: m.profile.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-sm text-ink-soft",
										children: [
											m.role,
											" · ",
											m.reasons[0]
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-2xl tabular-nums",
									children: [m.score, "%"]
								})
							]
						})
					}, m.profile.id + m.role))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "Recommendations appear from actual missing roles, not a random list." })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					kicker: "Inbox",
					title: "Collaboration requests",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/inbox",
						className: "text-sm underline-offset-4 hover:underline",
						children: "Open inbox"
					})
				}), data?.incoming.filter((r) => r.status === "pending").length || data?.outgoing.filter((r) => r.status === "pending").length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 md:grid-cols-2",
					children: [data.incoming.filter((r) => r.status === "pending").map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.16em] text-brand uppercase",
							children: "Incoming"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-2xl",
							children: r.ideaTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-ink-soft",
							children: [
								r.senderName,
								" invited you as ",
								r.role
							]
						})
					] }, r.id)), data.outgoing.filter((r) => r.status === "pending").slice(0, 4).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.16em] text-brand uppercase",
							children: "Sent · pending"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-2xl",
							children: r.receiverName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-ink-soft",
							children: [
								r.role,
								" for ",
								r.ideaTitle
							]
						})
					] }, r.id))]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "Pending invites will land here. Sent, received, accepted, rejected — all of it is live." })]
			})
		]
	});
}
//#endregion
export { Home as component };
