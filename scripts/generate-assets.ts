import fs from "fs";
import path from "path";
import sharp from "sharp";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const iconsDir = path.join(publicDir, "icons");
const bannersDir = path.join(publicDir, "banners");
const ogDir = path.join(publicDir, "og");

[publicDir, iconsDir, bannersDir, ogDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 1. Generate App Icon SVG
function createIconSvg(size: number) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0a0c" />
        <stop offset="100%" stop-color="#050505" />
      </linearGradient>
      <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7a33f6" />
        <stop offset="50%" stop-color="#9d4edd" />
        <stop offset="100%" stop-color="#bb1ef5" />
      </linearGradient>
      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#bb1ef5" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#7a33f6" stop-opacity="0" />
      </linearGradient>
      <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="16" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <!-- Background Squircle -->
    <rect width="512" height="512" rx="112" fill="url(#bgGrad)" stroke="#242630" stroke-width="6" />
    <circle cx="256" cy="256" r="180" fill="url(#glowGrad)" />

    <!-- Geometric Hirenza Mark -->
    <g transform="translate(106, 116)" filter="url(#purpleGlow)">
      <!-- Left pillar -->
      <rect x="20" y="20" width="48" height="240" rx="14" fill="url(#brandGrad)" />
      <!-- Center bridge -->
      <rect x="20" y="116" width="160" height="48" rx="12" fill="url(#brandGrad)" />
      <!-- Right pillar -->
      <rect x="132" y="20" width="48" height="240" rx="14" fill="url(#brandGrad)" />
      <!-- Forward diagonal accent -->
      <path d="M210 50 L270 50 L270 230 L210 230 Z" fill="#9d4edd" opacity="0.85" rx="8" />
      <circle cx="240" cy="50" r="16" fill="#f9de08" />
    </g>
  </svg>`;
}

// 2. Generate OG Image SVG
function createOgSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="ogBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#070709" />
        <stop offset="50%" stop-color="#0d0d12" />
        <stop offset="100%" stop-color="#050505" />
      </linearGradient>
      <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7a33f6" />
        <stop offset="100%" stop-color="#bb1ef5" />
      </linearGradient>
      <radialGradient id="radialGlow" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stop-color="#7a33f6" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#050505" stop-opacity="0" />
      </radialGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#242630" stroke-width="0.75" stroke-opacity="0.4" />
      </pattern>
    </defs>

    <rect width="1200" height="630" fill="url(#ogBg)" />
    <rect width="1200" height="630" fill="url(#radialGlow)" />
    <rect width="1200" height="630" fill="url(#grid)" />

    <!-- Outer border -->
    <rect x="24" y="24" width="1152" height="582" rx="24" fill="none" stroke="#242630" stroke-width="2" />

    <!-- Eyebrow -->
    <g transform="translate(80, 110)">
      <rect x="0" y="0" width="220" height="32" rx="16" fill="#171717" stroke="#242630" stroke-width="1" />
      <circle cx="16" cy="16" r="5" fill="#f97316" />
      <text x="32" y="21" fill="#f97316" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5">OFFLINE-FIRST PREP OS</text>
    </g>

    <!-- Logo & Brand Name -->
    <g transform="translate(80, 170)">
      <!-- Geometric Logo -->
      <rect x="0" y="0" width="64" height="64" rx="14" fill="#111111" stroke="#242630" stroke-width="1.5" />
      <path d="M16 12 L16 52 M36 12 L36 52 M16 32 L36 32" stroke="url(#brand)" stroke-width="6" stroke-linecap="round" />
      <text x="84" y="48" fill="#f5f5f7" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" letter-spacing="-1">HIRENZA</text>
    </g>

    <!-- Main Headline -->
    <text x="80" y="305" fill="#f5f5f7" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="800" letter-spacing="-1.5">
      Prep like it's production.
    </text>

    <!-- Subtitle -->
    <text x="80" y="365" fill="#a6a8b4" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="400" letter-spacing="-0.2">
      Curated DSA Sheets · Company Tracks · System Design · SQL Tracking · Spaced Repetition
    </text>

    <!-- Feature Pills Band -->
    <g transform="translate(80, 440)">
      <!-- Pill 1 -->
      <g transform="translate(0, 0)">
        <rect width="210" height="52" rx="14" fill="#111111" stroke="#242630" stroke-width="1" />
        <text x="24" y="32" fill="#f5f5f7" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700">800+ Problems</text>
      </g>
      <!-- Pill 2 -->
      <g transform="translate(225, 0)">
        <rect width="210" height="52" rx="14" fill="#111111" stroke="#242630" stroke-width="1" />
        <text x="24" y="32" fill="#f5f5f7" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700">7 Curated Sheets</text>
      </g>
      <!-- Pill 3 -->
      <g transform="translate(450, 0)">
        <rect width="230" height="52" rx="14" fill="#111111" stroke="#242630" stroke-width="1" />
        <text x="24" y="32" fill="#f5f5f7" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700">125 Technologies</text>
      </g>
      <!-- Pill 4 -->
      <g transform="translate(695, 0)">
        <rect width="280" height="52" rx="14" fill="#171717" stroke="#7a33f6" stroke-width="1.5" />
        <text x="24" y="32" fill="#bb1ef5" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700">100% Client-Side &amp; Private</text>
      </g>
    </g>

    <!-- Bottom URL -->
    <text x="80" y="555" fill="#70727e" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500">
      hirenza-prep.vercel.app · No Account Needed · Free Forever
    </text>
  </svg>`;
}

