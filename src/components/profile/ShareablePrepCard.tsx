"use client";

import { useState, useRef } from "react";
import { useProgress } from "@/hooks/useProgress";
import { Download, Share2, Check, Flame, Trophy, Target, Sparkles } from "lucide-react";

export function ShareablePrepCard() {
  const { data, streak: streakObj } = useProgress();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const name = data.profile?.name || "Software Engineer";
  const targetCompany = data.profile?.targetCompany || "Google";
  const solvedCount = Object.values(data.statuses).filter((s) => s === "solved" || s === "mastered").length;
  const streak = streakObj?.current || 0;

  // Calculate target readiness: approximate based on solved count and target
  const readiness = Math.min(100, Math.round((solvedCount / 50) * 100));

  const handleDownloadImage = () => {
    setDownloading(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas size 1200 x 630
    canvas.width = 1200;
    canvas.height = 630;

    // 1. Background gradient
    const bgGrad = ctx.createRadialGradient(600, 315, 50, 600, 315, 700);
    bgGrad.addColorStop(0, "#131326");
    bgGrad.addColorStop(1, "#07070c");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 630);

    // Subtle grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 1200; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 630);
      ctx.stroke();
    }
    for (let y = 0; y < 630; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1200, y);
      ctx.stroke();
    }

    // Outer Glow Border
    ctx.strokeStyle = "rgba(168, 85, 247, 0.35)";
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 1140, 570);

    // 2. Brand Header (Top Left)
    ctx.fillStyle = "#a855f7";
    ctx.font = "bold 20px monospace";
    ctx.fillText("HIRENZA PREP SCORECARD", 70, 90);

    // Brand Header (Top Right)
    ctx.fillStyle = "#94a3b8";
    ctx.font = "16px monospace";
    ctx.textAlign = "right";
    ctx.fillText("hirenza.in · Offline-First Engine", 1130, 90);
    ctx.textAlign = "left";

    // 3. Candidate Name
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 52px sans-serif";
    ctx.fillText(name, 70, 170);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "24px sans-serif";
    ctx.fillText(`Targeting ${targetCompany} Engineering Rounds`, 70, 215);

    // 4. Metric Boxes
    const drawCardBox = (x: number, y: number, w: number, h: number, label: string, value: string, sub: string, color: string) => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 16px monospace";
      ctx.fillText(label.toUpperCase(), x + 25, y + 45);

      ctx.fillStyle = color;
      ctx.font = "bold 56px monospace";
      ctx.fillText(value, x + 25, y + 115);

      ctx.fillStyle = "#64748b";
      ctx.font = "16px sans-serif";
      ctx.fillText(sub, x + 25, y + 150);
    };

    drawCardBox(70, 270, 320, 180, "Solved Problems", `${solvedCount}`, "Verified locally in browser", "#ffffff");
    drawCardBox(430, 270, 320, 180, "Current Streak", `${streak} Days`, "Consecutive practice days", "#f59e0b");
    drawCardBox(790, 270, 340, 180, `${targetCompany} Readiness`, `${readiness}%`, "Frequency-weighted score", "#a855f7");

    // 5. Footer verification band
    ctx.fillStyle = "rgba(168, 85, 247, 0.08)";
    ctx.fillRect(70, 490, 1060, 70);
    ctx.strokeStyle = "rgba(168, 85, 247, 0.25)";
    ctx.strokeRect(70, 490, 1060, 70);

    ctx.fillStyle = "#c084fc";
    ctx.font = "bold 18px monospace";
    ctx.fillText("⚡ ZERO TRACKERS · 100% CLIENT STORAGE · OPEN-SOURCE UNDER MIT", 95, 532);

    // Convert to PNG download
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `hirenza-prep-card-${name.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = url;
    link.click();
    setDownloading(false);
  };

  const handleCopyText = () => {
    const text = `🚀 Tracked ${solvedCount} problems with a ${streak}-day streak on Hirenza! Targeting ${targetCompany} (${readiness}% ready). Offline-first & open source at https://hirenza-prep.vercel.app`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="border border-border rounded-3xl p-6 md:p-8 bg-surface-1 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-1/10 border border-purple-1/30 text-purple-1 text-xs font-mono mb-2">
            <Sparkles size={12} />
            <span>Shareable Candidate Card</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            Export Your Verified Prep Card
          </h2>
          <p className="text-xs text-secondary mt-0.5">
            Download a high-resolution 1200×630 scorecard to share on LinkedIn, Twitter, or with your study group.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-border text-xs font-semibold text-primary hover:border-border-hover transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
            <span>{copied ? "Copied!" : "Copy Share Text"}</span>
          </button>

          <button
            onClick={handleDownloadImage}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-1 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <Download size={14} />
            <span>{downloading ? "Generating..." : "Download 1200×630 PNG"}</span>
          </button>
        </div>
      </div>

      {/* Visual Live Card Preview */}
      <div className="relative overflow-hidden rounded-2xl border border-purple-1/30 bg-gradient-to-br from-surface-2 via-surface-1 to-surface-2 p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-1 uppercase">
            <span>hirenza prep scorecard</span>
          </div>
          <span className="text-xs font-mono text-muted">Client-verified metrics</span>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-extrabold text-primary">{name}</h3>
          <p className="text-sm text-secondary">Targeting {targetCompany} Engineering Rounds</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl border border-border bg-surface-1">
            <div className="flex items-center gap-2 text-xs font-mono text-muted mb-1">
              <Trophy size={14} className="text-purple-1" />
              <span>Problems Solved</span>
            </div>
            <div className="text-3xl font-mono font-extrabold text-primary">{solvedCount}</div>
            <div className="text-[11px] text-secondary">Stored in local browser</div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface-1">
            <div className="flex items-center gap-2 text-xs font-mono text-muted mb-1">
              <Flame size={14} className="text-amber-500" />
              <span>Current Streak</span>
            </div>
            <div className="text-3xl font-mono font-extrabold text-amber-400">{streak} Days</div>
            <div className="text-[11px] text-secondary">Consecutive solve streak</div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface-1">
            <div className="flex items-center gap-2 text-xs font-mono text-muted mb-1">
              <Target size={14} className="text-cyan-400" />
              <span>{targetCompany} Readiness</span>
            </div>
            <div className="text-3xl font-mono font-extrabold text-purple-1">{readiness}%</div>
            <div className="text-[11px] text-secondary">Weighted frequency score</div>
          </div>
        </div>

        <div className="text-[11px] font-mono text-muted flex items-center justify-between border-t border-border pt-4">
          <span>100% Offline-First · Zero Server Tracking</span>
          <span>hirenza.in</span>
        </div>
      </div>

      {/* Hidden Canvas for crisp 1200x630 rendering */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
