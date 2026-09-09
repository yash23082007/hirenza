"use client";

import { useState, useEffect, useRef } from "react";

// Deterministic activity data
function generateActivityData(range: string): number[] {
  const counts: Record<string, number> = { "7 Days": 7, "30 Days": 30, "3 Months": 90, "6 Months": 180 };
  const n = counts[range] || 30;
  const data: number[] = [];
  // Use a seeded pattern for deterministic data
  for (let i = 0; i < n; i++) {
    const seed = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
    data.push(Math.max(0, Math.round((seed - Math.floor(seed)) * 12)));
  }
  return data;
}

export function ActivityChart() {
  const [range, setRange] = useState("30 Days");
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ranges = ["6 Months", "3 Months", "30 Days", "7 Days"];

  useEffect(() => {
    let start: number;
    let animationFrameId: number;
    const duration = 1000;

    const animate = (time: number) => {
      if (!start) {
        start = time;
        setProgress(0);
      }
      const elapsed = time - start;
      const p = Math.min(elapsed / duration, 1);
      const easeP = 1 - Math.pow(1 - p, 3);
      setProgress(easeP);
      if (p < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [range]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const data = generateActivityData(range);
    const w = rect.width;
    const h = rect.height;
    const padding = { top: 20, right: 10, bottom: 30, left: 10 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const maxVal = Math.max(...data, 1);

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = "rgba(120, 120, 140, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.setLineDash([2, 4]);
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Draw line with animation
    if (data.length === 0 || progress === 0) return;

    const maxIndex = (data.length - 1) * progress;
    const pointsToDraw = Math.ceil(maxIndex);

    ctx.beginPath();
    ctx.strokeStyle = "#f5f5f7";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    for (let i = 0; i <= pointsToDraw && i < data.length; i++) {
      let x = padding.left + (i / (data.length - 1)) * chartW;
      let y = padding.top + chartH - (data[i] / maxVal) * chartH;
      
      if (i === pointsToDraw && i > 0 && i > maxIndex) {
        const prevIdx = i - 1;
        const remainder = maxIndex - prevIdx;
        const prevX = padding.left + (prevIdx / (data.length - 1)) * chartW;
        const prevY = padding.top + chartH - (data[prevIdx] / maxVal) * chartH;
        x = prevX + (x - prevX) * remainder;
        y = prevY + (y - prevY) * remainder;
      }

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Gradient fill under line
    const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
    gradient.addColorStop(0, "rgba(122, 51, 246, 0.15)");
    gradient.addColorStop(1, "rgba(122, 51, 246, 0)");

    ctx.beginPath();
    let lastX = padding.left;
    for (let i = 0; i <= pointsToDraw && i < data.length; i++) {
      let x = padding.left + (i / (data.length - 1)) * chartW;
      let y = padding.top + chartH - (data[i] / maxVal) * chartH;
      
      if (i === pointsToDraw && i > 0 && i > maxIndex) {
        const prevIdx = i - 1;
        const remainder = maxIndex - prevIdx;
        const prevX = padding.left + (prevIdx / (data.length - 1)) * chartW;
        const prevY = padding.top + chartH - (data[prevIdx] / maxVal) * chartH;
        x = prevX + (x - prevX) * remainder;
        y = prevY + (y - prevY) * remainder;
      }

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      lastX = x;
    }
    if (pointsToDraw > 0) {
      ctx.lineTo(lastX, h - padding.bottom);
      ctx.lineTo(padding.left, h - padding.bottom);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // X-axis labels
    ctx.fillStyle = "rgba(112, 114, 126, 0.8)";
    ctx.font = "11px Inter, sans-serif";
    ctx.textAlign = "center";
    const labelCount = Math.min(data.length, 6);
    for (let i = 0; i < labelCount; i++) {
      const idx = Math.floor((i / (labelCount - 1)) * (data.length - 1));
      const x = padding.left + (idx / (data.length - 1)) * chartW;
      const date = new Date();
      date.setDate(date.getDate() - (data.length - 1 - idx));
      const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      ctx.fillText(label, x, h - 8);
    }
  }, [range, progress]);

  return (
    <div className="min-w-0 border border-border rounded-2xl bg-surface-2 p-6">
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-bold">Activity</h3>
          <p className="text-sm text-muted">Total of last {range.toLowerCase()}</p>
        </div>
        <div className="flex max-w-full shrink-0 items-center gap-1 overflow-x-auto bg-surface-3 rounded-lg p-1">
          {ranges.map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                range === r ? "bg-surface-1 text-primary" : "text-muted hover:text-secondary"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: "220px" }}
      />
    </div>
  );
}

// Streak Calendar
export function StreakCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 6)); // September 2026
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // Deterministic streak days
  const streakDays = new Set([1, 2, 3, 4, 5, 8, 9, 10, 15, 16, 17, 18, 19, 22, 23, 24]);

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="min-w-0 border border-border rounded-2xl bg-surface-2 p-6">
      <div className="text-center mb-4">
        <span className="text-lg">🔥</span>
        <span className="text-xs font-bold uppercase tracking-wider text-muted ml-2">STREAK</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1 text-muted hover:text-primary transition-colors">←</button>
        <span className="text-sm font-semibold">{monthName}</span>
        <button onClick={nextMonth} className="p-1 text-muted hover:text-primary transition-colors">→</button>
      </div>

      {/* Week headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
          <div key={d} className="text-center text-[10px] text-muted font-medium">{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          <div
            key={i}
            className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
              day === null ? "" :
              day === 6 ? "ring-2 ring-brand-orange" :
              streakDays.has(day) ? "bg-brand-orange/20 text-brand-orange" :
              "text-secondary hover:bg-surface-hover cursor-pointer"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <span className="text-2xl font-extrabold text-brand-orange">12</span>
        <span className="text-xs text-muted ml-2">Day Streak</span>
      </div>
    </div>
  );
}