// 3. Generate Sheet Banner SVGs
interface BannerConfig {
  id: string;
  name: string;
  educator: string;
  badge: string;
  initial: string;
  accentColor: string;
  secondaryColor: string;
  motif: string;
}

const sheetsConfig: BannerConfig[] = [
  {
    id: "striver-a2z",
    name: "Striver's A2Z DSA",
    educator: "TakeUForward",
    badge: "COMPLETE CURRICULUM",
    initial: "S",
    accentColor: "#7a33f6",
    secondaryColor: "#bb1ef5",
    motif: "A to Z Progression · 40+ Topics · Step-by-Step",
  },
  {
    id: "neetcode-150",
    name: "NeetCode 150",
    educator: "NeetCode",
    badge: "20 PATTERNS",
    initial: "NC",
    accentColor: "#10b981",
    secondaryColor: "#059669",
    motif: "Blind 75 Evolution · Pattern-Based · LeetCode Gold",
  },
  {
    id: "love-babbar",
    name: "Love Babbar 450",
    educator: "CodeHelp",
    badge: "450 PROBLEMS",
    initial: "LB",
    accentColor: "#f97316",
    secondaryColor: "#ea580c",
    motif: "Complete Placement Sheet · Comprehensive Roadmap",
  },
  {
    id: "arsh-goyal",
    name: "Arsh Goyal Track",
    educator: "Arsh Goyal",
    badge: "TOP COMPANIES",
    initial: "AG",
    accentColor: "#3b82f6",
    secondaryColor: "#2563eb",
    motif: "High Frequency Interview Archives · 280 Questions",
  },
  {
    id: "shradha-khapra",
    name: "Shradha Khapra Sheet",
    educator: "Apna College",
    badge: "FOUNDATIONAL",
    initial: "SK",
    accentColor: "#ec4899",
    secondaryColor: "#db2777",
    motif: "Beginner to Advanced Roadmap · 375 Selected Problems",
  },
  {
    id: "rohit-negi",
    name: "Rohit Negi Sheet",
    educator: "Coder Army",
    badge: "PATTERN MASTERY",
    initial: "RN",
    accentColor: "#06b6d4",
    secondaryColor: "#0891b2",
    motif: "Pattern Recognition Focused · Concise Essential Prep",
  },
  {
    id: "fraz",
    name: "Fraz DSA Sheet",
    educator: "CodeWithFraz",
    badge: "HIGH YIELD",
    initial: "FZ",
    accentColor: "#a855f7",
    secondaryColor: "#9333ea",
    motif: "120 Must-Do Interview Problems · High-Yield Efficiency",
  },
];

