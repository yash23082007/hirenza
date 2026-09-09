"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useProgress } from "@/hooks/useProgress";
import { Flame, Trophy, Sparkles } from "lucide-react";

export function ActivityChart() {
  const { heatmapData, streak, data } = useProgress();
  const [range, setRange] = useState("30 Days");
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ranges = ["6 Months", "3 Months", "30 Days", "7 Days"];

  const rangeDays = useMemo(() => {
    switch (range) {
      case "7 Days": return 7;
      case "30 Days": return 30;
      case "3 Months": return 90;
      case "6 Months": return 180;
      default: return 30;
    }
  }, [range]);

  // Compute real daily activity data for the chosen range
  const activityData = useMemo(() => {
    const list: { date: string; count: number; dayLabel: string }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = rangeDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const count = heatmapData[dateStr] || 0;
      const dayLabel = d.toLocaleDateString("en-US", { weekday: "short" });
      list.push({ date: dateStr, count, dayLabel });
    }
    return list;
  }, [rangeDays, heatmapData]);

  const totalInPeriod = useMemo(() => {
    return activityData.reduce((acc, d) => acc + d.count, 0);
  }, [activityData]);

  useEffect(() => {
    let start: number;
    let animationFrameId: number;
    const duration = 600;

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

    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    const counts = activityData.map(d => d.count);
    const maxVal = Math.max(...counts, 4); // minimum ceiling of 4

    const padLeft = 32;
    const padRight = 16;
    const padTop = 20;
    const padBottom = 30;
    const chartW = w - padLeft - padRight;
    const chartH = h - padTop - padBottom;

    // Grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const y = padTop + (chartH / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(w - padRight, y);
      ctx.stroke();

      const labelVal = Math.round(maxVal - (maxVal / gridLines) * i);
      ctx.fillStyle = "rgba(150, 150, 150, 0.6)";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(String(labelVal), padLeft - 6, y + 3);
    }

    if (activityData.length === 0) return;

    const barWidth = Math.max(2, Math.min(18, (chartW / activityData.length) * 0.65));
    const step = chartW / activityData.length;

    // Draw bars
    activityData.forEach((item, i) => {
      const x = padLeft + i * step + (step - barWidth) / 2;
      const barHeight = (item.count / maxVal) * chartH * progress;
      const y = padTop + chartH - barHeight;

      if (item.count > 0) {
        // Gradient bar for active days
        const grad = ctx.createLinearGradient(0, y, 0, padTop + chartH);
        grad.addColorStop(0, "#a855f7");
        grad.addColorStop(1, "rgba(168, 85, 247, 0.2)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [3, 3, 0, 0]);
        ctx.fill();
      } else {
        // Baseline pip for inactive days
        ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
        ctx.beginPath();
        ctx.roundRect(x, padTop + chartH - 2, barWidth, 2, [1, 1, 0, 0]);
        ctx.fill();
      }

      // X-axis dates
      if (rangeDays <= 14 || i % Math.ceil(activityData.length / 7) === 0 || i === activityData.length - 1) {
        ctx.fillStyle = "rgba(150, 150, 150, 0.6)";
        ctx.font = "9px sans-serif";
        ctx.textAlign = "center";
        const [,, dayNum] = item.date.split("-");
        ctx.fillText(`${item.dayLabel} ${Number(dayNum)}`, x + barWidth / 2, h - 8);
      }
    });
  }, [activityData, rangeDays, progress]);

  return (
    <div className="border border-border rounded-2xl bg-surface-2 p-6 flex flex-col justify-between">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-primary">Solving Velocity</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-1/10 text-purple-400 font-medium">
              Real Activity
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">
            {totalInPeriod} problem{totalInPeriod === 1 ? "" : "s"} completed in the past {range.toLowerCase()}
          </p>
        </div>

        <div className="flex items-center gap-1 bg-surface-3 p-1 rounded-xl border border-border">
          {ranges.map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                range === r
                  ? "bg-purple-1 text-white shadow-sm"
                  : "text-secondary hover:text-primary hover:bg-surface-hover"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: "200px" }}
        />
        {totalInPeriod === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-surface-2/40 backdrop-blur-[1px] rounded-xl">
            <div className="text-center p-4">
              <Sparkles size={20} className="mx-auto text-purple-400 mb-1 animate-pulse" />
              <p className="text-xs font-medium text-secondary">No problems solved in this window yet.</p>
              <p className="text-[11px] text-muted">Solve a problem from DSA Sheets or SQL to start your chart!</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted">
        <span>Current Streak: <strong className="text-brand-orange">{streak.current} days</strong></span>
        <span>Longest: <strong className="text-primary">{streak.longest} days</strong></span>
        <span>Total Solved: <strong className="text-purple-400">{data.events.length}</strong></span>
      </div>
    </div>
  );
}

// Real Streak Calendar
export function StreakCalendar() {
  const { streak, heatmapData } = useProgress();
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDateNum = today.getDate();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="min-w-0 border border-border rounded-2xl bg-surface-2 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="text-brand-orange animate-bounce" size={20} />
            <span className="text-xs font-bold uppercase tracking-wider text-muted">STREAK CALENDAR</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="p-1 rounded text-muted hover:text-primary hover:bg-surface-3 transition-colors"
              aria-label="Previous month"
            >
              ←
            </button>
            <span className="text-xs font-semibold px-1">{monthName}</span>
            <button
              onClick={nextMonth}
              className="p-1 rounded text-muted hover:text-primary hover:bg-surface-3 transition-colors"
              aria-label="Next month"
            >
              →
            </button>
          </div>
        </div>

        {/* Week headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
            <div key={d} className="text-center text-[10px] text-muted font-medium">
              {d}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            if (day === null) {
              return <div key={`empty-${i}`} className="aspect-square" />;
            }

            const dayStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const count = heatmapData[dayStr] || 0;
            const hasActivity = count > 0;
            const isToday = isCurrentMonth && day === todayDateNum;

            return (
              <div
                key={day}
                title={hasActivity ? `${dayStr}: ${count} problem(s) solved` : `${dayStr}`}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs font-medium transition-all ${
                  hasActivity
                    ? "bg-brand-orange/20 text-brand-orange font-bold border border-brand-orange/40"
                    : "text-secondary hover:bg-surface-hover"
                } ${isToday ? "ring-2 ring-purple-1 ring-offset-1 ring-offset-surface-2" : ""}`}
              >
                <span>{day}</span>
                {count > 0 && <span className="text-[8px] opacity-70">+{count}</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-extrabold text-brand-orange">{streak.current}</span>
          <div className="text-left leading-tight">
            <span className="text-xs font-bold block text-primary">Day Streak</span>
            <span className="text-[10px] text-muted">
              {streak.activeToday ? "Active today 🔥" : "Complete a question today"}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end text-xs text-muted">
            <Trophy size={14} className="text-yellow-400" />
            <span>Best: <strong className="text-primary">{streak.longest}d</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
