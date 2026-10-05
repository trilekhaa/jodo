import type { ReactNode } from "react";
import { cn, initials } from "@/lib/utils";

const PATTERNS: Record<string, () => ReactNode> = {
  orbit: () => (
    <>
      <circle cx="32" cy="32" r="18" fill="var(--color-canvas)" />
      <circle cx="44" cy="20" r="10" fill="var(--color-canvas)" opacity="0.7" />
    </>
  ),
  split: () => (
    <>
      <path d="M8 8h24v48H8z" fill="var(--color-canvas)" />
      <circle cx="40" cy="32" r="16" fill="var(--color-canvas)" opacity="0.75" />
    </>
  ),
  petal: () => (
    <>
      <ellipse cx="32" cy="22" rx="12" ry="16" fill="var(--color-canvas)" />
      <ellipse cx="22" cy="38" rx="12" ry="16" fill="var(--color-canvas)" opacity="0.7" />
      <ellipse cx="42" cy="38" rx="12" ry="16" fill="var(--color-canvas)" opacity="0.7" />
    </>
  ),
  tile: () => (
    <>
      <rect x="10" y="10" width="20" height="20" rx="4" fill="var(--color-canvas)" />
      <rect x="34" y="10" width="20" height="20" rx="4" fill="var(--color-canvas)" opacity="0.55" />
      <rect x="10" y="34" width="20" height="20" rx="4" fill="var(--color-canvas)" opacity="0.55" />
      <rect x="34" y="34" width="20" height="20" rx="4" fill="var(--color-canvas)" />
    </>
  ),
  arc: () => (
    <>
      <path d="M8 48a24 24 0 0 1 48 0" fill="var(--color-canvas)" />
      <circle cx="32" cy="22" r="10" fill="var(--color-canvas)" />
    </>
  ),
  stack: () => (
    <>
      <rect x="14" y="28" width="36" height="24" rx="8" fill="var(--color-canvas)" />
      <rect x="20" y="14" width="24" height="18" rx="8" fill="var(--color-canvas)" opacity="0.7" />
    </>
  ),
  wave: () => (
    <path d="M4 40c8-16 16 16 24 0s16 16 24 0v20H4z" fill="var(--color-canvas)" />
  ),
  ring: () => (
    <>
      <circle cx="32" cy="32" r="20" fill="none" stroke="var(--color-canvas)" strokeWidth="8" />
      <circle cx="32" cy="32" r="8" fill="var(--color-canvas)" />
    </>
  ),
  node: () => (
    <>
      <circle cx="18" cy="20" r="7" fill="var(--color-canvas)" />
      <circle cx="46" cy="20" r="7" fill="var(--color-canvas)" />
      <circle cx="32" cy="44" r="9" fill="var(--color-canvas)" />
      <path d="M18 20 L32 44 L46 20" stroke="var(--color-canvas)" strokeWidth="3" fill="none" />
    </>
  ),
  grid: () => (
    <>
      {Array.from({ length: 9 }).map((_, i) => (
        <circle
          key={i}
          cx={16 + (i % 3) * 16}
          cy={16 + Math.floor(i / 3) * 16}
          r={i === 4 ? 7 : 5}
          fill="var(--color-canvas)"
          opacity={i === 4 ? 1 : 0.65}
        />
      ))}
    </>
  ),
  bloom: () => (
    <>
      <circle cx="32" cy="32" r="8" fill="var(--color-canvas)" />
      <circle cx="32" cy="14" r="8" fill="var(--color-canvas)" opacity="0.7" />
      <circle cx="32" cy="50" r="8" fill="var(--color-canvas)" opacity="0.7" />
      <circle cx="14" cy="32" r="8" fill="var(--color-canvas)" opacity="0.7" />
      <circle cx="50" cy="32" r="8" fill="var(--color-canvas)" opacity="0.7" />
    </>
  ),
  spark: () => (
    <path d="M32 6l6 18 18 6-18 6-6 18-6-18-18-6 18-6z" fill="var(--color-canvas)" />
  ),
};

export const AVATAR_KEYS = Object.keys(PATTERNS);

export function MonoAvatar({
  name,
  avatarKey,
  avatarUrl,
  size = 48,
  className,
}: {
  name: string;
  avatarKey: string;
  avatarUrl?: string | null;
  size?: number;
  className?: string;
}) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt=""
        width={size}
        height={size}
        className={cn("rounded-full object-cover outline outline-1 -outline-offset-1 outline-brand/30", className)}
        style={{ width: size, height: size }}
      />
    );
  }
  const draw = PATTERNS[avatarKey] ?? PATTERNS.orbit;
  return (
    <div
      className={cn("relative shrink-0 overflow-hidden rounded-full bg-brand", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 64 64" className="absolute inset-0 size-full">
        {draw()}
      </svg>
      <span
        className="absolute inset-0 grid place-items-center font-display font-semibold text-canvas"
        style={{ fontSize: Math.max(12, size * 0.32) }}
      >
        {initials(name)}
      </span>
    </div>
  );
}
