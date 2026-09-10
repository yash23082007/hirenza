import { MetadataRoute } from "next";
import { dsaSheets } from "@/data/dsaSheets";
import { companies } from "@/data/companies";
import { dsaPatterns } from "@/data/patterns";
import { interviewQuestionsData } from "@/data/interviewQuestions";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModifiedDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/community",
    "/onboarding",
    "/changelog",
    "/roadmap",
    "/preparation",
    "/preparation/daily",
    "/preparation/flashcards",
    "/preparation/simulator",
    "/preparation/dsa-sheets",
    "/preparation/sql-sheet",
    "/preparation/system-design",
    "/preparation/core-subjects",
    "/preparation/package-wise-dsa",
    "/preparation/company-wise-dsa",
    "/preparation/company-wise-dsa/compare",
    "/preparation/20-patterns",
    "/preparation/most-asked-questions",
    "/preparation/hr-questions",
    "/preparation/cool-notes",
    "/preparation/interview-experiences",
    "/preparation/cold-email-templates",
    "/preparation/resume-templates",
    "/preparation/dsa-playlists",
    "/preparation/system-design-playlists",
    "/preparation/coding-practice",
    "/preparation/role-wise",
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: lastModifiedDate,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/preparation") ? 0.9 : 0.6,
  }));

  // DSA Sheets dynamic parameters
  const sheetRoutes: MetadataRoute.Sitemap = dsaSheets.map(sheet => ({
    url: `${baseUrl}/preparation/dsa-sheets/${sheet.id}`,
    lastModified: lastModifiedDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Company routes
  const companyRoutes: MetadataRoute.Sitemap = companies.map(c => ({
    url: `${baseUrl}/preparation/company-wise-dsa/${c.id}`,
    lastModified: lastModifiedDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Pattern routes
  const patternRoutes: MetadataRoute.Sitemap = dsaPatterns.map(p => ({
    url: `${baseUrl}/preparation/20-patterns/${p.id}`,
    lastModified: lastModifiedDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Most asked technology question routes
  const techRoutes: MetadataRoute.Sitemap = Object.keys(interviewQuestionsData).map(tech => ({
    url: `${baseUrl}/preparation/most-asked-questions/${tech}`,
    lastModified: lastModifiedDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...sheetRoutes, ...companyRoutes, ...patternRoutes, ...techRoutes];
}
