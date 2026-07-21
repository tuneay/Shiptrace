import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ChangeGroups } from "@/components/trace/change-groups";
import { CommitList } from "@/components/trace/commit-list";
import { GeneratedReceipt } from "@/components/trace/receipt-card";
import { Highlights } from "@/components/trace/highlights";
import { MetricStrip } from "@/components/trace/metric-strip";
import { SharePanel } from "@/components/trace/share-panel";
import { TraceHeader } from "@/components/trace/trace-header";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { getTraceBySlug } from "@/lib/persistence/store";

type TracePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: TracePageProps): Promise<Metadata> {
  const { slug } = await params;
  const trace = await getTraceBySlug(slug);
  if (!trace) notFound();

  const title = `${trace.repository.name} shipped ${trace.totalCommits}${trace.totalCommitsCapped ? "+" : ""} commits — Shiptrace`;
  const description = `See what ${trace.repository.name} built during its latest ${trace.periodDays}-day trace.`;
  const image = `/api/og/${trace.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/t/${trace.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/t/${trace.slug}`,
      images: [{ url: image, width: 1200, height: 630, alt: `${trace.repository.name} proof of progress` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function TracePage({ params }: TracePageProps) {
  const { slug } = await params;
  const trace = await getTraceBySlug(slug);
  if (!trace) notFound();

  return (
    <main className="trace-page">
      <nav className="shell trace-nav" aria-label="Primary navigation">
        <Link className="wordmark focus-ring" href="/" aria-label="Shiptrace home">SHIPTRACE<span className="wordmark-dot" aria-hidden="true" /></Link>
        <Link className="nav-link focus-ring" href="/#generate">Generate your trace</Link>
      </nav>

      <TraceHeader trace={trace} />
      <MetricStrip trace={trace} />

      <section className="proof-detail shell">
        <GeneratedReceipt trace={trace} />
        <Highlights trace={trace} />
      </section>

      <ChangeGroups groups={trace.analysis.changeGroups} commits={trace.commits} />
      <CommitList commits={trace.commits} />
      <SharePanel trace={trace} />

      <section className="trace-footer-cta shell">
        <p className="eyebrow"><span aria-hidden="true" /> BUILDING SOMETHING TOO?</p>
        <h2>Turn your recent commits into a proof of progress.</h2>
        <Link className="button focus-ring" href="/#generate">Generate your own trace <span aria-hidden="true">↗</span></Link>
      </section>

      <footer className="shell footer trace-footer">
        <span className="wordmark">SHIPTRACE<span className="wordmark-dot" aria-hidden="true" /></span>
        <p>Turn commits into proof of progress.</p>
        <p className="footer-copy">PUBLIC TRACE / {trace.slug.slice(-5).toUpperCase()}</p>
      </footer>

      <RevealOnScroll />
    </main>
  );
}
