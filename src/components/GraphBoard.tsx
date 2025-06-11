import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  BackgroundVariant,
} from '@xyflow/react';
import { useDiagStore } from '../store/diagStore';
import { DiagnosisNode } from './nodes/DiagnosisNode';
import { getLayoutedElements } from '../utils/layout';

const nodeTypes = {
  default: DiagnosisNode,
};

export function GraphBoard() {
  const { graph } = useDiagStore();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Update nodes and edges when graph data changes
  useEffect(() => {
    if (graph.nodes.length > 0) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        graph.nodes,
        graph.edges
      );
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [graph, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      setEdges((els) => els.map((el) => (el.id === oldEdge.id ? { ...el, ...newConnection } : el))),
    [setEdges]
  );

  // Show empty state if no graph data
  if (graph.nodes.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🩺</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Ready to Analyze
          </h3>
          <p className="text-gray-500 max-w-md">
            Enter a clinical note above to generate an interactive diagnosis workflow with 
            visual connections between findings, diagnoses, and recommended actions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="top-right"
        className="bg-gray-50"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={12} 
          size={1} 
          color="#cbd5e1"
        />
        <Controls 
          position="top-left"
          className="bg-white shadow-lg rounded-lg"
        />
        <MiniMap 
          position="bottom-right"
          nodeStrokeWidth={3}
          className="bg-white shadow-lg rounded-lg"
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
}