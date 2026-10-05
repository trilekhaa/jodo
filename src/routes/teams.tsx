import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { getDashboard } from "@/lib/jodo/actions";
import { useMyProfile } from "@/lib/jodo/use-profile";
import { AppShell } from "@/components/jodo/shell";
import { Card, Chip, CoverageRing, EmptyNote, SectionTitle } from "@/components/jodo/bits";

export const Route = createFileRoute("/teams")({ component: Teams });

function Teams() {
  const { user, authPending, data: profile, isPending } = useMyProfile();
  const dash = useQuery({
    queryKey: ["dashboard", user?.id],
    queryFn: () => getDashboard(),
    enabled: Boolean(user) && Boolean(profile?.onboardingComplete),
  });
  if (authPending || isPending) return <div className="min-h-dvh bg-canvas" />;
  if (!user) return <RedirectToSignIn />;
  if (profile && !profile.onboardingComplete) return <Navigate to="/onboarding" />;
  const teams = dash.data?.teams ?? [];
  const incoming = dash.data?.incoming.filter((r) => r.status === "pending") ?? [];

  return (
    <AppShell profile={profile ?? null}>
      <SectionTitle kicker="Teams" title="Where you already belong" />
      {incoming.length > 0 && (
        <Card className="mb-6">
          <p className="font-display text-2xl">{incoming.length} pending invitation{incoming.length === 1 ? "" : "s"}</p>
          <Link to="/inbox" className="mt-2 inline-block text-sm underline-offset-4 hover:underline">
            Review them
          </Link>
        </Card>
      )}
      {teams.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {teams.map((t) => (
            <Link key={t.id} to="/ideas/$ideaId/space" params={{ ideaId: t.id }}>
              <Card className="h-full hover:shadow-lift">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-[11px] tracking-[0.16em] text-brand uppercase">
                      {t.ownerId === profile?.id ? "You own this" : "You’re on this"}
                    </p>
                    <h3 className="font-display text-3xl">{t.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{t.description}</p>
                  </div>
                  <CoverageRing value={t.coverage} size={72} />
                </div>
                <div className="mt-3 flex gap-2">
                  <Chip>{t.teamSize} members</Chip>
                  <Chip active={t.missingCount > 0}>{t.missingCount ? `${t.missingCount} gaps` : "Covered"}</Chip>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyNote>Join or start an idea and the team workspace appears here.</EmptyNote>
      )}
    </AppShell>
  );
}
