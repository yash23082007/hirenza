"use client";

export function HirenzaLogo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size * 1.2}
      height={size}
      viewBox="0 0 48 40"
      fill="none"
      className={className}
      aria-label="Hirenza logo"
    >
      {/* Custom geometric H mark - 3-4 angular strokes */}
      <path
        d="M6 4 L6 36"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
      <path
        d="M6 20 L18 20"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="square"
      />
      <path
        d="M18 4 L18 36"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
      <path
        d="M26 8 L38 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        opacity="0.7"
      />
      <path
        d="M32 8 L32 36"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="square"
        opacity="0.8"
      />
    </svg>
  );
}
