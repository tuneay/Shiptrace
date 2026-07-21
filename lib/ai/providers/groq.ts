import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

import type { AnalysisProvider } from "@/lib/ai/provider";
import { buildAnalysisPrompt, SHIPTRACE_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { traceAnalysisSchema } from "@/types/analysis";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

export class GroqAnalysisProvider implements AnalysisProvider {
  private readonly client: OpenAI;
  private readonly model: string;

  constructor(apiKey: string, model = process.env.GROQ_MODEL ?? "openai/gpt-oss-120b") {
    this.client = new OpenAI({
      apiKey,
      baseURL: GROQ_BASE_URL,
      timeout: 30_000,
      maxRetries: 0,
    });
    this.model = model;
  }

  async analyze(activity: Parameters<AnalysisProvider["analyze"]>[0]) {
    const response = await this.client.responses.parse({
      model: this.model,
      input: [
        { role: "system", content: SHIPTRACE_SYSTEM_PROMPT },
        { role: "user", content: buildAnalysisPrompt(activity) },
      ],
      text: {
        format: zodTextFormat(traceAnalysisSchema, "shiptrace_analysis"),
      },
    });

    if (!response.output_parsed) {
      throw new Error("Groq returned no structured analysis");
    }

    return traceAnalysisSchema.parse(response.output_parsed);
  }
}
