import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { createTask, endorseSkill, getWorkspace, removeMember, updateTask } from "@/lib/jodo/actions";
import { useMyProfile } from "@/lib/jodo/use-profile";
import { AppShell } from "@/components/jodo/shell";
import { Card, Chip, CoverageRing, SectionTitle } from "@/components/jodo/bits";
import { MonoAvatar } from "@/components/jodo/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TaskStatus } from "@/lib/jodo/types";

export const Route = createFileRoute("/ideas/$ideaId/space")({ component: Space });

function Space() {
  const { ideaId } = Route.useParams();
  const { user, authPending, data: me, isPending } = useMyProfile();
  const qc = useQueryClient();
  const ws = useQuery({
    queryKey: ["workspace", ideaId],
    queryFn: () => getWorkspace({ data: ideaId }),
    enabled: Boolean(user),
  });
  const [title, setTitle] = useState("");
  const [tab, setTab] = useState<"overview" | "team" | "tasks" | "progress">("overview");

  const add = useMutation({
    mutationFn: () => createTask({ data: { ideaId, title } }),
    onSuccess: () => {
      setTitle("");
      void qc.invalidateQueries({ queryKey: ["workspace", ideaId] });
    },
  });
  const patch = useMutation({
    mutationFn: (input: { taskId: string; status?: TaskStatus; assigneeId?: string | null }) =>
      updateTask({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["workspace", ideaId] }),
  });
  const leave = useMutation({
    mutationFn: (profileId: string) => removeMember({ data: { ideaId, profileId } }),
    onSuccess: () => qc.invalidateQueries(),
  });
  const endorse = useMutation({
    mutationFn: (input: { profileId: string; skillName: string }) =>
      endorseSkill({ data: { ideaId, ...input } }),
    onSuccess: () => qc.invalidateQueries(),
  });

  if (authPending || isPending) return <div className="min-h-dvh bg-canvas" />;
  if (!user) return <RedirectToSignIn />;
  if (me && !me.onboardingComplete) return <Navigate to="/onboarding" />;
  const data = ws.data;
  if (ws.isPending) {
    return (
      <AppShell profile={me ?? null}>
        <div className="h-64 animate-pulse rounded-[28px] bg-brand/10" />
      </AppShell>
    );
  }
  if (!data) {
    return (
      <AppShell profile={me ?? null}>
        <p>Workspace not found.</p>
      </AppShell>
    );
  }
  const idea = data.idea;
  const onTeam = idea.teammates.some((m) => m.profileId === me?.id);

  return (
    <AppShell profile={me ?? null}>
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">Workspace</p>
      <h1 className="font-display text-5xl font-semibold tracking-tight">{idea.title}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {(["overview", "team", "tasks", "progress"] as const).map((t) => (
          <Chip key={t} active={tab === t} onClick={() => setTab(t)}>
            {t}
          </Chip>
        ))}
        <Link to="/ideas/$ideaId" params={{ ideaId }}>
          <Button variant="ghost" size="sm">
            Back to matching
          </Button>
        </Link>
      </div>

      {tab === "overview" && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <p className="text-ink-soft">{idea.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {idea.teammates.map((m) => (
                <div key={m.profileId} className="flex items-center gap-2 rounded-full bg-blush/60 px-2 py-1">
                  <MonoAvatar name={m.profile.name} avatarKey={m.profile.avatarKey} size={28} />
                  <span className="pr-2 text-sm">{m.profile.name}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="flex flex-col items-center">
            <CoverageRing value={data.progress} />
            <p className="mt-2 text-sm text-ink-soft">Task progress</p>
            <p className="font-display text-2xl">{idea.validation.coverage}% skill cover</p>
          </Card>
        </div>
      )}

      {tab === "team" && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {idea.teammates.map((m) => (
            <Card key={m.profileId}>
              <div className="flex items-start gap-3">
                <MonoAvatar name={m.profile.name} avatarKey={m.profile.avatarKey} avatarUrl={m.profile.avatarUrl} size={52} />
                <div>
                  <Link to="/people/$profileId" params={{ profileId: m.profile.id }} className="font-display text-2xl">
                    {m.profile.name}
                  </Link>
                  <p className="text-sm text-ink-soft">{m.role}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {m.profile.skills.slice(0, 5).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className="rounded-full bg-gold px-3 py-1 text-xs"
                    onClick={() => {
                      if (onTeam && me && me.id !== m.profileId) {
                        endorse.mutate({ profileId: m.profileId, skillName: s.name });
                      }
                    }}
                    title={onTeam && me?.id !== m.profileId ? "Verify this skill as a teammate" : s.confidence}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
              {me && m.source !== "owner" && (me.id === idea.ownerId || me.id === m.profileId) && (
                <Button className="mt-4" variant="outline" size="sm" onClick={() => leave.mutate(m.profileId)}>
                  {me.id === m.profileId ? "Leave team" : "Remove from team"}
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}

      {tab === "tasks" && (
        <div className="mt-8">
          {onTeam ? (
            <form
              className="mb-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (title.trim()) add.mutate();
              }}
            >
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="A task the team can actually do" />
              <Button type="submit">Add</Button>
            </form>
          ) : (
            <p className="mb-4 text-sm text-ink-soft">Join the team to add tasks.</p>
          )}
          <div className="space-y-2">
            {data.tasks.map((t) => (
              <Card key={t.id} className="flex flex-wrap items-center gap-3">
                <p className={`flex-1 font-medium ${t.status === "done" ? "line-through opacity-60" : ""}`}>{t.title}</p>
                <select
                  className="h-10 rounded-xl bg-canvas-deep px-2 text-sm"
                  value={t.assigneeId ?? ""}
                  onChange={(e) => patch.mutate({ taskId: t.id, assigneeId: e.target.value || null })}
                >
                  <option value="">Unassigned</option>
                  {idea.teammates.map((m) => (
                    <option key={m.profileId} value={m.profileId}>
                      {m.profile.name}
                    </option>
                  ))}
                </select>
                <select
                  className="h-10 rounded-xl bg-canvas-deep px-2 text-sm"
                  value={t.status}
                  onChange={(e) => patch.mutate({ taskId: t.id, status: e.target.value as TaskStatus })}
                >
                  <option value="todo">To do</option>
                  <option value="doing">Doing</option>
                  <option value="done">Done</option>
                </select>
              </Card>
            ))}
            {data.tasks.length === 0 && <p className="text-ink-soft">No tasks yet. Progress stays at 0 until work exists.</p>}
          </div>
        </div>
      )}

      {tab === "progress" && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card className="flex flex-col items-center py-10">
            <CoverageRing value={data.progress} size={140} />
            <p className="mt-4 font-display text-2xl">
              {data.tasks.filter((t) => t.status === "done").length} / {data.tasks.length} tasks done
            </p>
          </Card>
          <Card>
            <p className="font-display text-2xl">Skill coverage</p>
            <p className="mt-2 text-ink-soft">
              {idea.validation.coverage}% of required capabilities are present on the current team.
            </p>
            {idea.missing.length > 0 ? (
              <div className="mt-4 space-y-2">
                {idea.missing.map((m) => (
                  <p key={m.requirementId}>
                    Still missing: <strong>{m.role}</strong>
                  </p>
                ))}
                <Link to="/ideas/$ideaId" params={{ ideaId }}>
                  <Button className="mt-2">Find replacements</Button>
                </Link>
              </div>
            ) : (
              <p className="mt-4">No missing pieces right now.</p>
            )}
          </Card>
        </div>
      )}
    </AppShell>
  );
}
