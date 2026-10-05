import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Plus } from "lucide-react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getDashboard } from "@/lib/jodo/actions";
import { useMyProfile } from "@/lib/jodo/use-profile";
import { AppShell, Blob } from "@/components/jodo/shell";
import { Card, Chip, CoverageRing, EmptyNote, SectionTitle } from "@/components/jodo/bits";
import { MonoAvatar } from "@/components/jodo/avatar";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <div className="min-h-dvh bg-canvas" />;
  if (!user) return <Landing />;
  return <Dashboard />;
}

function Landing() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-canvas text-ink">
      <Blob className="-top-32 right-[-8rem] w-[36rem]" />
      <Blob className="bottom-[-10rem] left-[-8rem] w-[32rem] -rotate-12" />
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <p className="font-display text-3xl font-semibold">JODO</p>
        <Link to="/login">
          <Button size="sm">Enter</Button>
        </Link>
      </header>
      <section className="relative z-10 mx-auto grid max-w-6xl items-end gap-10 px-5 pt-10 pb-20 md:grid-cols-[1.2fr_0.8fr] md:pt-20">
        <div>
          <p className="mb-4 text-[11px] font-semibold tracking-[0.22em] text-brand uppercase">
            Talent · Idea · Completion
          </p>
          <h1 className="font-display text-6xl leading-[0.92] font-semibold tracking-tight md:text-8xl">
            No idea
            <br />
            builds
            <br />
            alone.
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink-soft">
            JODO starts with an idea, finds the missing pieces, and introduces the people who can complete it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/login">
              <Button size="lg">
                Start with an idea <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <Card className="rotate-2">
            <p className="text-[11px] tracking-[0.18em] text-brand uppercase">Missing pieces</p>
            <ul className="mt-4 space-y-3">
              {["GIS Specialist", "Full-Stack Developer"].map((role) => (
                <li key={role} className="flex items-center justify-between rounded-2xl bg-blush/60 px-4 py-3">
                  <span className="font-medium">{role}</span>
                  <span className="text-sm text-brand">Open</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="absolute -bottom-8 -left-4 w-[85%] -rotate-3">
            <p className="text-[11px] tracking-[0.18em] text-brand uppercase">Why this person</p>
            <p className="mt-2 font-display text-2xl">Arjun — 94%</p>
            <p className="mt-1 text-sm text-ink-soft">Verified GIS · satellite drought maps · available</p>
          </Card>
        </div>
      </section>
    </main>
  );
}

function Dashboard() {
  const { data: profile, isPending, user } = useMyProfile();
  const dash = useQuery({
    queryKey: ["dashboard", user?.id],
    queryFn: () => getDashboard(),
    enabled: Boolean(user) && Boolean(profile?.onboardingComplete),
  });

  if (isPending || !profile) {
    return (
      <AppShell profile={null}>
        <div className="h-40 animate-pulse rounded-[28px] bg-brand/10" />
      </AppShell>
    );
  }
  if (!profile.onboardingComplete) return <Navigate to="/onboarding" />;
  if (!user) return <RedirectToSignIn />;

  const first = profile.name.split(" ")[0];
  const data = dash.data;

  return (
    <AppShell profile={profile}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">Home</p>
          <h1 className="font-display text-5xl font-semibold tracking-tight md:text-6xl">Hey {first}.</h1>
          <p className="mt-2 max-w-xl text-ink-soft">What is missing from the idea — and who can complete it?</p>
        </div>
        <Link to="/ideas/new">
          <Button size="lg">
            <Plus className="size-4" /> Create idea
          </Button>
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2 bg-brand text-canvas">
          <p className="text-[11px] tracking-[0.18em] uppercase opacity-80">Start here</p>
          <h2 className="mt-2 font-display text-4xl leading-tight">Drop a sentence. JODO does the rest.</h2>
          <p className="mt-3 max-w-lg text-canvas/85">
            Describe the idea in plain language. JODO extracts roles, hidden requirements, and the people who fill the gaps.
          </p>
          <Link to="/ideas/new" className="mt-6 inline-flex">
            <Button variant="inverse">Write the idea</Button>
          </Link>
        </Card>
        <Card className="flex flex-col items-start justify-between">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-brand uppercase">Active coverage</p>
            <p className="mt-2 font-display text-2xl">
              {data?.ideas.length ? `${data.ideas.length} idea${data.ideas.length === 1 ? "" : "s"}` : "No ideas yet"}
            </p>
          </div>
          <CoverageRing value={data?.ideas[0]?.coverage ?? 0} />
        </Card>
      </div>

      <div className="mt-12">
        <SectionTitle kicker="Live" title="Active projects" />
        {data?.ideas.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {data.ideas.map((idea, i) => (
              <Link key={idea.id} to="/ideas/$ideaId" params={{ ideaId: idea.id }} className="stagger-item" style={{ animationDelay: `${i * 70}ms` }}>
                <Card className="h-full hover:shadow-lift">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] tracking-[0.16em] text-brand uppercase">{idea.status}</p>
                      <h3 className="mt-1 font-display text-2xl">{idea.title}</h3>
                    </div>
                    <CoverageRing value={idea.coverage} size={72} />
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-ink-soft">{idea.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {idea.domains.slice(0, 3).map((d) => (
                      <Chip key={d}>{d}</Chip>
                    ))}
                    <Chip active={idea.missingCount > 0}>
                      {idea.missingCount ? `${idea.missingCount} missing` : "Complete"}
                    </Chip>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyNote>Create an idea and JODO will show missing roles here — not a generic feed.</EmptyNote>
        )}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <SectionTitle kicker="Gaps" title="Missing pieces" />
          {data?.missingHighlights.length ? (
            <div className="space-y-3">
              {data.missingHighlights.flatMap((h) =>
                h.pieces.map((p) => (
                  <Link key={p.requirementId} to="/ideas/$ideaId" params={{ ideaId: h.ideaId }}>
                    <Card className="jodo-enter">
                      <p className="text-[11px] text-ink-soft">{h.ideaTitle}</p>
                      <p className="font-display text-2xl">{p.role}</p>
                      <p className="mt-1 text-sm text-ink-soft">{p.reason}</p>
                    </Card>
                  </Link>
                )),
              )}
            </div>
          ) : (
            <EmptyNote>No missing pieces yet. They appear the moment JODO compares the idea to your team.</EmptyNote>
          )}
        </div>
        <div>
          <SectionTitle kicker="People" title="Recommended" />
          {data?.recommended.length ? (
            <div className="space-y-3">
              {data.recommended.slice(0, 4).map((m) => (
                <Link key={m.profile.id + m.role} to="/people/$profileId" params={{ profileId: m.profile.id }}>
                  <Card className="flex items-center gap-4">
                    <MonoAvatar name={m.profile.name} avatarKey={m.profile.avatarKey} avatarUrl={m.profile.avatarUrl} size={52} />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-xl leading-tight">{m.profile.name}</p>
                      <p className="truncate text-sm text-ink-soft">
                        {m.role} · {m.reasons[0]}
                      </p>
                    </div>
                    <p className="font-display text-2xl tabular-nums">{m.score}%</p>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyNote>Recommendations appear from actual missing roles, not a random list.</EmptyNote>
          )}
        </div>
      </div>

      <div className="mt-12">
        <SectionTitle kicker="Inbox" title="Collaboration requests" action={<Link to="/inbox" className="text-sm underline-offset-4 hover:underline">Open inbox</Link>} />
        {data?.incoming.filter((r) => r.status === "pending").length || data?.outgoing.filter((r) => r.status === "pending").length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {data.incoming
              .filter((r) => r.status === "pending")
              .map((r) => (
                <Card key={r.id}>
                  <p className="text-[11px] tracking-[0.16em] text-brand uppercase">Incoming</p>
                  <p className="mt-1 font-display text-2xl">{r.ideaTitle}</p>
                  <p className="text-sm text-ink-soft">
                    {r.senderName} invited you as {r.role}
                  </p>
                </Card>
              ))}
            {data.outgoing
              .filter((r) => r.status === "pending")
              .slice(0, 4)
              .map((r) => (
                <Card key={r.id}>
                  <p className="text-[11px] tracking-[0.16em] text-brand uppercase">Sent · pending</p>
                  <p className="mt-1 font-display text-2xl">{r.receiverName}</p>
                  <p className="text-sm text-ink-soft">
                    {r.role} for {r.ideaTitle}
                  </p>
                </Card>
              ))}
          </div>
        ) : (
          <EmptyNote>Pending invites will land here. Sent, received, accepted, rejected — all of it is live.</EmptyNote>
        )}
      </div>
    </AppShell>
  );
}
