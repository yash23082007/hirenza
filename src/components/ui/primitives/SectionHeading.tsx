import React from "react";

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  badge?: string;
  actions?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  badge,
  actions,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${
        align === "center" ? "text-center items-center" : ""
      } ${className}`}
    >
      <div>
        {eyebrow && (
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="text-[11px] uppercase tracking-wider text-orange-400 font-semibold">
              {eyebrow}
            </span>
          </div>
        )}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            {title}
          </h1>
          {badge && (
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="mt-1.5 text-secondary text-sm max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-end">
          {actions}
        </div>
      )}
    </div>
  );
}
