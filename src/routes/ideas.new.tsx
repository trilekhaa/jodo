import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { createIdea, listPeople } from "@/lib/jodo/actions";
import { useMyProfile } from "@/lib/jodo/use-profile";
import { AppShell } from "@/components/jodo/shell";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Chip } from "@/components/jodo/bits";
import { MonoAvatar } from "@/components/jodo/avatar";

export const Route = createFileRoute("/ideas/new")({ component: NewIdea });

const STARTERS = [
  "I want to detect crop diseases using satellite images.",
  "I want a tutor that helps with homework in Hindi and Tamil.",
  "I want cheap soil-moisture sensors farmers can repair themselves.",
  "I want a public map of which neighborhoods will overheat this summer.",
];

function NewIdea() {
  const { user, authPending, data: profile, isPending } = useMyProfile();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const people = useQuery({ queryKey: ["people"], queryFn: () => listPeople(), enabled: Boolean(user) });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domainHint, setDomainHint] = useState("");
  const [constraints, setConstraints] = useState("");
  const [timeline, setTimeline] = useState("");
  const [more, setMore] = useState(false);
  const [teammates, setTeammates] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: () =>
      createIdea({
        data: {
          title,
          description,
          domainHint,
          constraints,
          timeline,
          existingTeammateIds: teammates,
        },
      }),
    onSuccess: async (idea) => {
      await qc.invalidateQueries();
      if (idea) navigate({ to: "/ideas/$ideaId", params: { ideaId: idea.id } });
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Could not analyze idea"),
  });

  if (authPending || isPending) return <div className="min-h-dvh bg-canvas" />;
  if (!user) return <RedirectToSignIn />;
  if (profile && !profile.onboardingComplete) return <Navigate to="/onboarding" />;

  return (
    <AppShell profile={profile ?? null}>
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">Create idea</p>
      <h1 className="mt-2 font-display text-5xl leading-tight font-semibold tracking-tight md:text-6xl">
        Say it like you’d say it to a friend.
      </h1>
      <form
        className="mt-8 max-w-2xl space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate();
        }}
      >
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="CropVision" required />
        </div>
        <div>
          <Label htmlFor="desc">The idea</Label>
          <Textarea
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="I want to detect crop diseases using satellite images."
            required
            className="min-h-40 text-lg"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {STARTERS.map((s) => (
              <Chip
                key={s}
                onClick={() => {
                  setDescription(s);
                  if (!title) setTitle(s.split(" ").slice(0, 3).join(" "));
                }}
              >
                {s.slice(0, 42)}…
              </Chip>
            ))}
          </div>
        </div>
        <button type="button" className="text-sm underline-offset-4 hover:underline" onClick={() => setMore(!more)}>
          {more ? "Hide optional details" : "Add teammates, domain, constraints"}
        </button>
        {more && (
          <div className="space-y-4 rounded-[24px] bg-canvas-deep/60 p-4">
            <div>
              <Label htmlFor="domain">Domain</Label>
              <Input id="domain" value={domainHint} onChange={(e) => setDomainHint(e.target.value)} placeholder="Agriculture" />
            </div>
            <div>
              <Label htmlFor="constraints">Constraints</Label>
              <Input id="constraints" value={constraints} onChange={(e) => setConstraints(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <Input id="timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)} placeholder="First field test in 90 days" />
            </div>
            <div>
              <Label>Existing teammates</Label>
              <div className="mt-2 grid max-h-56 gap-2 overflow-auto">
                {(people.data ?? []).map((p) => {
                  const on = teammates.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setTeammates(on ? teammates.filter((id) => id !== p.id) : [...teammates, p.id])}
                      className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-left ${on ? "bg-brand text-canvas" : "bg-canvas"}`}
                    >
                      <MonoAvatar name={p.name} avatarKey={p.avatarKey} avatarUrl={p.avatarUrl} size={36} />
                      <span>
                        {p.name}
                        <span className={on ? "block text-xs text-canvas/80" : "block text-xs text-ink-soft"}>
                          {p.skills.slice(0, 3).map((s) => s.name).join(" · ")}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {error ? <p className="text-sm text-brand-deep">{error}</p> : null}
        <Button type="submit" size="lg" disabled={create.isPending}>
          {create.isPending ? "JODO is reading the idea…" : "Analyze with JODO"}
        </Button>
      </form>
    </AppShell>
  );
}