function createBannerSvg(c: BannerConfig) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="480" viewBox="0 0 900 480">
    <defs>
      <linearGradient id="cardBg_${c.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0c0d12" />
        <stop offset="100%" stop-color="#060608" />
      </linearGradient>
      <radialGradient id="accentGlow_${c.id}" cx="85%" cy="20%" r="65%">
        <stop offset="0%" stop-color="${c.accentColor}" stop-opacity="0.32" />
        <stop offset="100%" stop-color="#050505" stop-opacity="0" />
      </radialGradient>
      <pattern id="cardGrid_${c.id}" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#242630" stroke-width="0.6" stroke-opacity="0.35" />
      </pattern>
    </defs>

    <!-- Card Background -->
    <rect width="900" height="480" rx="20" fill="url(#cardBg_${c.id})" />
    <rect width="900" height="480" rx="20" fill="url(#accentGlow_${c.id})" />
    <rect width="900" height="480" rx="20" fill="url(#cardGrid_${c.id})" />
    <rect width="900" height="480" rx="20" fill="none" stroke="#242630" stroke-width="2" />

    <!-- Top Left Badge -->
    <g transform="translate(56, 56)">
      <rect width="180" height="30" rx="15" fill="#171717" stroke="${c.accentColor}" stroke-width="1.2" />
      <circle cx="15" cy="15" r="4.5" fill="${c.accentColor}" />
      <text x="28" y="20" fill="${c.accentColor}" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" letter-spacing="1">${c.badge}</text>
    </g>

    <!-- Educator Subtitle -->
    <text x="56" y="130" fill="#a6a8b4" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" letter-spacing="0.5">
      by ${c.educator}
    </text>

    <!-- Main Sheet Title -->
    <text x="56" y="195" fill="#f5f5f7" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" letter-spacing="-1">
      ${c.name}
    </text>

    <!-- Motif / Feature note -->
    <text x="56" y="250" fill="#70727e" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="500">
      ${c.motif}
    </text>

    <!-- Giant stylized geometric emblem on right -->
    <g transform="translate(620, 90)">
      <rect width="210" height="260" rx="28" fill="#111111" stroke="#242630" stroke-width="1.5" opacity="0.9" />
      <circle cx="105" cy="130" r="75" fill="${c.accentColor}" fill-opacity="0.12" stroke="${c.accentColor}" stroke-width="1.5" stroke-dasharray="6 4" />
      <text x="105" y="152" fill="#f5f5f7" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="900" text-anchor="middle" letter-spacing="-2">
        ${c.initial}
      </text>
    </g>

    <!-- Bottom Status Bar -->
    <g transform="translate(56, 380)">
      <line x1="0" y1="0" x2="788" y2="0" stroke="#242630" stroke-width="1" />
      <text x="0" y="34" fill="#70727e" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600">
        HIRENZA TRACKER · 4-STATE ENGINE · REVISION QUEUE
      </text>
      <circle cx="770" cy="28" r="6" fill="${c.accentColor}" />
    </g>
  </svg>`;
}

async function run() {
  console.log("Generating icons...");
  const svg512 = createIconSvg(512);

  // 192x192 icon
  await sharp(Buffer.from(svg512))
    .resize(192, 192)
    .png()
    .toFile(path.join(iconsDir, "icon-192.png"));
  fs.copyFileSync(path.join(iconsDir, "icon-192.png"), path.join(publicDir, "icon-192.png"));

  // 512x512 icon
  await sharp(Buffer.from(svg512))
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, "icon-512.png"));
  fs.copyFileSync(path.join(iconsDir, "icon-512.png"), path.join(publicDir, "icon-512.png"));

  // 180x180 apple touch icon
  await sharp(Buffer.from(svg512))
    .resize(180, 180)
    .png()
    .toFile(path.join(iconsDir, "apple-touch-icon.png"));
  fs.copyFileSync(path.join(iconsDir, "apple-touch-icon.png"), path.join(publicDir, "apple-touch-icon.png"));

  // 32x32 favicon png & ico
  const fav32 = await sharp(Buffer.from(svg512)).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(iconsDir, "favicon-32x32.png"), fav32);
  fs.writeFileSync(path.join(iconsDir, "favicon.ico"), fav32);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), fav32);

  console.log("Generating OG image...");
  const ogSvg = createOgSvg();
  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png({ quality: 90 })
    .toFile(path.join(ogDir, "og.png"));
  fs.copyFileSync(path.join(ogDir, "og.png"), path.join(publicDir, "og.png"));

  console.log("Generating 7 DSA sheet banners...");
  for (const sheet of sheetsConfig) {
    const bannerSvg = createBannerSvg(sheet);
    const destWebp = path.join(bannersDir, `${sheet.id}.webp`);
    await sharp(Buffer.from(bannerSvg))
      .resize(900, 480)
      .webp({ quality: 85 })
      .toFile(destWebp);

    const stats = fs.statSync(destWebp);
    console.log(`Banner ${sheet.id}.webp: ${(stats.size / 1024).toFixed(1)} KB`);
  }

  console.log("All assets generated successfully!");
}

run().catch(err => {
  console.error("Asset generation failed:", err);
  process.exit(1);
});
