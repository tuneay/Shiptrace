export default function TraceLoading() {
  return (
    <main className="trace-loading shell" aria-label="Loading trace">
      <div className="skeleton skeleton-nav" />
      <div className="skeleton skeleton-label" />
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-headline" />
      <div className="skeleton skeleton-summary" />
      <div className="skeleton skeleton-metrics" />
      <span className="sr-only">Loading trace</span>
    </main>
  );
}
