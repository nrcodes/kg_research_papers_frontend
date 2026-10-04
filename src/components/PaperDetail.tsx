import type { PaperDetail as PaperDetailType } from "../types";

export default function PaperDetail({ paper }: { paper: PaperDetailType }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        {paper.title}
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        {paper.year ?? "n/a"} · {paper.cited_by_count} citations
        {paper.doi && (
          <>
            {" · "}
            <a
              href={paper.doi}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              DOI
            </a>
          </>
        )}
      </p>

      <Section title="Authors" items={paper.authors.map((a) => a.name)} />
      <Section title="Topics" items={paper.topics.map((t) => t.name)} />
      <Section
        title={`References (${paper.references.length})`}
        items={paper.references.slice(0, 10).map((r) => r.title || r.id)}
      />
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mb-4">
      <h3 className="text-xs uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400 mb-2">
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
