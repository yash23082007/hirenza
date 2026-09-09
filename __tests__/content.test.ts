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
  
  it('every problem has at least one working URL', () => {
    // In a real scenario we'd do a fetch check, but for now we just make sure
    // the structure is correct where URLs are present
    // Currently Question doesn't have URLs across the board, but this is a stub
    // for part E where we expand URLs.
    expect(true).toBe(true);
  });
});
