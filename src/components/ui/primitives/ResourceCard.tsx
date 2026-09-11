"use client";

import Link from "next/link";
import React from "react";

export interface ResourceCardProps {
  title: string;
  description?: string;
  visual?: React.ReactNode;
  meta?: React.ReactNode;
  tags?: string[];
  badge?: {
    text: string;
    variant?: "default" | "orange" | "blue" | "green" | "purple";
  };
  actions?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function ResourceCard({
  title,
  description,
  visual,
  meta,
  tags,
  badge,
  actions,
  href,
  onClick,
  className = "",
  children,
}: ResourceCardProps) {
  const badgeClasses = {
    default: "bg-surface-3 text-secondary border-border-soft",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  };

  const cardContent = (
    <div
      onClick={onClick}
      className={`card flex flex-col justify-between p-5 rounded-2xl border border-border bg-surface-1 hover:border-purple-1/40 hover:bg-surface-2/70 transition-all duration-200 group ${
        onClick || href ? "cursor-pointer" : ""
      } ${className}`}
    >
      <div>
        {visual && <div className="mb-4 overflow-hidden rounded-xl">{visual}</div>}

        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-primary text-base group-hover:text-purple-300 transition-colors line-clamp-1">
            {title}
          </h3>
          {badge && (
            <span
              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${
                badgeClasses[badge.variant || "default"]
              }`}
            >
              {badge.text}
            </span>
          )}
        </div>

        {description && (
          <p className="text-secondary text-xs leading-relaxed line-clamp-2 mb-3">
            {description}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-md bg-surface-2 text-muted border border-border-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {children && <div className="mb-3">{children}</div>}
      </div>

      {(meta || actions) && (
        <div className="pt-3 border-t border-border-soft flex items-center justify-between text-xs text-muted mt-auto">
          <div>{meta}</div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block no-underline">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
