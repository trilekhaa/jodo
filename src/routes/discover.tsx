import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { getDiscover } from "@/lib/jodo/actions";
import { useMyProfile } from "@/lib/jodo/use-profile";
import { AppShell } from "@/components/jodo/shell";
import { Card, Chip, CoverageRing, EmptyNote, SectionTitle } from "@/components/jodo/bits";
import { MonoAvatar } from "@/components/jodo/avatar";

export const Route = createFileRoute("/discover")({ component: Discover });

function Discover() {
  const { user, authPending, data: profile, isPending } = useMyProfile();
  const q = useQuery({
    queryKey: ["discover"],
    queryFn: () => getDiscover(),
    enabled: Boolean(user) && Boolean(profile?.onboardingComplete),
  });
  const [tab, setTab] = useState<"people" | "projects" | "skills" | "domains">("people");

  if (authPending || isPending) return <div className="min-h-dvh bg-canvas" />;
  if (!user) return <RedirectToSignIn />;
  if (profile && !profile.onboardingComplete) return <Navigate to="/onboarding" />;

  const data = q.data;

  return (
    <AppShell profile={profile ?? null}>
      <SectionTitle kicker="Discover" title="Around your missing pieces" />
      <p className="mb-6 max-w-xl text-ink-soft">
        This is not a generic social feed. Rankings follow your skills, interests, and the gaps on ideas you own.
      </p>
      <div className="mb-6 flex flex-wrap gap-2">
        {(["people", "projects", "skills", "domains"] as const).map((t) => (
          <Chip key={t} active={tab === t} onClick={() => setTab(t)}>
            {t}
          </Chip>
        ))}
      </div>
      {data?.missingRoles.length ? (
        <p className="mb-4 text-sm">
          Currently missing on your ideas: {data.missingRoles.join(" · ")}
        </p>
      ) : null}

      {tab === "people" && (
        <div className="grid gap-3 md:grid-cols-2">
          {(data?.people ?? []).slice(0, 12).map((m) => (
            <Link key={m.profile.id} to="/people/$profileId" params={{ profileId: m.profile.id }}>
              <Card className="flex items-center gap-4 hover:shadow-lift">
                <MonoAvatar name={m.profile.name} avatarKey={m.profile.avatarKey} avatarUrl={m.profile.avatarUrl} size={56} />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-2xl">{m.profile.name}</p>
                  <p className="truncate text-sm text-ink-soft">{m.profile.skills.map((s) => s.name).slice(0, 3).join(" · ")}</p>
                </div>
                <p className="font-display text-2xl tabular-nums">{m.score}%</p>
              </Card>
            </Link>
          ))}
        </div>
      )}
      {tab === "projects" && (
        <div className="grid gap-3 md:grid-cols-2">
          {(data?.projects ?? []).map((p) => (
            <Link key={p.id} to="/ideas/$ideaId" params={{ ideaId: p.id }}>
              <Card className="hover:shadow-lift">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl">{p.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{p.description}</p>
                    <p className="mt-2 text-sm">by {p.ownerName}</p>
                  </div>
                  <CoverageRing value={p.coverage} size={68} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
      {tab === "skills" && (
        <div className="flex flex-wrap gap-2">
          {(data?.skills ?? []).map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      )}
      {tab === "domains" && (
        <div className="flex flex-wrap gap-2">
          {(data?.domains ?? []).map((s) => (
            <Chip key={s} active>
              {s}
            </Chip>
          ))}
        </div>
      )}
      {!data && !q.isPending ? <EmptyNote>Nothing to discover yet.</EmptyNote> : null}
    </AppShell>
  );
}
