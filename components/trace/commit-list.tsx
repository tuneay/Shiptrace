import type { NormalizedCommit } from "@/types/github";

export function CommitList({ commits }: { commits: NormalizedCommit[] }) {
  return (
    <section className="source-commits shell" aria-labelledby="source-commits-title">
      <div data-reveal>
        <p className="eyebrow"><span aria-hidden="true" /> SOURCE COMMITS</p>
        <h2 id="source-commits-title">Every claim has a trail.</h2>
      </div>
      <details>
        <summary>Browse all {commits.length} commits <span aria-hidden="true">+</span></summary>
        <ul>
          {commits.map((commit) => (
            <li key={commit.sha}>
              <a href={commit.url} target="_blank" rel="noreferrer">
                <code>{commit.shortSha}</code>
                <span>{commit.message}</span>
                {commit.isLikelyNoise ? <small>MAINTENANCE</small> : null}
                <b aria-hidden="true">↗</b>
              </a>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
