import { create } from 'zustand'
import type { GraphNode, GraphEdge } from "../types"
import { applyLayout } from '../utils/layout'

interface DiagState {
  note: string
  nodes: GraphNode[]
  edges: GraphEdge[]
  isLoading: boolean
  error: string | null
  setNote: (note: string) => void
  setGraph: (graph: { nodes: GraphNode[]; edges: GraphEdge[] }) => void
  setLoading: (loading: boolean) => void
  setError: (err: string | null) => void
}

export const useDiagStore = create<DiagState>((set) => ({
  note: '',
  nodes: [],
  edges: [],
  isLoading: false,
  error: null,
  setNote: (note) => set({ note }),
  setGraph: (graph) => set(() => applyLayout(graph.nodes, graph.edges)),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))
