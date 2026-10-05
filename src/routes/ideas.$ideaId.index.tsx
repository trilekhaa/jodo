import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import {
  cancelRequest,
  followUpSeeds,
  getIdea,
  reanalyzeIdea,
  removeMember,
  sendRequest,
} from "@/lib/jodo/actions";
import { useMyProfile } from "@/lib/jodo/use-profile";
import { AppShell } from "@/components/jodo/shell";
import { Card, Chip, CoverageRing, PriorityMark, SectionTitle } from "@/components/jodo/bits";
import { MonoAvatar } from "@/components/jodo/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import type { RankedCandidate } from "@/lib/jodo/types";

export const Route = createFileRoute("/ideas/$ideaId/")({ component: IdeaPage });

function IdeaPage() {
  const { ideaId } = Route.useParams();
  const { user, authPending, data: me, isPending } = useMyProfile();
  const qc = useQueryClient();
  const idea = useQuery({
    queryKey: ["idea", ideaId],
    queryFn: () => getIdea({ data: ideaId }),
    enabled: Boolean(user),
  });
  const [openWhy, setOpenWhy] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);

  const refresh = () => qc.invalidateQueries({ queryKey: ["idea", ideaId] });

  const send = useMutation({
    mutationFn: (input: { receiverId: string; role: string; requirementId?: string }) =>
      sendRequest({ data: { ideaId, ...input } }),
    onSuccess: refresh,
  });
  const cancel = useMutation({
    mutationFn: (id: string) => cancelRequest({ data: id }),
    onSuccess: refresh,
  });
  const follow = useMutation({
    mutationFn: () => followUpSeeds({ data: ideaId }),
    onSuccess: () => {
      void qc.invalidateQueries();
    },
  });
  const leave = useMutation({
    mutationFn: (profileId: string) => removeMember({ data: { ideaId, profileId } }),
    onSuccess: () => qc.invalidateQueries(),
  });
  const rean = useMutation({
    mutationFn: () => reanalyzeIdea({ data: { ideaId, description: desc ?? undefined } }),
    onSuccess: () => qc.invalidateQueries(),
  });

  if (authPending || isPending) return <div className="min-h-dvh bg-canvas" />;
  if (!user) return <RedirectToSignIn />;
  if (me && !me.onboardingComplete) return <Navigate to="/onboarding" />;
  if (idea.isPending) {
    return (
      <AppShell profile={me ?? null}>
        <div className="h-64 animate-pulse rounded-[28px] bg-brand/10" />
      </AppShell>
    );
  }
  const d = idea.data;
  if (!d) {
    return (
      <AppShell profile={me ?? null}>
        <p>Idea not found.</p>
      </AppShell>
    );
  }

  const isOwner = me?.id === d.ownerId;
  const grouped = new Map<string, RankedCandidate[]>();
  for (const m of d.matches) {
    const list = grouped.get(m.requirementId) ?? [];
    list.push(m);
    grouped.set(m.requirementId, list);
  }
  const pendingOut = d.requests.filter((r) => r.status === "pending" && r.senderId === me?.id);

  return (
    <AppShell profile={me ?? null}>
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">{d.status}</p>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <h1 className="max-w-3xl font-display text-5xl leading-[0.95] font-semibold tracking-tight md:text-6xl">
          {d.title}
        </h1>
        <CoverageRing value={d.validation.coverage} />
      </div>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">{d.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(d.analysis?.domains ?? []).map((x) => (
          <Chip key={x} active>
            {x}
          </Chip>
        ))}
        <Link to="/ideas/$ideaId/space" params={{ ideaId }}>
          <Button variant="outline" size="sm">
            Open workspace
          </Button>
        </Link>
      </div>

      {d.analysis && (
        <section className="mt-12">
          <SectionTitle kicker="JODO understood" title="The idea, unpacked" />
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <p className="text-[11px] tracking-[0.16em] text-brand uppercase">Problem</p>
              <p className="mt-2 font-display text-2xl">{d.analysis.problem}</p>
            </Card>
            <Card>
              <p className="text-[11px] tracking-[0.16em] text-brand uppercase">Goal</p>
              <p className="mt-2 font-display text-2xl">{d.analysis.goal}</p>
            </Card>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {d.analysis.technologies.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
            {d.analysis.subDomains.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
          {d.analysis.usedAi ? (
            <p className="mt-3 text-xs text-ink-soft">Enhanced with live JODO analysis.</p>
          ) : (
            <p className="mt-3 text-xs text-ink-soft">Analyzed with JODO’s local intelligence layer.</p>
          )}
        </section>
      )}

      {d.analysis && d.analysis.hiddenRequirements.length > 0 && (
        <section className="mt-12">
          <SectionTitle kicker="JODO noticed" title="Hidden requirements" />
          <div className="grid gap-3 md:grid-cols-2">
            {d.analysis.hiddenRequirements.map((h, i) => (
              <Card key={h.id} className="stagger-item border-l-4 border-brand" style={{ animationDelay: `${i * 80}ms` }}>
                <p className="font-display text-2xl">{h.title}</p>
                <p className="mt-2 text-sm text-ink-soft">{h.reason}</p>
                <p className="mt-3 text-xs tracking-[0.14em] text-brand uppercase">Tied to {h.relatedRole}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <SectionTitle kicker="Now" title="Current team vs needs" />
        <div className="grid gap-3 md:grid-cols-2">
          {d.requirements.map((req) => {
            const covered = d.teammates.some((m) =>
              d.validation.coveredRoles.includes(req.role),
            ) && !d.missing.some((m) => m.requirementId === req.id);
            const who = d.teammates.find((m) => m.role === req.role);
            return (
              <Card key={req.id} className={covered ? "bg-blush/50" : ""}>
                <div className="flex items-start justify-between">
                  <p className="font-display text-2xl">{req.role}</p>
                  {covered ? <Check className="text-brand" /> : <X className="text-brand" />}
                </div>
                <PriorityMark priority={req.priority} />
                <p className="mt-2 text-sm text-ink-soft">{req.reason}</p>
                <p className="mt-2 text-sm">{covered ? `Covered by ${who?.profile.name ?? "the team"}` : "Missing from the current team"}</p>
              </Card>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {d.teammates.map((m) => (
            <div key={m.profileId} className="jodo-gather flex items-center gap-2 rounded-full bg-canvas px-2 py-1 shadow-card">
              <MonoAvatar name={m.profile.name} avatarKey={m.profile.avatarKey} avatarUrl={m.profile.avatarUrl} size={32} />
              <span className="pr-2 text-sm">
                {m.profile.name}
                <span className="text-ink-soft"> · {m.role}</span>
              </span>
              {isOwner && m.source !== "owner" && (
                <button type="button" className="pr-2 text-xs text-brand" onClick={() => leave.mutate(m.profileId)}>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle kicker="Core" title="Missing pieces" />
        {d.missing.length === 0 ? (
          <Card className="bg-brand text-canvas">
            <p className="font-display text-3xl">The team covers this idea.</p>
            <p className="mt-2 text-canvas/85">If someone leaves, JODO will re-open the gap and search again.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {d.missing.map((p, i) => (
              <Card key={p.requirementId} className="stagger-item" style={{ animationDelay: `${i * 70}ms` }}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <PriorityMark priority={p.priority} />
                    <p className="font-display text-3xl">{p.role}</p>
                  </div>
                  {p.hidden ? <Chip>JODO noticed</Chip> : <Chip>Stated need</Chip>}
                </div>
                <p className="mt-2 text-ink-soft">{p.reason}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.skills.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {d.missing.length > 0 && (
        <section className="mt-12">
          <SectionTitle kicker="Talent" title="Who can complete it" />
          {d.missing.map((piece) => {
            const cands = grouped.get(piece.requirementId) ?? [];
            return (
              <div key={piece.requirementId} className="mb-8">
                <h3 className="mb-3 font-display text-2xl">{piece.role}</h3>
                {cands.length === 0 ? (
                  <p className="text-sm text-ink-soft">No strong matches in the network yet.</p>
                ) : (
                  <div className="space-y-3">
                    {cands.map((c) => {
                      const pending = d.requests.find(
                        (r) => r.receiverId === c.profile.id && r.status === "pending",
                      );
                      const accepted = d.teammates.some((m) => m.profileId === c.profile.id);
                      return (
                        <Card key={c.profile.id} className="jodo-enter">
                          <div className="flex flex-wrap items-center gap-4">
                            <MonoAvatar name={c.profile.name} avatarKey={c.profile.avatarKey} avatarUrl={c.profile.avatarUrl} size={56} />
                            <div className="min-w-0 flex-1">
                              <Link to="/people/$profileId" params={{ profileId: c.profile.id }} className="font-display text-2xl">
                                {c.profile.name}
                              </Link>
                              <p className="text-sm text-ink-soft">{c.profile.bio}</p>
                            </div>
                            <p className="font-display text-4xl tabular-nums">{c.score}%</p>
                          </div>
                          <button
                            type="button"
                            className="mt-3 text-sm underline-offset-4 hover:underline"
                            onClick={() => setOpenWhy(openWhy === c.profile.id + piece.requirementId ? null : c.profile.id + piece.requirementId)}
                          >
                            Why this person?
                          </button>
                          {openWhy === c.profile.id + piece.requirementId && (
                            <ul className="mt-3 space-y-1 text-sm">
                              {c.reasons.map((r) => (
                                <li key={r} className="flex gap-2">
                                  <Check className="mt-0.5 size-4 text-brand" /> {r}
                                </li>
                              ))}
                            </ul>
                          )}
                          {isOwner && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {accepted ? (
                                <Chip active>On the team</Chip>
                              ) : pending ? (
                                <Button variant="outline" size="sm" onClick={() => cancel.mutate(pending.id)}>
                                  Cancel request
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  disabled={send.isPending}
                                  onClick={() =>
                                    send.mutate({
                                      receiverId: c.profile.id,
                                      role: piece.role,
                                      requirementId: piece.requirementId,
                                    })
                                  }
                                >
                                  Send collaboration request
                                </Button>
                              )}
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}

      <section className="mt-12">
        <SectionTitle kicker="Architect" title="Proposed team" />
        <div className="flex flex-wrap gap-3">
          {d.proposedTeam.map((seat, i) => (
            <Card key={seat.profileId} className="jodo-gather w-full max-w-xs" style={{ animationDelay: `${i * 90}ms` }}>
              <MonoAvatar name={seat.name} avatarKey={seat.avatarKey} avatarUrl={seat.avatarUrl} size={48} />
              <p className="mt-3 font-display text-2xl">{seat.name}</p>
              <p className="text-sm text-ink-soft">{seat.role}</p>
              {seat.matchScore != null ? <p className="mt-1 font-display text-xl tabular-nums">{seat.matchScore}%</p> : null}
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle kicker="Validation" title="Team coverage" />
        <Card className="flex flex-wrap items-center gap-6">
          <CoverageRing value={d.validation.coverage} size={120} />
          <div>
            {d.validation.gaps.length === 0 ? (
              <p className="font-display text-3xl">Critical gaps: none</p>
            ) : (
              <>
                <p className="font-display text-3xl">Remaining gaps</p>
                <ul className="mt-2">
                  {d.validation.gaps.map((g) => (
                    <li key={g.role}>
                      {g.role} · {g.priority}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {d.validation.complementarity.map((c) => (
              <p key={c} className="mt-2 text-sm text-ink-soft">
                {c}
              </p>
            ))}
          </div>
        </Card>
      </section>

      {isOwner && pendingOut.length > 0 && (
        <section className="mt-12">
          <SectionTitle kicker="Requests" title="Waiting on the network" />
          <Card>
            <ul className="space-y-3">
              {pendingOut.map((r) => (
                <li key={r.id} className="flex flex-wrap items-center justify-between gap-2">
                  <span>
                    {r.receiverName} · {r.role}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => cancel.mutate(r.id)}>
                    Cancel
                  </Button>
                </li>
              ))}
            </ul>
            <Button className="mt-4" disabled={follow.isPending} onClick={() => follow.mutate()}>
              {follow.isPending ? "Checking in…" : "Ask JODO to follow up"}
            </Button>
            <p className="mt-2 text-sm text-ink-soft">
              JODO checks availability and interest. People who fit join. People who don’t, decline.
            </p>
          </Card>
        </section>
      )}

      {isOwner && (
        <section className="mt-12">
          <SectionTitle kicker="Re-match" title="The idea changed?" />
          <Textarea
            value={desc ?? d.description}
            onChange={(e) => setDesc(e.target.value)}
            className="max-w-2xl"
          />
          <Button className="mt-3" variant="outline" disabled={rean.isPending} onClick={() => rean.mutate()}>
            {rean.isPending ? "Re-analyzing…" : "Re-analyze with JODO"}
          </Button>
        </section>
      )}
    </AppShell>
  );
}
