import { z } from "zod";

export const UserProfileSchema = z.object({
  name: z.string().default("Builder"),
  email: z.string().email().optional().or(z.literal("")),
  bio: z.string().default("Preparing for Tier-1 Tech & Product Engineering Roles"),
  targetCompany: z.string().default("Google"),
  targetDate: z.string().default(() => new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]),
  hoursPerDay: z.number().default(2),
});

export const ProblemStatusSchema = z.enum(["unsolved", "attempted", "solved", "review", "mastered"]);

export const ProgressEventSchema = z.object({
  date: z.string(), // "YYYY-MM-DD" or ISO string
  problemId: z.string(),
  module: z.string(),
  topic: z.string().optional(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(),
});

export const RevisionStateSchema = z.object({
  lastReviewedAt: z.string(), // ISO String
  nextReviewAt: z.string(), // ISO String
  reviewStage: z.number().min(0).max(5),
  reviewCount: z.number().min(0),
});

export const ProgressDataSchema = z.object({
  version: z.literal(2),
  statuses: z.record(z.string(), ProblemStatusSchema).default({}),
  bookmarks: z.record(z.string(), z.boolean()).default({}),
  events: z.array(ProgressEventSchema).default([]),
  revisions: z.record(z.string(), RevisionStateSchema).default({}),
  profile: UserProfileSchema.default({
    name: "Builder",
    email: "",
    bio: "Preparing for Tier-1 Tech & Product Engineering Roles",
    targetCompany: "Google",
    targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    hoursPerDay: 2,
  }),
});

export type ValidatedProgressData = z.infer<typeof ProgressDataSchema>;
export type ValidatedUserProfile = z.infer<typeof UserProfileSchema>;
export type ValidatedRevisionState = z.infer<typeof RevisionStateSchema>;
export type ValidatedProgressEvent = z.infer<typeof ProgressEventSchema>;
export type ValidatedProblemStatus = z.infer<typeof ProblemStatusSchema>;
