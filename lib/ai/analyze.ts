import { createFallbackAnalysis } from "@/lib/ai/fallback";
import type { AnalysisProvider } from "@/lib/ai/provider";
import { GroqAnalysisProvider } from "@/lib/ai/providers/groq";
import { sanitizeAnalysis } from "@/lib/ai/sanitize";
import type { AnalysisResult } from "@/types/analysis";
import type { GitHubActivity } from "@/types/github";

function defaultProvider() {
  const apiKey = process.env.GROQ_API_KEY;
  return apiKey ? new GroqAnalysisProvider(apiKey) : null;
}

export async function analyzeGitHubActivity(
  activity: GitHubActivity,
  provider: AnalysisProvider | null = defaultProvider(),
): Promise<AnalysisResult> {
  if (provider) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const analysis = sanitizeAnalysis(await provider.analyze(activity), activity);
        return { analysis, generatedByFallback: false };
      } catch {
        // A single retry is intentional. The deterministic fallback handles the second failure.
      }
    }
  }

  return {
    analysis: createFallbackAnalysis(activity),
    generatedByFallback: true,
  };
}
