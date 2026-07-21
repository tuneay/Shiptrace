import Link from "next/link";

export default function TraceNotFound() {
  return (
    <main className="not-found-page shell">
      <Link className="wordmark focus-ring" href="/">SHIPTRACE<span className="wordmark-dot" aria-hidden="true" /></Link>
      <div>
        <p className="eyebrow"><span aria-hidden="true" /> TRACE NOT FOUND</p>
        <h1>This trace does not exist or is no longer available.</h1>
        <p>The link may be incomplete. Create a new proof of progress from any public GitHub repository.</p>
        <Link className="button focus-ring" href="/#generate">Generate a trace <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
