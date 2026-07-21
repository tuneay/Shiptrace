"use client";

import { ErrorState } from "@/components/error-state";

export default function TraceError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorState reset={reset} />;
}
