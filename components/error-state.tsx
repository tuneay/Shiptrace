"use client";

import Link from "next/link";

export function ErrorState({ reset }: { reset: () => void }) {
  return (
    <main className="shell grid min-h-screen grid-rows-[100px_1fr] py-[30px]">
      <Link className="wordmark focus-ring" href="/">SHIPTRACE<span className="wordmark-dot" aria-hidden="true" /></Link>
      <div className="flex max-w-[840px] flex-col items-start justify-center pb-[50px]">
        <p className="eyebrow"><span aria-hidden="true" /> SOMETHING WENT WRONG</p>
        <h1 className="my-[30px] text-[clamp(46px,6vw,76px)] font-semibold leading-[0.98] tracking-[-0.06em]">We could not show this trace.</h1>
        <p className="mb-[35px] max-w-[600px] text-lg leading-[1.6] text-muted">The public data is unchanged. Try loading the page again, or return to Shiptrace and create a new trace.</p>
        <button className="button focus-ring" type="button" onClick={reset}>Try again <span aria-hidden="true">↻</span></button>
      </div>
    </main>
  );
}
