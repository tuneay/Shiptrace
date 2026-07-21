export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type TraceRow = {
  id: string;
  slug: string;
  repo_owner: string;
  repo_name: string;
  repo_url: string;
  repo_description: string | null;
  default_branch: string | null;
  period_days: number;
  period_start: string;
  period_end: string;
  total_commits: number;
  active_days: number;
  contributor_count: number;
  stars: number;
  forks: number;
  last_commit_sha: string | null;
  headline: string;
  summary: string;
  status_label: string;
  confidence: number | null;
  highlights: Json;
  change_groups: Json;
  commits: Json;
  social_copy: Json;
  raw_stats: Json;
  created_at: string;
};

export type TraceInsert = Omit<TraceRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type Database = {
  public: {
    Tables: {
      traces: {
        Row: TraceRow;
        Insert: TraceInsert;
        Update: Partial<TraceInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
