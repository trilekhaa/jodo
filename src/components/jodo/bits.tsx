import { cn } from "@/lib/utils";
import type { Priority, SkillConfidence } from "@/lib/jodo/types";
import type { CSSProperties, ReactNode } from "react";

export function Card({
  className,
  children,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("rounded-[28px] bg-canvas p-5 shadow-card md:p-6", className)} style={style}>
      {children}
    </div>
  );
}

export function Chip({
  children,
  active,
  onClick,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center rounded-full px-3 text-sm",
        active ? "bg-brand text-canvas" : "bg-blush/70 text-ink",
        onClick && "transition-transform active:scale-[0.96]",
        className,
      )}
    >
      {children}
    </Comp>
  );
}

export function PriorityMark({ priority }: { priority: Priority }) {
  return (
    <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-brand">
      {priority}
    </span>
  );
}

export function ConfidenceMark({ confidence }: { confidence: SkillConfidence }) {
  const label =
    confidence === "verified"
      ? "Verified"
      : confidence === "evidence_supported"
        ? "Evidence-supported"
        : "Self-declared";
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[11px] font-medium",
        confidence === "verified"
          ? "bg-brand text-canvas"
          : confidence === "evidence_supported"
            ? "bg-ink text-canvas"
            : "bg-gold text-ink",
      )}
    >
      {label}
    </span>
  );
}

export function CoverageRing({ value, size = 92 }: { value: number; size?: number }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, value)) / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 88 88" className="size-full -rotate-90">
        <circle cx="44" cy="44" r={r} fill="none" stroke="var(--color-gold)" strokeWidth="8" />
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="8"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-xl font-semibold tabular-nums">{value}%</span>
      </div>
    </div>
  );
}

export function SectionTitle({ kicker, title, action }: { kicker?: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {kicker ? (
          <p className="mb-1 text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">{kicker}</p>
        ) : null}
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function EmptyNote({ children }: { children: ReactNode }) {
  return (
    <Card className="text-ink-soft">
      <p>{children}</p>
    </Card>
  );
}
