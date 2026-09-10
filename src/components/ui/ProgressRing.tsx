"use client";

interface ProgressRingProps {
  completed: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showSubtext?: boolean;
}

export function ProgressRing({
  completed,
  total,
  size = 110,
  strokeWidth = 8,
  className = "",
  showSubtext = true,
}: ProgressRingProps) {
  const safeTotal = Math.max(1, total);
  const percentage = Math.min(100, Math.round((completed / safeTotal) * 100));

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-surface-3/80 dark:text-surface-hover"
        />
        {/* Animated Progress track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7a33f6" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
        <span className="text-xl font-bold tracking-tight text-primary">
          {completed}
          <span className="text-xs font-normal text-muted">/{total}</span>
        </span>
        {showSubtext && (
          <span className="text-[11px] font-medium text-emerald-400">
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
}
