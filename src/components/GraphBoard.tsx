import { useEffect, useRef } from 'react';
import { Network } from 'vis-network/peer';
import 'vis-network/styles/vis-network.css';
import { useDiagStore } from '../store/diagStore';

export function GraphBoard() {
  const { graph } = useDiagStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  const testNodes = [
    {
      id: 'test-1',
      position: { x: 100, y: 100 },
      data: {
        label: 'Test Node 1',
        type: 'diagnosis' as const,
        confidence: 0.9,
        details: 'This is a test node',
      },
    },
    {
      id: 'test-2',
      position: { x: 400, y: 100 },
      data: {
        label: 'Test Node 2',
        type: 'action' as const,
        priority: 'high' as const,
        details: 'This is another test node',
      },
    },
  ];

  const showEmptyMessage = graph.nodes.length === 0;

  useEffect(() => {
    if (!containerRef.current) return;

    const displayNodes = (graph.nodes.length > 0 ? graph.nodes : testNodes).map((n) => ({
      id: n.id,
      label: n.data.label,
      group: n.data.type,
      title: n.data.details,
      x: n.position?.x,
      y: n.position?.y,
    }));

    const displayEdges = (graph.nodes.length > 0 ? graph.edges : []).map((e) => ({
      id: e.id,
      from: e.source,
      to: e.target,
      label: e.label,
      arrows: 'to',
    }));

    const data = { nodes: displayNodes, edges: displayEdges };
    const options = {
      nodes: {
        shape: 'box',
        margin: 10,
        font: { size: 14 },
      },
      layout: { improvedLayout: true },
      physics: { stabilization: true },
      edges: { arrows: { to: { enabled: true } } },
    };

    if (networkRef.current) {
      networkRef.current.setData(data);
    } else {
      networkRef.current = new Network(containerRef.current, data, options);
    }

    return () => {
      networkRef.current?.destroy();
      networkRef.current = null;
    };
  }, [graph]);

  return (
    <div className="flex-1 bg-gray-50" style={{ height: '80vh', width: '100%' }}>
      {showEmptyMessage && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="bg-white/90 rounded-lg p-6 text-center shadow-lg">
            <div className="text-4xl mb-3">🩺</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Ready to Analyze</h3>
            <p className="text-gray-500 text-sm max-w-sm">
              Enter a clinical note above to generate a diagnosis workflow. Test nodes are visible below.
            </p>
          </div>
        </div>
      )}
      <div ref={containerRef} style={{ height: '100%' }} />
    </div>
  );
}
