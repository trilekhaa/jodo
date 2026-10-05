import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { cancelRequest, listInbox, respondRequest } from "@/lib/jodo/actions";
import { useMyProfile } from "@/lib/jodo/use-profile";
import { AppShell } from "@/components/jodo/shell";
import { Card, Chip, EmptyNote, SectionTitle } from "@/components/jodo/bits";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/inbox")({ component: Inbox });

function Inbox() {
  const { user, authPending, data: profile, isPending } = useMyProfile();
  const qc = useQueryClient();
  const box = useQuery({
    queryKey: ["inbox"],
    queryFn: () => listInbox(),
    enabled: Boolean(user) && Boolean(profile?.onboardingComplete),
  });
  const respond = useMutation({
    mutationFn: (input: { requestId: string; accept: boolean }) => respondRequest({ data: input }),
    onSuccess: () => qc.invalidateQueries(),
  });
  const cancel = useMutation({
    mutationFn: (id: string) => cancelRequest({ data: id }),
    onSuccess: () => qc.invalidateQueries(),
  });

  if (authPending || isPending) return <div className="min-h-dvh bg-canvas" />;
  if (!user) return <RedirectToSignIn />;
  if (profile && !profile.onboardingComplete) return <Navigate to="/onboarding" />;

  const incoming = box.data?.incoming ?? [];
  const outgoing = box.data?.outgoing ?? [];

  return (
    <AppShell profile={profile ?? null}>
      <SectionTitle kicker="Inbox" title="Collaboration" />
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-3 font-display text-2xl">Incoming</h2>
          {incoming.length === 0 ? (
            <EmptyNote>When someone wants you on an idea, it shows up here so you can accept or reject.</EmptyNote>
          ) : (
            <div className="space-y-3">
              {incoming.map((r) => (
                <Card key={r.id}>
                  <Chip>{r.status}</Chip>
                  <p className="mt-2 font-display text-2xl">{r.ideaTitle}</p>
                  <p className="text-sm text-ink-soft">
                    {r.senderName} · {r.role}
                  </p>
                  {r.status === "pending" && (
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" onClick={() => respond.mutate({ requestId: r.id, accept: true })}>
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => respond.mutate({ requestId: r.id, accept: false })}>
                        Reject
                      </Button>
                    </div>
                  )}
                  {r.status === "accepted" && (
                    <Link to="/ideas/$ideaId/space" params={{ ideaId: r.ideaId }} className="mt-2 inline-block text-sm underline">
                      Open workspace
                    </Link>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className="mb-3 font-display text-2xl">Sent</h2>
          {outgoing.length === 0 ? (
            <EmptyNote>Requests you send stay visible: pending, accepted, rejected, or cancelled.</EmptyNote>
          ) : (
            <div className="space-y-3">
              {outgoing.map((r) => (
                <Card key={r.id}>
                  <Chip active={r.status === "pending"}>{r.status}</Chip>
                  <p className="mt-2 font-display text-2xl">{r.receiverName}</p>
                  <p className="text-sm text-ink-soft">
                    {r.role} · {r.ideaTitle}
                  </p>
                  {r.status === "pending" && (
                    <Button className="mt-3" size="sm" variant="outline" onClick={() => cancel.mutate(r.id)}>
                      Cancel request
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
