import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/cn";

type Align = "left" | "center";
type EyebrowVariant = "text" | "pill-solid" | "pill-outline";
type EyebrowColor = "green" | "blue" | "gold";

interface SectionHeadingProps {
  eyebrow: string;
  eyebrowIcon?: ComponentType<LucideProps>;
  /** Show the eyebrow icon on both sides of the label instead of just before it. */
  flankIcon?: boolean;
  eyebrowVariant?: EyebrowVariant;
  eyebrowColor?: EyebrowColor;
  align?: Align;
  heading: ReactNode;
  headingClassName?: string;
  description?: ReactNode;
  divider?: boolean;
  className?: string;
}

const eyebrowColorClasses: Record<EyebrowColor, string> = {
  green: "text-brand-green",
  blue: "text-brand-blue",
  gold: "text-gold",
};

function Ornament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("h-3.5 w-3.5 shrink-0", className)}
      fill="currentColor"
    >
      <path d="M8 0c0 3.3 1.7 5 5 5-3.3 0-5 1.7-5 5 0-3.3-1.7-5-5-5 3.3 0 5-1.7 5-5Z" />
    </svg>
  );
}

export function Divider({ align = "left" }: { align?: Align }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        align === "center" && "justify-center"
      )}
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-gold/50" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-10 bg-gold/50" />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  flankIcon = false,
  eyebrowVariant = "text",
  eyebrowColor = "blue",
  align = "left",
  heading,
  headingClassName,
  description,
  divider = true,
  className,
}: SectionHeadingProps) {
  const iconEl = EyebrowIcon ? (
    <EyebrowIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
  ) : (
    <Ornament />
  );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div
        data-reveal
        className={cn(
          "flex flex-col gap-4",
          align === "center" && "items-center text-center"
        )}
      >
        <span
          className={cn(
            "inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]",
            eyebrowVariant === "text" &&
              cn("gap-2", eyebrowColorClasses[eyebrowColor]),
            eyebrowVariant === "pill-solid" &&
              "rounded-full bg-brand-blue px-4 py-2 text-[0.7rem] text-white",
            eyebrowVariant === "pill-outline" &&
              "rounded-full border border-brand-blue/30 bg-white px-4 py-2 text-[0.7rem] text-brand-blue"
          )}
        >
          {iconEl}
          {eyebrow}
          {flankIcon ? iconEl : null}
        </span>

        <h2
          className={cn(
            "font-heading text-3xl font-semibold leading-tight text-brand-blue sm:text-4xl",
            headingClassName
          )}
        >
          {heading}
        </h2>

        {divider && <Divider align={align} />}
      </div>

      {description && (
        <p
          data-reveal
          className={cn(
            "max-w-2xl text-base leading-relaxed text-ink-soft",
            align === "center" && "mx-auto text-center"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
