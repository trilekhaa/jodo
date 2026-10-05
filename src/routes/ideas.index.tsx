import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { getDashboard } from "@/lib/jodo/actions";
import { useMyProfile } from "@/lib/jodo/use-profile";
import { AppShell } from "@/components/jodo/shell";
import { Card, Chip, CoverageRing, EmptyNote, SectionTitle } from "@/components/jodo/bits";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/ideas/")({ component: Ideas });

function Ideas() {
  const { user, authPending, data: profile, isPending } = useMyProfile();
  const dash = useQuery({
    queryKey: ["dashboard", user?.id],
    queryFn: () => getDashboard(),
    enabled: Boolean(user) && Boolean(profile?.onboardingComplete),
  });
  if (authPending || isPending) return <div className="min-h-dvh bg-canvas" />;
  if (!user) return <RedirectToSignIn />;
  if (profile && !profile.onboardingComplete) return <Navigate to="/onboarding" />;

  return (
    <AppShell profile={profile ?? null}>
      <div className="flex items-end justify-between gap-4">
        <SectionTitle kicker="Ideas" title="Things you’re building" />
        <Link to="/ideas/new">
          <Button>
            <Plus className="size-4" /> New idea
          </Button>
        </Link>
      </div>
      {dash.data?.ideas.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {dash.data.ideas.map((idea) => (
            <Link key={idea.id} to="/ideas/$ideaId" params={{ ideaId: idea.id }}>
              <Card className="h-full hover:shadow-lift">
                <div className="flex justify-between gap-3">
                  <div>
                    <h3 className="font-display text-3xl">{idea.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{idea.description}</p>
                  </div>
                  <CoverageRing value={idea.coverage} size={76} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip active>{idea.missingCount ? `${idea.missingCount} missing` : "Team complete"}</Chip>
                  <Chip>{idea.teamSize} on team</Chip>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyNote>No ideas yet. Start with a sentence — JODO will extract the missing pieces.</EmptyNote>
      )}
    </AppShell>
  );
}
