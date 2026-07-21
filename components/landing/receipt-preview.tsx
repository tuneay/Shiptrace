const receiptItems = [
  "Onboarding flow completed",
  "Ranking API introduced",
  "Data model refined",
] as const;

export function ReceiptPreview() {
  return (
    <article className="receipt-card">
      <header className="receipt-header">
        <span>SHIPTRACE / PROOF</span>
        <span>NO. 8F3A21</span>
      </header>
      <div className="receipt-rule" aria-hidden="true" />
      <dl className="receipt-data">
        <div><dt>PROJECT</dt><dd>UPVERA</dd></div>
        <div><dt>PERIOD</dt><dd>JUL 14—21</dd></div>
        <div><dt>COMMITS</dt><dd>24</dd></div>
        <div><dt>ACTIVE DAYS</dt><dd>06</dd></div>
        <div><dt>CONTRIBUTORS</dt><dd>02</dd></div>
      </dl>
      <div className="receipt-rule" aria-hidden="true" />
      <div className="receipt-status"><span>STATUS</span><strong>BUILDING</strong></div>
      <div className="receipt-rule" aria-hidden="true" />
      <ol className="receipt-items">
        {receiptItems.map((item, index) => (
          <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
        ))}
      </ol>
      <footer className="receipt-footer">
        <span>VERIFIED ACTIVITY</span>
        <span className="receipt-bars" aria-hidden="true" />
      </footer>
    </article>
  );
}
