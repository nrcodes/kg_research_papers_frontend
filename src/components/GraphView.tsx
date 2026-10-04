import { useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import type { GraphData } from "../types";
import { useTheme } from "../context/ThemeContext";

interface Props {
  data: GraphData;
  onNodeClick?: (id: string) => void;
}

const GROUP_COLORS: Record<string, string> = {
  Paper: "#3b82f6",
  Author: "#10b981",
  Institution: "#f59e0b",
  Topic: "#ef4444",
};

export default function GraphView({ data, onNodeClick }: Props) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);

  useEffect(() => {
    // auto-fit graph after data change
    if (graphRef.current) {
      setTimeout(() => graphRef.current?.zoomToFit(400, 40), 300);
    }
  }, [data]);

  const isDark = theme === "dark";
  const bg = isDark ? "#0f172a" : "#ffffff";
  const linkColor = isDark ? "#475569" : "#cbd5e1";
  const textColor = isDark ? "#e2e8f0" : "#1e293b";

  return (
    <div
      ref={containerRef}
      className="w-full h-[600px] rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900"
    >
      <ForceGraph2D
        ref={graphRef}
        graphData={data}
        backgroundColor={bg}
        nodeLabel="label"
        nodeColor={(node: any) => GROUP_COLORS[node.group] || "#94a3b8"}
        nodeRelSize={5}
        linkColor={() => linkColor}
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
        linkLabel="label"
        onNodeClick={(node: any) => onNodeClick?.(node.id)}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.label || node.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = GROUP_COLORS[node.group] || "#94a3b8";
          ctx.beginPath();
          ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI);
          ctx.fill();

          if (globalScale > 1.5) {
            ctx.fillStyle = textColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText(
              label.length > 30 ? label.slice(0, 30) + "…" : label,
              node.x,
              node.y + 6,
            );
          }
        }}
      />
    </div>
  );
}
