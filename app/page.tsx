import Link from "next/link";

import { ReceiptPreview } from "@/components/landing/receipt-preview";
import { TraceForm } from "@/components/landing/trace-form";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";

const steps = [
  ["01", "Paste a repository", "Share a public GitHub repository URL."],
  ["02", "We read recent activity", "Only commit metadata from the period you choose."],
  ["03", "Meaningful work is grouped", "Maintenance noise stays out of the main story."],
  ["04", "Your progress becomes shareable", "Get a public trace and a proof card."],
] as const;

const exampleHighlights = [
  "Project onboarding moved into place",
  "The ranking API foundation was introduced",
  "Authentication and interface reliability improved",
] as const;

export default function Home() {
  return (
    <main>
      <nav className="shell flex h-20 items-center justify-between border-b border-line" aria-label="Primary navigation">
        <Link className="wordmark focus-ring" href="/" aria-label="Shiptrace home">
          SHIPTRACE<span className="wordmark-dot" aria-hidden="true" />
        </Link>
        <div className="flex items-center gap-3 sm:gap-7">
          <a className="nav-link focus-ring hidden sm:inline-flex" href="#example">
            Example trace
          </a>
          <a className="button button-small focus-ring" href="#generate">
            Generate
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>

      <section className="shell hero-grid" id="generate">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true" /> PROOF OF PROGRESS</p>
          <h1>Your commits deserve a better story.</h1>
          <p className="hero-description">
            Paste a public GitHub repository. Shiptrace turns recent development activity into a clear progress report and a shareable proof card.
          </p>
          <TraceForm />
        </div>

        <div className="hero-proof" aria-label="Example Shiptrace receipt">
          <div className="proof-index" aria-hidden="true">TRACE / 001</div>
          <ReceiptPreview />
          <p className="proof-caption">A verified record of what moved forward.</p>
        </div>
      </section>

      <div className="proof-strip" aria-label="Shiptrace process">
        <div className="shell proof-strip-inner">
          <span>REPOSITORY</span><b aria-hidden="true">→</b>
          <span>VERIFIED ACTIVITY</span><b aria-hidden="true">→</b>
          <span>PRODUCT STORY</span><b aria-hidden="true">→</b>
          <span>SHARE</span>
        </div>
      </div>

      <section className="shell section" id="how-it-works">
        <div className="section-heading" data-reveal>
          <p className="eyebrow"><span aria-hidden="true" /> HOW IT WORKS</p>
          <h2>From technical activity to visible progress.</h2>
        </div>
        <ol className="steps-grid">
          {steps.map(([number, title, description]) => (
            <li key={number} className="step-card" data-reveal>
              <span className="step-number">{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="example-section" id="example">
        <div className="shell section">
          <div className="example-heading" data-reveal>
            <div>
              <p className="eyebrow"><span aria-hidden="true" /> EXAMPLE TRACE</p>
              <h2>A week of work, readable in seconds.</h2>
            </div>
            <p>
              Shiptrace filters maintenance noise and turns technical changes into a concise record of what actually moved forward.
            </p>
          </div>

          <article className="example-trace" data-reveal>
            <header className="example-meta">
              <div>
                <span className="data-label">PROJECT</span>
                <p>Upvera</p>
              </div>
              <div>
                <span className="data-label">PERIOD</span>
                <p>JUL 14—21 / 7 DAYS</p>
              </div>
              <span className="status-chip">BUILDING</span>
            </header>
            <div className="example-body">
              <div className="example-story">
                <h3>The ranking foundation and project onboarding flow moved into place.</h3>
                <p>
                  Development focused on completing the first project onboarding path, introducing the ranking API foundation, and refining the underlying data model.
                </p>
                <div className="metric-row">
                  <span><strong>24</strong><small>COMMITS</small></span>
                  <span><strong>06</strong><small>ACTIVE DAYS</small></span>
                  <span><strong>02</strong><small>CONTRIBUTORS</small></span>
                </div>
              </div>
              <ol className="highlight-list">
                {exampleHighlights.map((highlight, index) => (
                  <li key={highlight}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{highlight}</p>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        </div>
      </section>

      <section className="shell final-cta">
        <p className="eyebrow" data-reveal><span aria-hidden="true" /> YOUR NEXT TRACE</p>
        <h2 data-reveal>Your work already happened.<br />Now make it visible.</h2>
        <a className="button focus-ring" href="#generate" data-reveal>Create a trace <span aria-hidden="true">↑</span></a>
      </section>

      <RevealOnScroll />

      <footer className="shell footer">
        <span className="wordmark">SHIPTRACE<span className="wordmark-dot" aria-hidden="true" /></span>
        <p>Turn commits into proof of progress.</p>
        <p className="footer-copy">© {new Date().getFullYear()} SHIPTRACE</p>
      </footer>
    </main>
  );
}
