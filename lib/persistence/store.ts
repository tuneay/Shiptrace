import { createClient } from "@supabase/supabase-js";

import type { AnalysisResult } from "@/types/analysis";
import type { GitHubActivity } from "@/types/github";
import type { TraceRecord } from "@/types/trace";
import type { Database, TraceRow } from "@/lib/persistence/database.types";
import { PersistenceError } from "@/lib/persistence/errors";
import { toTraceInsert, toTraceRecord, validateTraceRow } from "@/lib/persistence/mapping";
import { createTraceSlug } from "@/lib/persistence/slug";

declare global {
  var __shiptraceMemoryTraces: Map<string, TraceRow> | undefined;
}

const memoryTraces = globalThis.__shiptraceMemoryTraces ?? new Map<string, TraceRow>();
globalThis.__shiptraceMemoryTraces = memoryTraces;

function supabaseConfiguration() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY
    ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !secretKey || !publishableKey) return null;
  return { url, secretKey, publishableKey };
}

function adminClient(configuration: NonNullable<ReturnType<typeof supabaseConfiguration>>) {
  return createClient<Database>(configuration.url, configuration.secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function publicClient(configuration: NonNullable<ReturnType<typeof supabaseConfiguration>>) {
  return createClient<Database>(configuration.url, configuration.publishableKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function canUseDevelopmentMemory() {
  return process.env.NODE_ENV !== "production";
}

function findMemoryDuplicate(activity: GitHubActivity) {
  const cutoff = Date.now() - 10 * 60 * 1000;
  return [...memoryTraces.values()].find((row) => (
    row.repo_owner.toLowerCase() === activity.repository.owner.toLowerCase()
    && row.repo_name.toLowerCase() === activity.repository.name.toLowerCase()
    && row.period_days === activity.periodDays
    && row.last_commit_sha === activity.lastCommitSha
    && new Date(row.created_at).getTime() >= cutoff
  ));
}

async function saveToMemory(activity: GitHubActivity, result: AnalysisResult) {
  const duplicate = findMemoryDuplicate(activity);
  if (duplicate) return toTraceRecord(validateTraceRow(duplicate));

  const slug = createTraceSlug(activity.repository.name, activity.periodStart, activity.periodEnd);
  const row: TraceRow = {
    ...toTraceInsert(activity, result, slug),
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  const validated = validateTraceRow(row);
  memoryTraces.set(slug, validated);
  return toTraceRecord(validated);
}

export async function saveTrace(activity: GitHubActivity, result: AnalysisResult): Promise<TraceRecord> {
  const configuration = supabaseConfiguration();
  if (!configuration) {
    if (canUseDevelopmentMemory()) return saveToMemory(activity, result);
    throw new PersistenceError("Supabase is not configured for production.");
  }

  const client = adminClient(configuration);
  const duplicateCutoff = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const duplicate = await client
    .from("traces")
    .select("*")
    .eq("repo_owner", activity.repository.owner)
    .eq("repo_name", activity.repository.name)
    .eq("period_days", activity.periodDays)
    .eq("last_commit_sha", activity.lastCommitSha)
    .gte("created_at", duplicateCutoff)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (duplicate.error) throw new PersistenceError(undefined, duplicate.error);
  if (duplicate.data) return toTraceRecord(validateTraceRow(duplicate.data));

  const slug = createTraceSlug(activity.repository.name, activity.periodStart, activity.periodEnd);
  const inserted = await client
    .from("traces")
    .insert(toTraceInsert(activity, result, slug))
    .select("*")
    .single();

  if (inserted.error || !inserted.data) throw new PersistenceError(undefined, inserted.error);
  return toTraceRecord(validateTraceRow(inserted.data));
}

export async function getTraceBySlug(slug: string): Promise<TraceRecord | null> {
  const configuration = supabaseConfiguration();
  if (!configuration) {
    if (!canUseDevelopmentMemory()) throw new PersistenceError("Supabase is not configured for production.");
    const row = memoryTraces.get(slug);
    return row ? toTraceRecord(validateTraceRow(row)) : null;
  }

  const result = await publicClient(configuration)
    .from("traces")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (result.error) throw new PersistenceError("We could not load this trace.", result.error);
  return result.data ? toTraceRecord(validateTraceRow(result.data)) : null;
}

export function clearDevelopmentTraceStore() {
  if (process.env.NODE_ENV === "production") return;
  memoryTraces.clear();
}
