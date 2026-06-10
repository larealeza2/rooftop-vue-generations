import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <div className="flex items-center gap-3">
          <span className="gold-rule" />
          <span className="eyebrow">{eyebrow}</span>
          <span className="gold-rule" />
        </div>
      )}
      <h2 className="font-display text-4xl font-light italic leading-[1.05] sm:text-5xl md:text-[3.5rem]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-ivory/75",
            align === "left" && "max-w-xl",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}