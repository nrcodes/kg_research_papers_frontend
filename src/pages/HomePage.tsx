import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
        Research Paper Knowledge Graph
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
        Explore 17,000+ papers, their authors, topics, and citation networks
        through an interactive graph.
      </p>
      <Link
        to="/explore"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Start Exploring →
      </Link>
    </div>
  );
}
