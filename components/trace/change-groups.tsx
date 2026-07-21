import type { ChangeGroup as ChangeGroupType } from "@/types/analysis";
import type { NormalizedCommit } from "@/types/github";

function relatedCommits(group: ChangeGroupType, commits: NormalizedCommit[]) {
  const shas = new Set(group.commitShas);
  return commits.filter((commit) => shas.has(commit.sha) || shas.has(commit.shortSha));
}

function ChangeGroup({ group, commits }: { group: ChangeGroupType; commits: NormalizedCommit[] }) {
  const sources = relatedCommits(group, commits);
  return (
    <article className="change-group" data-reveal>
      <div className="change-meta">
        <span>{group.category.toUpperCase()}</span>
        <span>{String(sources.length).padStart(2, "0")} {sources.length === 1 ? "COMMIT" : "COMMITS"}</span>
      </div>
      <h3>{group.title}</h3>
      <p>{group.summary}</p>
      <details>
        <summary>View source commits <span aria-hidden="true">+</span></summary>
        <ul>
          {sources.map((commit) => (
            <li key={commit.sha}>
              <a href={commit.url} target="_blank" rel="noreferrer">
                <code>{commit.shortSha}</code><span>{commit.message}</span><b aria-hidden="true">↗</b>
              </a>
            </li>
          ))}
        </ul>
      </details>
    </article>
  );
}

export function ChangeGroups({ groups, commits }: { groups: ChangeGroupType[]; commits: NormalizedCommit[] }) {
  return (
    <section className="change-log shell" aria-labelledby="change-log-title">
      <div className="change-log-heading" data-reveal>
        <p className="eyebrow"><span aria-hidden="true" /> CHANGE LOG</p>
        <h2 id="change-log-title">The work behind the story.</h2>
      </div>
      <div className="change-groups">
        {groups.map((group, index) => <ChangeGroup key={`${group.category}-${index}`} group={group} commits={commits} />)}
      </div>
    </section>
  );
}
