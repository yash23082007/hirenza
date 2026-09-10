export interface BulletFeedback {
  text: string;
  score: number;
  hasActionVerb: boolean;
  actionVerbFound?: string;
  hasMetric: boolean;
  metricFound?: string;
  hasWeakPhrase: boolean;
  weakPhraseFound?: string;
  lengthStatus: "short" | "ideal" | "long";
  tips: string[];
}

export interface ATSReport {
  score: number;
  grade: "A" | "B" | "C" | "D";
  totalBullets: number;
  strongVerbsCount: number;
  metricsCount: number;
  weakPhrasesCount: number;
  bullets: BulletFeedback[];
  summary: string;
}

const STRONG_VERBS = [
  "architected",
  "engineered",
  "deployed",
  "optimized",
  "scaled",
  "spearheaded",
  "implemented",
  "reduced",
  "automated",
  "benchmarked",
  "refactored",
  "designed",
  "containerized",
  "accelerated",
  "orchestrated",
  "migrated",
  "integrated",
  "built",
  "eliminated",
];

const WEAK_PHRASES = [
  "responsible for",
  "worked on",
  "helped with",
  "assisted in",
  "part of team",
  "tasked with",
  "handled",
  "did",
  "involved in",
  "participated in",
];

const METRIC_REGEX = /(\d+%\b|\d+k\b|\d+m\b|\d+x\b|\d+\+?\s?(rps|qps|users|req|ms|min|seconds|hours|tb|gb|mb|nodes|services|dollars|\$))/i;

export function analyzeBullet(bullet: string): BulletFeedback {
  const trimmed = bullet.trim().replace(/^[-•*]\s*/, "");
  if (!trimmed) {
    return {
      text: "",
      score: 0,
      hasActionVerb: false,
      hasMetric: false,
      hasWeakPhrase: false,
      lengthStatus: "short",
      tips: ["Empty bullet point"],
    };
  }

  const lower = trimmed.toLowerCase();
  const tips: string[] = [];

  // Check strong verb
  let actionVerbFound: string | undefined;
  for (const verb of STRONG_VERBS) {
    if (new RegExp(`\\b${verb}\\b`, "i").test(lower)) {
      actionVerbFound = verb;
      break;
    }
  }

  // Check weak phrases
  let weakPhraseFound: string | undefined;
  for (const weak of WEAK_PHRASES) {
    if (lower.includes(weak)) {
      weakPhraseFound = weak;
      break;
    }
  }

  // Check metrics
  const metricMatch = trimmed.match(METRIC_REGEX);
  const metricFound = metricMatch ? metricMatch[0] : undefined;

  // Length check
  let lengthStatus: "short" | "ideal" | "long" = "ideal";
  if (trimmed.length < 50) {
    lengthStatus = "short";
    tips.push("Too brief. Elaborate on tech stack used and specific engineering impact.");
  } else if (trimmed.length > 200) {
    lengthStatus = "long";
    tips.push("Slightly verbose. Trim filler words to keep recruiters engaged.");
  }

  if (!actionVerbFound) {
    tips.push("Begin with a high-impact engineering verb (e.g. 'Architected', 'Optimized', 'Scaled').");
  }

  if (!metricFound) {
    tips.push("Missing quantifiable metric. Quantify impact (e.g. 'reduced latency by 35%', '10k RPS').");
  }

  if (weakPhraseFound) {
    tips.push(`Remove passive phrasing: replace '${weakPhraseFound}' with direct active ownership.`);
  }

  // Calculate score for this bullet
  let bulletScore = 40;
  if (actionVerbFound) bulletScore += 30;
  if (metricFound) bulletScore += 30;
  if (weakPhraseFound) bulletScore -= 25;
  if (lengthStatus === "ideal") bulletScore += 10;
  bulletScore = Math.max(10, Math.min(100, bulletScore));

  return {
    text: trimmed,
    score: bulletScore,
    hasActionVerb: Boolean(actionVerbFound),
    actionVerbFound,
    hasMetric: Boolean(metricFound),
    metricFound,
    hasWeakPhrase: Boolean(weakPhraseFound),
    weakPhraseFound,
    lengthStatus,
    tips,
  };
}

export function analyzeBullets(rawText: string): ATSReport {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) {
    return {
      score: 0,
      grade: "D",
      totalBullets: 0,
      strongVerbsCount: 0,
      metricsCount: 0,
      weakPhrasesCount: 0,
      bullets: [],
      summary: "Paste your resume bullet points above to generate an instant ATS audit.",
    };
  }

  const analyzed = lines.map(analyzeBullet);
  const totalScore = analyzed.reduce((acc, b) => acc + b.score, 0);
  const averageScore = Math.round(totalScore / analyzed.length);

  const strongVerbsCount = analyzed.filter((b) => b.hasActionVerb).length;
  const metricsCount = analyzed.filter((b) => b.hasMetric).length;
  const weakPhrasesCount = analyzed.filter((b) => b.hasWeakPhrase).length;

  let grade: "A" | "B" | "C" | "D" = "D";
  if (averageScore >= 85) grade = "A";
  else if (averageScore >= 70) grade = "B";
  else if (averageScore >= 50) grade = "C";

  let summary = "";
  if (grade === "A") {
    summary = "High-impact technical resume. Strong verbs and measurable metrics pass Workday and Greenhouse ATS scans with top scores.";
  } else if (grade === "B") {
    summary = "Good foundation. Add metrics to the remaining bullets to maximize recruiter screening pass-rate.";
  } else {
    summary = "Needs revision. Replace passive voice ('worked on') with quantifiable engineering outcomes and active verbs.";
  }

  return {
    score: averageScore,
    grade,
    totalBullets: analyzed.length,
    strongVerbsCount,
    metricsCount,
    weakPhrasesCount,
    bullets: analyzed,
    summary,
  };
}
