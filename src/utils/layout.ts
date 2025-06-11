import dagre from 'dagre'
import type { GraphNode, GraphEdge } from '../types'

export function applyLayout(nodes: GraphNode[], edges: GraphEdge[]) {
  const g = new dagre.graphlib.Graph()
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: 'LR' })

  nodes.forEach((node) => {
    g.setNode(node.id, { width: 172, height: 36 })
  })
  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target)
  })

  dagre.layout(g)

  const layouted = nodes.map((node) => {
    const pos = g.node(node.id)
    return { ...node, position: { x: pos.x, y: pos.y } }
  })

  return { nodes: layouted, edges }
}
