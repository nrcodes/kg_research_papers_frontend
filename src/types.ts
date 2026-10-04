export interface PaperSummary {
  id: string;
  title: string;
  year: number | null;
  cited_by_count: number;
}

export interface PaperDetail {
  id: string;
  title: string;
  year: number | null;
  doi: string | null;
  cited_by_count: number;
  authors: { id: string; name: string }[];
  topics: { id: string; name: string }[];
  references: { id: string; title: string }[];
}

export interface GraphNode {
  id: string;
  label: string;
  group: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphEdge[];
}
