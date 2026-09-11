import { dsaSheets } from "./dsaSheets";
import { sqlQuestions } from "./sqlQuestions";
import { systemDesignTopics } from "./systemDesign";
import { coreSubjectsData } from "./coreSubjects";
import { packageWiseData } from "./packageWise";
import { companies } from "./companies";
import { dsaPatterns } from "./patterns";
import { interviewQuestionsData } from "./interviewQuestions";
import { notesContent } from "./notesContent";

export interface CatalogItem {
  id: string;
  title: string;
  module: "dsa" | "sql" | "system-design" | "core-subjects" | "patterns" | "companies" | "package-wise" | "tech-questions" | "notes";
  moduleLabel: string;
  topic?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  urls?: { label: string; href: string }[];
  href: string;
  approach?: string;
  hint?: string;
  complexity?: { time: string; space: string };
  frequency?: "High" | "Medium" | "Low";
}

let cachedCatalog: CatalogItem[] | null = null;

export function getAllCatalogItems(): CatalogItem[] {
  if (cachedCatalog) return cachedCatalog;

  const items: CatalogItem[] = [];

  // 1. DSA Sheets
  dsaSheets.forEach(sheet => {
    sheet.topics.forEach(t => {
      t.problems.forEach(p => {
        const urls: { label: string; href: string }[] = [];
        if (p.leetcodeUrl) urls.push({ label: "LeetCode", href: p.leetcodeUrl });
        if (p.gfgUrl) urls.push({ label: "GeeksforGeeks", href: p.gfgUrl });

        items.push({
          id: p.id,
          title: p.title,
          module: "dsa",
          moduleLabel: `DSA Sheet (${sheet.name})`,
          topic: p.topic || t.name,
          difficulty: p.difficulty,
          urls,
          href: `/preparation/dsa-sheets/${sheet.id}#problem-${p.id}`,
          frequency: p.frequency,
        });
      });
    });
  });

  // 2. SQL Questions
  sqlQuestions.forEach(q => {
    const urls: { label: string; href: string }[] = [];
    if (q.leetcodeUrl) urls.push({ label: "LeetCode", href: q.leetcodeUrl });
    if (q.hackerrankUrl) urls.push({ label: "HackerRank", href: q.hackerrankUrl });
    if (q.datalemurUrl) urls.push({ label: "DataLemur", href: q.datalemurUrl });

    items.push({
      id: `sql-${q.id}`,
      title: q.title,
      module: "sql",
      moduleLabel: "SQL Sheet",
      topic: q.category || q.topic,
      difficulty: q.difficulty,
      urls,
      href: `/preparation/sql-sheet#problem-sql-${q.id}`,
    });
  });

  // 3. System Design Topics
  systemDesignTopics.forEach(sd => {
    const urls: { label: string; href: string }[] = [];
    if (sd.referenceUrl) urls.push({ label: "Reference", href: sd.referenceUrl });

    items.push({
      id: `sd-${sd.id}`,
      title: sd.title,
      module: "system-design",
      moduleLabel: "System Design",
      topic: sd.category,
      difficulty: "Medium",
      urls,
      href: `/preparation/system-design#problem-sd-${sd.id}`,
      hint: sd.description,
    });
  });

  // 4. Core Subjects
  Object.entries(coreSubjectsData).forEach(([subject, questions]) => {
    questions.forEach(q => {
      const urls: { label: string; href: string }[] = [];
      if (q.gfgUrl) urls.push({ label: "GeeksforGeeks", href: q.gfgUrl });

      items.push({
        id: `cs-${q.id}`,
        title: q.title,
        module: "core-subjects",
        moduleLabel: `Core Subjects (${subject})`,
        topic: q.topic || q.category,
        difficulty: q.difficulty,
        urls,
        href: `/preparation/core-subjects#problem-cs-${q.id}`,
      });
    });
  });

  // 5. Package-wise DSA
  Object.entries(packageWiseData).forEach(([pkg, problems]) => {
    problems.forEach(p => {
      const urls: { label: string; href: string }[] = [];
      if (p.leetcodeUrl) urls.push({ label: "LeetCode", href: p.leetcodeUrl });

      items.push({
        id: `pkg-${p.id}`,
        title: p.title,
        module: "package-wise",
        moduleLabel: `Package DSA (${pkg})`,
        topic: p.topic,
        difficulty: p.difficulty,
        urls,
        href: `/preparation/package-wise-dsa#problem-pkg-${p.id}`,
        frequency: p.frequency,
      });
    });
  });

  // 6. Company Wise DSA
  companies.forEach(c => {
    c.problems.forEach(p => {
      const urls: { label: string; href: string }[] = [];
      if (p.leetcodeUrl) urls.push({ label: "LeetCode", href: p.leetcodeUrl });
      if (p.gfgUrl) urls.push({ label: "GeeksforGeeks", href: p.gfgUrl });

      items.push({
        id: `comp-${p.id}`,
        title: p.title,
        module: "companies",
        moduleLabel: `${c.name} DSA`,
        topic: p.topic,
        difficulty: p.difficulty,
        urls,
        href: `/preparation/company-wise-dsa/${c.id}#problem-${p.id}`,
        frequency: p.frequency,
      });
    });
  });

  // 7. DSA Patterns
  dsaPatterns.forEach(pat => {
    pat.problems.forEach((p, idx) => {
      const urls: { label: string; href: string }[] = [];
      if (p.leetcodeUrl) urls.push({ label: "LeetCode", href: p.leetcodeUrl });

      items.push({
        id: `pat-${pat.id}-${idx}`,
        title: p.title,
        module: "patterns",
        moduleLabel: `20 Patterns (${pat.name})`,
        topic: pat.name,
        difficulty: p.difficulty,
        urls,
        href: `/preparation/20-patterns/${pat.id}#problem-pat-${pat.id}-${idx}`,
        hint: pat.description,
      });
    });
  });

  // 8. Tech Questions
  Object.entries(interviewQuestionsData).forEach(([techId, questions]) => {
    questions.forEach((q, idx) => {
      items.push({
        id: `tech-${techId}-${idx}`,
        title: q.title,
        module: "tech-questions",
        moduleLabel: `Tech Interview (${techId.toUpperCase()})`,
        topic: q.category,
        difficulty: q.difficulty,
        href: `/preparation/most-asked-questions/${techId}`,
        hint: `Category: ${q.category} • Frequency: ${q.frequency}`,
      });
    });
  });

  // 9. Cool Notes
  notesContent.forEach(note => {
    items.push({
      id: `note-${note.id}`,
      title: note.title,
      module: "notes",
      moduleLabel: "Cool Notes",
      topic: note.title,
      difficulty: "Easy",
      href: `/preparation/cool-notes?note=${note.id}`,
      hint: `${note.sections.length} core revision modules`,
    });
  });

  cachedCatalog = items;
  return items;
}

export function findCatalogItem(id: string | number): CatalogItem | undefined {
  const strId = String(id);
  const items = getAllCatalogItems();
  return (
    items.find(i => i.id === strId) ||
    items.find(i => i.id === `sql-${strId}`) ||
    items.find(i => i.id === `pkg-${strId}`) ||
    items.find(i => i.id === `cs-${strId}`) ||
    items.find(i => i.id === `comp-${strId}`)
  );
}
