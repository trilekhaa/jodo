import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Blob } from "@/components/jodo/shell";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (isPending) {
    return <div className="min-h-dvh bg-canvas" />;
  }
  if (user) return <Navigate to="/" />;

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({ email, password, name: name || email.split("@")[0] });
        if (err) throw new Error(err.message);
      } else {
        const { error: err } = await authClient.signIn.email({ email, password });
        if (err) throw new Error(err.message);
      }
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not continue");
      setBusy(false);
    }
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-canvas px-5 py-10 text-ink">
      <Blob className="-top-24 -right-16 w-[28rem]" />
      <Blob className="-bottom-24 -left-20 w-[24rem] rotate-12" />
      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-2">
        <div>
          <Link to="/" className="font-display text-5xl font-semibold">
            JODO
          </Link>
          <p className="mt-4 font-display text-4xl leading-[1.05] font-medium tracking-tight md:text-5xl">
            Come in.
            <br />
            Bring an idea.
          </p>
          <p className="mt-4 max-w-sm text-ink-soft">
            JODO figures out what the idea is missing, then finds the people who can complete it.
          </p>
        </div>
        <div className="rounded-[32px] bg-canvas p-6 shadow-card md:p-8">
          <h1 className="font-display text-3xl font-semibold">
            {mode === "in" ? "Sign in" : "Create account"}
          </h1>
          {authEnabled ? (
            <div className="mt-6 space-y-3">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  variant="outline"
                  className="w-full"
                  type="button"
                  onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                >
                  Continue with {p.label}
                </Button>
              ))}
              <p className="pt-2 text-center text-xs tracking-[0.2em] text-ink-soft uppercase">or email</p>
              <form onSubmit={onEmail} className="space-y-3">
                {mode === "up" && (
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete={mode === "up" ? "new-password" : "current-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                </div>
                {error ? <p className="text-sm text-brand-deep">{error}</p> : null}
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy ? "Working…" : mode === "in" ? "Enter JODO" : "Create account"}
                </Button>
              </form>
              <button
                type="button"
                className="w-full text-sm text-ink-soft underline-offset-4 hover:underline"
                onClick={() => setMode(mode === "in" ? "up" : "in")}
              >
                {mode === "in" ? "New here? Create an account" : "Already have an account? Sign in"}
              </button>
            </div>
          ) : (
            <p className="mt-4 text-sm text-ink-soft">Sign-in is disabled.</p>
          )}
        </div>
      </div>
    </main>
  );
}
