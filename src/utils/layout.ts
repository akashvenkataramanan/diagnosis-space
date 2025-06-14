import dagre from 'dagre';
import type { DiagnosisNode, DiagnosisEdge } from '../types';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (
  nodes: DiagnosisNode[],
  edges: DiagnosisEdge[],
  direction = 'LR'
) => {
  const nodeWidth = 200;
  const nodeHeight = 80;

  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: layoutedNodes, edges };
};