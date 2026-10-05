import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, House, Lightbulb, UserRound, Users } from "lucide-react";
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";
import { authEnabled, signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { useSyncExternalStore, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MonoAvatar } from "./avatar";
import type { Profile } from "@/lib/jodo/types";

const NAV = [
  { to: "/", label: "Home", icon: House },
  { to: "/ideas", label: "Ideas", icon: Lightbulb },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/teams", label: "Teams", icon: Users },
  { to: "/profile", label: "Profile", icon: UserRound },
];

function AccountChip({ profile }: { profile: Profile | null }) {
  const user = useCurrentUser();
  const [signingOut, setSigningOut] = useState(false);
  const gateSession = useSyncExternalStore(
    () => () => {},
    hasGateSessionMarker,
    () => false,
  );
  const name = profile?.name ?? user?.displayName ?? "You";
  return (
    <div className="flex items-center gap-2">
      <MonoAvatar
        name={name}
        avatarKey={profile?.avatarKey ?? "orbit"}
        avatarUrl={profile?.avatarUrl ?? user?.profileImageUrl}
        size={36}
      />
      <div className="min-w-0 hidden lg:block">
        <p className="truncate font-medium leading-tight">{name}</p>
        {authEnabled && !gateSession && (
          <button
            type="button"
            disabled={signingOut}
            onClick={() => {
              setSigningOut(true);
              void signOut("/").catch(() => setSigningOut(false));
            }}
            className="text-xs text-ink-soft underline-offset-2 hover:underline"
          >
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        )}
      </div>
    </div>
  );
}

export function AppShell({
  children,
  profile,
}: {
  children: ReactNode;
  profile: Profile | null;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isPending } = useCurrentUserState();

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <aside className="fixed top-0 left-0 z-30 hidden h-dvh w-56 flex-col border-r border-brand/20 p-5 md:flex">
        <Link to="/" className="font-display text-3xl font-semibold tracking-tight">
          JODO
        </Link>
        <p className="mt-1 text-xs tracking-wide text-ink-soft uppercase">No idea builds alone</p>
        <nav className="mt-10 flex flex-1 flex-col gap-1">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-[14px] px-3 text-sm font-medium transition-colors",
                  active ? "bg-brand text-canvas" : "text-ink hover:bg-brand/10",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        {isPending ? <div className="h-9 w-full animate-pulse rounded-full bg-brand/15" /> : <AccountChip profile={profile} />}
      </aside>

      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-brand/20 bg-canvas/90 px-4 py-3 backdrop-blur md:hidden">
        <Link to="/" className="font-display text-2xl font-semibold">
          JODO
        </Link>
        {isPending ? <div className="size-9 animate-pulse rounded-full bg-brand/15" /> : <AccountChip profile={profile} />}
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 md:ml-56 md:px-10 md:pb-16 md:pt-10">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-brand/20 bg-canvas/95 px-1 pb-[env(safe-area-inset-bottom)] pt-1 md:hidden">
        {NAV.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] font-medium",
                active ? "text-brand" : "text-ink-soft",
              )}
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function Blob({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={cn("pointer-events-none absolute text-brand/20", className)} aria-hidden>
      <path
        fill="currentColor"
        d="M47.5,-61.3C60.6,-53.2,69.4,-37.2,74.1,-20.3C78.8,-3.4,79.3,14.3,72.6,29.1C65.9,43.9,52,55.7,36.4,63.2C20.8,70.7,3.6,73.9,-13.7,72.1C-31,70.3,-48.4,63.5,-60.2,50.8C-72,38.1,-78.3,19.1,-77.4,0.5C-76.6,-18,-68.6,-36.1,-55.5,-45.7C-42.4,-55.3,-24.2,-56.4,-5.9,-50.2C12.4,-44,31.3,-30.5,47.5,-61.3Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
