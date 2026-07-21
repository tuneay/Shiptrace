"use client";

import { useEffect, useRef, useState } from "react";

type CopyStatus = "idle" | "copied" | "error";

const ICONS: Record<CopyStatus, string> = {
  idle: "＋",
  copied: "✓",
  error: "×",
};

export function CopyButton({ label, value }: { label: string; value: string }) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  async function copy() {
    window.clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    timeout.current = window.setTimeout(() => setStatus("idle"), 1900);
  }

  const visibleLabel = status === "copied" ? "Copied" : status === "error" ? "Copy failed" : label;

  return (
    <button
      className={`copy-button ${status === "copied" ? "copy-success" : ""} ${status === "error" ? "copy-error" : ""}`}
      type="button"
      onClick={copy}
    >
      <span>{visibleLabel}</span>
      <span className="copy-icon" aria-hidden="true" data-status={status}>
        {ICONS[status]}
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {status === "copied" ? `${label} copied to clipboard` : status === "error" ? "Copy failed. Please copy manually." : ""}
      </span>
    </button>
  );
}
