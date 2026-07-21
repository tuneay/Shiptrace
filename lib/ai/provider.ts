import type { TraceAnalysis } from "@/types/analysis";
import type { GitHubActivity } from "@/types/github";

export interface AnalysisProvider {
  analyze(activity: GitHubActivity): Promise<TraceAnalysis>;
}
