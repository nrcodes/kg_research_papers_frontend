export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} PaperKG — Research Paper Knowledge
            Graph
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Data from{" "}
            <a
              href="https://openalex.org"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              OpenAlex
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
