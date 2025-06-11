import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from '@xyflow/react';
import type { Connection } from '@xyflow/react';
import { useDiagStore } from '../store/diagStore';
import { DiagnosisNode } from './nodes/DiagnosisNode';

const nodeTypes = {
  default: DiagnosisNode,
};

export function GraphBoard() {
  const { graph } = useDiagStore();
  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.edges || []);

  // Update nodes and edges when graph data changes
  useEffect(() => {
    if (graph.nodes.length > 0) {
      setNodes(graph.nodes);
      setEdges(graph.edges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [graph, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
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
        nodeTypes={nodeTypes}
        fitView
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
        />
        <MiniMap 
          position="bottom-right"
          nodeStrokeWidth={3}
        />
      </ReactFlow>
    </div>
  );
}