import { MetadataRoute } from "next";
import { dsaSheets } from "@/data/dsaSheets";
import { companies } from "@/data/companies";
import { dsaPatterns } from "@/data/patterns";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hirenza.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/community",
    "/profile",
    "/profile/progress",
    "/profile/bookmarks",
    "/preparation",
    "/preparation/dsa-sheets",
    "/preparation/sql-sheet",
    "/preparation/system-design",
    "/preparation/core-subjects",
    "/preparation/package-wise-dsa",
    "/preparation/company-wise-dsa",
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
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/preparation") ? 0.9 : 0.6,
  }));

  // DSA Sheets dynamic parameters
  const sheetRoutes: MetadataRoute.Sitemap = dsaSheets.map(sheet => ({
    url: `${baseUrl}/preparation/dsa-sheets?sheet=${sheet.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Company routes
  const companyRoutes: MetadataRoute.Sitemap = companies.map(c => ({
    url: `${baseUrl}/preparation/company-wise-dsa?company=${c.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Pattern routes
  const patternRoutes: MetadataRoute.Sitemap = dsaPatterns.map(p => ({
    url: `${baseUrl}/preparation/20-patterns?pattern=${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...sheetRoutes, ...companyRoutes, ...patternRoutes];
}
