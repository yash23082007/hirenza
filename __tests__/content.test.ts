import { describe, it, expect } from 'vitest';
import { technologies, interviewQuestionsData, companies, roleWiseData } from '../src/data';
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
});
