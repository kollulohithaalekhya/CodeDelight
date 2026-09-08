import React from "react";

// Compact numbered pager with prev/next and ellipsis for long ranges.
// Renders nothing when there's a single page.
export default function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;

  const nums = [];
  const w = 1; // pages to show on each side of the current page
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || (p >= page - w && p <= page + w)) {
      nums.push(p);
    } else if (nums[nums.length - 1] !== "…") {
      nums.push("…");
    }
  }

  const go = (p) => {
    const next = Math.min(Math.max(1, p), pageCount);
    if (next !== page) onChange(next);
  };

  return (
    <nav className="pg" aria-label="Pagination">
      <button className="pg-btn" onClick={() => go(page - 1)} disabled={page === 1} aria-label="Previous page">
        <i className="fa-solid fa-chevron-left" />
      </button>
      {nums.map((n, i) =>
        n === "…" ? (
          <span key={`e${i}`} className="pg-ellipsis">…</span>
        ) : (
          <button
            key={n}
            className={`pg-num ${n === page ? "active" : ""}`}
            onClick={() => go(n)}
            aria-current={n === page ? "page" : undefined}
          >
            {n}
          </button>
        )
      )}
      <button className="pg-btn" onClick={() => go(page + 1)} disabled={page === pageCount} aria-label="Next page">
        <i className="fa-solid fa-chevron-right" />
      </button>
    </nav>
  );
}
