"use client";

import { useMemo } from "react";

interface SkillAxis {
  label: string;
  value: number; // 0 - 100
  total: number;
  solved: number;
}

interface SkillRadarChartProps {
  skills: SkillAxis[];
}

const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = 105;
const RINGS = [0.25, 0.5, 0.75, 1];

function getCoordinates(index: number, factor: number, totalAxes: number) {
  // Start from top (-90 degrees)
  const angle = (Math.PI * 2 * index) / totalAxes - Math.PI / 2;
  const x = CENTER + RADIUS * factor * Math.cos(angle);
  const y = CENTER + RADIUS * factor * Math.sin(angle);
  return { x, y };
}

export function SkillRadarChart({ skills }: SkillRadarChartProps) {
  const totalAxes = skills.length || 5;

  const gridPolygons = useMemo(() => {
    return RINGS.map(factor => {
      const points = Array.from({ length: totalAxes })
        .map((_, i) => {
          const { x, y } = getCoordinates(i, factor, totalAxes);
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");
      return { factor, points };
    });
  }, [totalAxes]);

  const dataPolygon = useMemo(() => {
    return skills
      .map((skill, i) => {
        // Normalize value between 0.05 (for visibility) and 1.0
        const normalized = Math.max(0.06, Math.min(1, skill.value / 100));
        const { x, y } = getCoordinates(i, normalized, totalAxes);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [skills, totalAxes]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-[320px] aspect-square">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full overflow-visible">
          {/* Background Grid Rings */}
          {gridPolygons.map(({ factor, points }) => (
            <polygon
              key={factor}
              points={points}
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray={factor === 1 ? undefined : "2 2"}
              className="opacity-60"
            />
          ))}

          {/* Spokes from center */}
          {skills.map((_, i) => {
            const { x, y } = getCoordinates(i, 1, totalAxes);
            return (
              <line
                key={i}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke="var(--border-soft)"
                strokeWidth="1"
              />
            );
          })}

          {/* Data Polygon */}
          <polygon
            points={dataPolygon}
            fill="rgba(108, 71, 255, 0.22)"
            stroke="#6c47ff"
            strokeWidth="2.5"
            className="transition-all duration-700 ease-out"
          />

          {/* Data Points */}
          {skills.map((skill, i) => {
            const normalized = Math.max(0.06, Math.min(1, skill.value / 100));
            const { x, y } = getCoordinates(i, normalized, totalAxes);
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={4}
                  className="fill-brand-violet stroke-white stroke-2"
                />
              </g>
            );
          })}

          {/* Labels */}
          {skills.map((skill, i) => {
            // Push labels slightly outside radius
            const { x, y } = getCoordinates(i, 1.25, totalAxes);
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[11px] font-semibold fill-[var(--text-secondary)] select-none"
              >
                {skill.label}
                <tspan
                  x={x}
                  dy="13"
                  className="text-[10px] font-bold fill-[var(--cta)]"
                >
                  {skill.value}%
                </tspan>
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-muted">
        {skills.map(s => (
          <div key={s.label} className="flex items-center gap-1.5 bg-surface-3 px-2.5 py-1 rounded-lg border border-border">
            <span className="w-2 h-2 rounded-full bg-brand-violet" />
            <span className="text-secondary">{s.label}:</span>
            <span className="font-semibold text-primary">{s.solved}/{s.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
