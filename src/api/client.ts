import axios from "axios";
import type { PaperSummary, PaperDetail, GraphData } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

export async function listPapers(
  limit = 20,
  offset = 0,
): Promise<PaperSummary[]> {
  const { data } = await api.get("/papers", { params: { limit, offset } });
  return data;
}

export async function searchPapers(
  q: string,
  limit = 20,
): Promise<PaperSummary[]> {
  const { data } = await api.get("/papers/search", { params: { q, limit } });
  return data;
}

export async function getPaper(id: string): Promise<PaperDetail> {
  const { data } = await api.get(`/papers/${id}`);
  return data;
}

export async function getGraph(id: string, depth = 1): Promise<GraphData> {
  const { data } = await api.get(`/graph/${id}`, { params: { depth } });
  return data;
}
