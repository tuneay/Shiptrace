import { ImageResponse } from "next/og";

import { formatPeriod } from "@/lib/format";
import { getTraceBySlug } from "@/lib/persistence/store";

export const runtime = "nodejs";
export const maxDuration = 30;

const imageSize = { width: 1200, height: 630 };

function displayUrl(slug: string) {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "shiptrace.app").replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `${base}/t/${slug}`;
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trace = await getTraceBySlug(slug);
  if (!trace) return new Response("Share image not found", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFCF6",
          color: "#11110F",
          padding: "48px 54px 44px",
          fontFamily: "Arial, sans-serif",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 17, fontWeight: 700, letterSpacing: 3 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            SHIPTRACE
            <span style={{ width: 9, height: 9, marginLeft: 8, marginBottom: 13, border: "1px solid #11110F", background: "#D7FF45" }} />
          </div>
          <div style={{ display: "flex", gap: 18, color: "#716D65", fontSize: 13, letterSpacing: 1.5 }}>
            <span>{formatPeriod(trace.periodStart, trace.periodEnd)}</span>
            <span>/</span>
            <span>{trace.periodDays} DAYS</span>
          </div>
        </div>

        <div style={{ display: "flex", flex: 1, gap: 60, paddingTop: 42 }}>
          <div style={{ display: "flex", width: "62%", flexDirection: "column" }}>
            <div style={{ display: "flex", color: "#716D65", fontSize: 15, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase" }}>
              {trace.repository.fullName}
            </div>
            <div style={{ display: "flex", marginTop: 19, fontSize: 55, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.02 }}>
              {trace.analysis.headline}
            </div>
          </div>

          <div style={{ display: "flex", width: "32%", flexDirection: "column", borderTop: "2px solid #11110F" }}>
            {trace.analysis.highlights.slice(0, 3).map((highlight, index) => (
              <div key={highlight.title} style={{ display: "flex", gap: 18, padding: "16px 0", borderBottom: "1px solid #D8D1C4" }}>
                <span style={{ color: "#716D65", fontSize: 12, fontWeight: 700 }}>{String(index + 1).padStart(2, "0")}</span>
                <span style={{ maxHeight: 48, overflow: "hidden", fontSize: 16, fontWeight: 600, lineHeight: 1.25 }}>{highlight.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", minHeight: 84, alignItems: "center", borderTop: "2px solid #11110F" }}>
          <div style={{ display: "flex", gap: 43, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: 25 }}>{trace.totalCommits}{trace.totalCommitsCapped ? "+" : ""}</strong>
              <span style={{ color: "#716D65", fontSize: 10, fontWeight: 700, letterSpacing: 1.5 }}>COMMITS</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: 25 }}>{String(trace.activeDays).padStart(2, "0")}</strong>
              <span style={{ color: "#716D65", fontSize: 10, fontWeight: 700, letterSpacing: 1.5 }}>ACTIVE DAYS</span>
            </div>
            <div style={{ display: "flex", padding: "10px 13px", background: "#D7FF45", fontSize: 12, fontWeight: 800, letterSpacing: 1 }}>
              {trace.analysis.statusLabel}
            </div>
          </div>
          <div style={{ display: "flex", marginLeft: "auto", maxWidth: 490, overflow: "hidden", color: "#716D65", fontSize: 11, fontWeight: 600, letterSpacing: 0.5, whiteSpace: "nowrap" }}>
            {displayUrl(trace.slug)}
          </div>
        </div>
      </div>
    ),
    {
      ...imageSize,
      headers: { "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" },
    },
  );
}
