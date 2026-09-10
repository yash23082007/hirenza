import { describe, it, expect } from 'vitest';
import { 
  technologies, 
  interviewQuestionsData, 
  companies, 
  roleWiseData, 
  dsaSheets, 
  dsaPatterns, 
  sqlQuestions, 
  coreSubjectsData, 
  packageWiseData 
} from '../src/data';
import { getAllCatalogItems } from '../src/data/catalog';
import { SHEET_COUNTS, COMPANY_COUNTS, TOTAL_ROLES } from '../src/data/stats';

describe('Content Validation', () => {
  it('every advertised technology has questions', () => {
    for (const t of technologies) {
      expect(interviewQuestionsData[t.id]?.length, `Technology ${t.id} has no questions`).toBeGreaterThan(0);
    }
  });

  it('company counts match reality', () => {
    for (const c of companies) {
      expect(c.problems.length).toBe(c.totalQuestions);
      expect(
        c.difficultyBreakdown.easy +
        c.difficultyBreakdown.medium +
        c.difficultyBreakdown.hard
      ).toBe(c.problems.length);
    }
  });

  it('roles counts match reality', () => {
    expect(roleWiseData.length).toBe(TOTAL_ROLES);
    expect(companies.length).toBe(COMPANY_COUNTS.length);
    expect(SHEET_COUNTS.length).toBeGreaterThan(0);
  });
  
  it('every problem with URLs has valid URL format', () => {
    for (const c of companies) {
      for (const p of c.problems) {
        if (p.leetcodeUrl) {
          expect(p.leetcodeUrl.startsWith('http'), `Bad LeetCode URL for ${p.title}`).toBe(true);
        }
        if (p.gfgUrl) {
          expect(p.gfgUrl.startsWith('http'), `Bad GFG URL for ${p.title}`).toBe(true);
        }
      }
    }
  });

  it('all catalog problem IDs are globally unique', () => {
    const ids = getAllCatalogItems().map(item => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every DSA sheet has a catalog route and unique source IDs', () => {
    const catalogIds = new Set(getAllCatalogItems().map(item => item.id));
    const sheetIds = dsaSheets.flatMap(sheet => sheet.topics.flatMap(topic => topic.problems.map(problem => problem.id)));
    expect(new Set(sheetIds).size).toBe(sheetIds.length);
    for (const id of sheetIds) expect(catalogIds.has(id)).toBe(true);
  });

  it('every DSA sheet has a direct detail route', () => {
    for (const sheet of dsaSheets) {
      expect(`/preparation/dsa-sheets/${sheet.id}`).toMatch(/^\/preparation\/dsa-sheets\/[a-z0-9-]+$/);
    }
  });

  it('problem IDs are unique across DSA sheets and companies', () => {
    const sheetIds = dsaSheets.flatMap(sheet => sheet.topics.flatMap(topic => topic.problems.map(problem => problem.id)));
    const companyIds = companies.flatMap(company => company.problems.map(problem => problem.id));
    const allProblemIds = [...sheetIds, ...companyIds];
    const duplicates = allProblemIds.filter((item, index) => allProblemIds.indexOf(item) !== index);
    expect(duplicates).toEqual([]);
  });

  it('client-side status keys round-trip to valid catalog items across all modules', () => {
    const catalogIds = new Set(getAllCatalogItems().map(item => item.id));

    // Company module uses comp-${problem.id}
    for (const c of companies) {
      for (const p of c.problems) {
        expect(catalogIds.has(`comp-${p.id}`), `Missing catalog item for comp-${p.id}`).toBe(true);
      }
    }

    // Pattern module uses pat-${pattern.id}-${index}
    for (const pat of dsaPatterns) {
      pat.problems.forEach((_, pIdx) => {
        expect(catalogIds.has(`pat-${pat.id}-${pIdx}`), `Missing catalog item for pat-${pat.id}-${pIdx}`).toBe(true);
      });
    }

    // SQL module uses sql-${q.id}
    for (const q of sqlQuestions) {
      expect(catalogIds.has(`sql-${q.id}`), `Missing catalog item for sql-${q.id}`).toBe(true);
    }

    // Core subjects use cs-${q.id}
    for (const questions of Object.values(coreSubjectsData)) {
      questions.forEach(q => {
        expect(catalogIds.has(`cs-${q.id}`), `Missing catalog item for cs-${q.id}`).toBe(true);
      });
    }

    // Package-wise uses pkg-${p.id}
    for (const problems of Object.values(packageWiseData)) {
      problems.forEach(p => {
        expect(catalogIds.has(`pkg-${p.id}`), `Missing catalog item for pkg-${p.id}`).toBe(true);
      });
    }
  });

  it('sidebar sheet children cover all dsaSheets IDs', () => {
    // Generate the sidebar routes just like Sidebar.tsx does
    const sidebarHrefs = new Set(dsaSheets.map(sheet => `/preparation/dsa-sheets/${sheet.id}`));
    expect(sidebarHrefs.size).toBe(dsaSheets.length);
    for (const sheet of dsaSheets) {
      expect(sidebarHrefs.has(`/preparation/dsa-sheets/${sheet.id}`)).toBe(true);
    }
  });
});

