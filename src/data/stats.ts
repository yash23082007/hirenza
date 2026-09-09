/**
 * Computed statistics from actual data.
 * Every number displayed on the landing page / FAQ should come from here,
 * never from a hardcoded literal in JSX.
 *
 * If a count changes, it changes everywhere automatically.
 */

import { dsaSheets } from './dsaSheets';
import { companies } from './companies';
import { sqlQuestions } from './sqlQuestions';
import { systemDesignTopics } from './systemDesign';
import { coreSubjectsData } from './coreSubjects';
import { packageWiseData } from './packageWise';
import { interviewQuestionsData } from './interviewQuestions';
import { hrQuestionsData } from './hrQuestions';
import { roleWiseData } from './roleSkills';
import { dsaPatterns } from './patterns';
import { notes, emailTemplates } from './index';

// --- DSA Sheets ---
export const SHEET_COUNTS = dsaSheets.map(sheet => ({
  id: sheet.id,
  name: sheet.name,
  educator: sheet.educator,
  topicCount: sheet.topics.length,
  problemCount: sheet.topics.reduce((sum, t) => sum + t.problems.length, 0),
}));

export const TOTAL_DSA_PROBLEMS = SHEET_COUNTS.reduce((sum, s) => sum + s.problemCount, 0);
export const TOTAL_DSA_SHEETS = dsaSheets.length;

// --- Companies ---
export const COMPANY_COUNTS = companies.map(c => ({
  id: c.id,
  name: c.name,
  questionCount: c.problems.length,
}));

export const TOTAL_COMPANIES = companies.length;
export const TOTAL_COMPANY_PROBLEMS = companies.reduce((sum, c) => sum + c.problems.length, 0);

// --- SQL ---
export const TOTAL_SQL_QUESTIONS = sqlQuestions.length;

// --- System Design ---
export const TOTAL_SYSTEM_DESIGN_TOPICS = systemDesignTopics.length;

// --- Core Subjects ---
export const TOTAL_CORE_SUBJECT_QUESTIONS = Object.values(coreSubjectsData).reduce(
  (sum, questions) => sum + questions.length, 0
);

// --- Package Wise ---
export const TOTAL_PACKAGE_PROBLEMS = Object.values(packageWiseData).reduce(
  (sum, problems) => sum + problems.length, 0
);

// --- Interview Questions (tech-wise) ---
export const TOTAL_TECH_QUESTIONS = Object.values(interviewQuestionsData).reduce(
  (sum, questions) => sum + questions.length, 0
);

export const TECH_QUESTION_COUNTS = Object.entries(interviewQuestionsData).map(([id, questions]) => ({
  id,
  count: questions.length,
}));

// --- HR Questions ---
export const TOTAL_HR_QUESTIONS = hrQuestionsData.length;

// --- Roles ---
export const TOTAL_ROLES = roleWiseData.length;

// --- Patterns ---
export const TOTAL_PATTERNS = dsaPatterns.length;

// --- Notes ---
export const TOTAL_NOTES = notes.length;

// --- Email Templates ---
export const TOTAL_EMAIL_TEMPLATES = emailTemplates.length;

// --- Grand Total ---
export const TOTAL_ALL_PROBLEMS = TOTAL_DSA_PROBLEMS + TOTAL_SQL_QUESTIONS + TOTAL_COMPANY_PROBLEMS +
  TOTAL_CORE_SUBJECT_QUESTIONS + TOTAL_PACKAGE_PROBLEMS + TOTAL_TECH_QUESTIONS + TOTAL_HR_QUESTIONS;
