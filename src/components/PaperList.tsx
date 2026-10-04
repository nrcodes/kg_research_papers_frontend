import type { PaperSummary } from "../types";

interface Props {
  papers: PaperSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function PaperList({ papers, selectedId, onSelect }: Props) {
  if (papers.length === 0) {
    return (
      <p className="text-slate-600 dark:text-slate-400 text-sm italic">
        No papers found.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {papers.map((p) => (
        <li key={p.id}>
          <button
            onClick={() => onSelect(p.id)}
            className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
              selectedId === p.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400"
            }`}
          >
            <p className="font-medium text-sm text-slate-900 dark:text-slate-100 line-clamp-2">
              {p.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {p.year ?? "n/a"} · {p.cited_by_count} citations
            </p>
          </button>
        </li>
      ))}
    </ul>
  );
}
