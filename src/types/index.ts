import type { Node, Edge } from '@xyflow/react'

export interface GraphNode extends Node {
  type: 'diagnosis' | 'differential' | 'action' | 'completed'
  data: { label: string }
}

export type GraphEdge = Edge
