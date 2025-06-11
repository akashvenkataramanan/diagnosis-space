import type { GraphNode, GraphEdge } from "../types"
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
})

export interface AnalyzeResponse {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export async function analyzeNote(note: string): Promise<AnalyzeResponse> {
  const res = await api.post('/analyze', { note })
  return res.data
}

export default api
