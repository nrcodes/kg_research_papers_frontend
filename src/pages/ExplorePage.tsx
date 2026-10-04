import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import PaperList from "../components/PaperList";
import PaperDetail from "../components/PaperDetail";
import GraphView from "../components/GraphView";
import { listPapers, searchPapers, getPaper, getGraph } from "../api/client";
import type {
  PaperSummary,
  PaperDetail as PaperDetailType,
  GraphData,
} from "../types";

export default function ExplorePage() {
  const [papers, setPapers] = useState<PaperSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<PaperDetailType | null>(null);
  const [graph, setGraph] = useState<GraphData>({ nodes: [], links: [] });
  const [loading, setLoading] = useState(false);

  // initial list
  useEffect(() => {
    listPapers(20).then(setPapers).catch(console.error);
  }, []);

  const handleSearch = async (q: string) => {
    setLoading(true);
    try {
      const results = await searchPapers(q, 20);
      setPapers(results);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (id: string) => {
    setSelectedId(id);
    setDetail(null);
    setGraph({ nodes: [], links: [] });
    try {
      const [d, g] = await Promise.all([getPaper(id), getGraph(id, 1)]);
      setDetail(d);
      setGraph(g);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Explore Papers
      </h1>

      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: paper list */}
        <aside className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4 max-h-[600px] overflow-y-auto">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              {loading ? "Searching..." : `Results (${papers.length})`}
            </h2>
            <PaperList
              papers={papers}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          </div>
        </aside>

        {/* Right: graph + detail */}
        <section className="lg:col-span-8 space-y-6">
          {graph.nodes.length > 0 ? (
            <GraphView data={graph} onNodeClick={handleSelect} />
          ) : (
            <div className="h-[600px] flex items-center justify-center rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400">
              Select a paper to view its graph
            </div>
          )}

          {detail && <PaperDetail paper={detail} />}
        </section>
      </div>
    </div>
  );
}
