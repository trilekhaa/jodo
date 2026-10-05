import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { getPublicProfile } from "@/lib/jodo/actions";
import { useMyProfile } from "@/lib/jodo/use-profile";
import { AppShell } from "@/components/jodo/shell";
import { Card, Chip, ConfidenceMark, SectionTitle } from "@/components/jodo/bits";
import { MonoAvatar } from "@/components/jodo/avatar";

export const Route = createFileRoute("/people/$profileId")({ component: Person });

function Person() {
  const { profileId } = Route.useParams();
  const { user, authPending, data: me, isPending } = useMyProfile();
  const q = useQuery({
    queryKey: ["person", profileId],
    queryFn: () => getPublicProfile({ data: profileId }),
    enabled: Boolean(user),
  });
  if (authPending || isPending) return <div className="min-h-dvh bg-canvas" />;
  if (!user) return <RedirectToSignIn />;
  if (me && !me.onboardingComplete) return <Navigate to="/onboarding" />;
  const p = q.data;
  if (q.isPending) {
    return (
      <AppShell profile={me ?? null}>
        <div className="h-40 animate-pulse rounded-[28px] bg-brand/10" />
      </AppShell>
    );
  }
  if (!p) {
    return (
      <AppShell profile={me ?? null}>
        <p>No profile.</p>
      </AppShell>
    );
  }
  return (
    <AppShell profile={me ?? null}>
      <div className="flex flex-wrap items-end gap-5">
        <MonoAvatar name={p.name} avatarKey={p.avatarKey} avatarUrl={p.avatarUrl} size={96} />
        <div>
          <h1 className="font-display text-5xl font-semibold tracking-tight">{p.name}</h1>
          <p className="mt-2 max-w-xl text-ink-soft">{p.bio}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip active>{p.availability}</Chip>
            <Chip>{p.experienceYears} yrs</Chip>
          </div>
        </div>
      </div>
      <section className="mt-10">
        <SectionTitle title="Capability" />
        <div className="flex flex-wrap gap-2">
          {p.skills.map((s) => (
            <span key={s.id} className="inline-flex items-center gap-2 rounded-full bg-blush/70 px-3 py-1.5 text-sm">
              {s.name} <ConfidenceMark confidence={s.confidence} />
            </span>
          ))}
        </div>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <p className="text-[11px] tracking-[0.16em] text-brand uppercase">Domains</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.domains.map((d) => (
              <Chip key={d}>{d}</Chip>
            ))}
          </div>
        </Card>
        <Card>
          <p className="text-[11px] tracking-[0.16em] text-brand uppercase">Interests</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.interests.map((d) => (
              <Chip key={d}>{d}</Chip>
            ))}
          </div>
        </Card>
      </section>
      <section className="mt-8">
        <SectionTitle title="Evidence" />
        <div className="grid gap-3 md:grid-cols-2">
          {p.evidence.map((e) => (
            <Card key={e.id}>
              <ConfidenceMark confidence={e.status === "verified" ? "verified" : "evidence_supported"} />
              <p className="mt-2 font-display text-2xl">{e.title}</p>
              <p className="text-sm text-ink-soft">
                {e.skillName} · {e.type.replaceAll("_", " ")}
              </p>
              <p className="mt-1 text-sm">{e.detail}</p>
            </Card>
          ))}
          {p.evidence.length === 0 && <p className="text-ink-soft">No evidence attached yet — skills stay self-declared.</p>}
        </div>
      </section>
      <section className="mt-8">
        <SectionTitle title="Projects" />
        <div className="grid gap-3 md:grid-cols-2">
          {p.pastProjects.map((proj) => (
            <Card key={proj.id}>
              <p className="font-display text-2xl">{proj.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{proj.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {proj.skills.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
