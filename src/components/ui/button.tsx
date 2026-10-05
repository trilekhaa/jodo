import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,color,box-shadow] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  {
    variants: {
      variant: {
        primary: "bg-brand text-canvas hover:bg-brand-hot shadow-[0_10px_24px_-12px_color-mix(in_srgb,var(--color-brand)_70%,transparent)]",
        outline:
          "bg-transparent text-ink hover:bg-brand hover:text-canvas shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-brand)_45%,transparent)]",
        ghost: "bg-transparent text-ink hover:bg-brand/10",
        inverse: "bg-ink text-canvas hover:bg-brand-deep",
        soft: "bg-blush text-ink hover:bg-rose",
      },
      size: {
        sm: "h-10 px-3.5 text-sm rounded-[10px]",
        md: "h-12 px-5 text-sm rounded-[14px]",
        lg: "h-14 px-6 text-base rounded-[16px]",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
