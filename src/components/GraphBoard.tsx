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

  // Add test nodes if no graph data
  const testNodes = graph.nodes.length === 0 ? [
    {
      id: 'test-1',
      type: 'default',
      position: { x: 100, y: 100 },
      data: { 
        label: 'Test Node 1', 
        type: 'diagnosis' as const,
        confidence: 0.9,
        details: 'This is a test node'
      }
    },
    {
      id: 'test-2', 
      type: 'default',
      position: { x: 400, y: 100 },
      data: { 
        label: 'Test Node 2', 
        type: 'action' as const,
        priority: 'high' as const,
        details: 'This is another test node'
      }
    }
  ] : [];

  const displayNodes = graph.nodes.length > 0 ? nodes : testNodes;
  
  // Show empty state message but still render React Flow with test nodes
  const showEmptyMessage = graph.nodes.length === 0;

  return (
    <div className="flex-1 bg-gray-50" style={{ height: '80vh', width: '100%' }}>
      {showEmptyMessage && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="bg-white/90 rounded-lg p-6 text-center shadow-lg">
            <div className="text-4xl mb-3">🩺</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Ready to Analyze
            </h3>
            <p className="text-gray-500 text-sm max-w-sm">
              Enter a clinical note above to generate a diagnosis workflow. Test nodes are visible below.
            </p>
          </div>
        </div>
      )}
      <ReactFlow
        nodes={displayNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
          maxZoom: 1.2,
          minZoom: 0.3
        }}
        minZoom={0.1}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        className="bg-gray-50"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={16} 
          size={1} 
          color="#d1d5db"
        />
        <Controls 
          position="top-left"
          showFitView
          showZoom
          showInteractive
        />
        <MiniMap 
          position="bottom-right"
          nodeStrokeWidth={2}
          pannable
          zoomable
          style={{
            backgroundColor: 'white',
            border: '1px solid #d1d5db'
          }}
        />
      </ReactFlow>
    </div>
  );
}