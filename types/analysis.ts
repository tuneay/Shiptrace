import { z } from "zod";

export const traceCategorySchema = z.enum([
  "feature",
  "fix",
  "improvement",
  "infrastructure",
  "documentation",
  "maintenance",
]);

export const traceAnalysisSchema = z.object({
  headline: z.string().min(8).max(100),
  summary: z.string().min(40).max(600),
  statusLabel: z.enum(["SHIPPING", "BUILDING", "REFINING", "MAINTAINING"]),
  confidence: z.number().min(0).max(1),
  highlights: z.array(z.object({
    title: z.string().min(4).max(90),
    description: z.string().min(10).max(260),
    category: traceCategorySchema,
    relatedCommitShas: z.array(z.string()),
  })).min(1).max(5),
  changeGroups: z.array(z.object({
    category: traceCategorySchema,
    title: z.string().min(4).max(90),
    summary: z.string().min(10).max(300),
    commitShas: z.array(z.string()),
  })).min(1).max(6),
  socialCopy: z.object({
    linkedin: z.string().min(20).max(1300),
    x: z.string().min(20).max(280),
  }),
  ignoredCommitShas: z.array(z.string()),
});

export type TraceCategory = z.infer<typeof traceCategorySchema>;
export type TraceAnalysis = z.infer<typeof traceAnalysisSchema>;
export type TraceHighlight = TraceAnalysis["highlights"][number];
export type ChangeGroup = TraceAnalysis["changeGroups"][number];
export type SocialCopy = TraceAnalysis["socialCopy"];

export type AnalysisResult = {
  analysis: TraceAnalysis;
  generatedByFallback: boolean;
};
