import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import type { Core } from 'cytoscape';
import { useEffect, useState } from 'react';
import { useDiagStore } from '../store/diagStore';
import type { DiagnosisNode, DiagnosisEdge } from '../types';

interface SelectedInfo {
  id: string;
  label: string;
  details?: string;
  confidence?: number;
  priority?: string;
  evidence?: string[];
  category?: string;
  timing?: string;
  type: string;
}

export function GraphBoard() {
  const { graph } = useDiagStore();
  const [elements, setElements] = useState<cytoscape.ElementDefinition[]>([]);
  const [selected, setSelected] = useState<SelectedInfo | null>(null);

  const testNodes: DiagnosisNode[] = [
    {
      id: 'test-1',
      position: { x: 100, y: 100 },
      data: {
        label: 'Test Node 1',
        type: 'diagnosis',
        confidence: 0.9,
        details: 'This is a test node'
      }
    },
    {
      id: 'test-2',
      position: { x: 300, y: 100 },
      data: {
        label: 'Test Node 2',
        type: 'action',
        priority: 'high',
        details: 'This is another test node'
      }
    }
  ];

  const testEdges: DiagnosisEdge[] = [
    { id: 'e1', source: 'test-1', target: 'test-2', label: '' }
  ];

  useEffect(() => {
    const nodes = (graph.nodes.length > 0 ? graph.nodes : testNodes).map((n) => ({
      data: {
        id: n.id,
        ...n.data,
      },
      position: n.position,
      selectable: true,
      classes: n.data.type
    }));

    const edges = (graph.nodes.length > 0 ? graph.edges : testEdges).map((e) => ({
      data: {
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label
      }
    }));

    setElements([...nodes, ...edges]);
  }, [graph]);

  const stylesheet: Array<import('cytoscape').Stylesheet> = [
    {
      selector: 'node',
      style: {
        label: 'data(label)',
        'text-wrap': 'wrap',
        'text-max-width': 140,
        'background-color': '#f3f4f6',
        'border-width': 3,
        'border-color': '#94a3b8',
        'font-size': 10
      }
    },
    {
      selector: 'node.diagnosis',
      style: {
        'background-color': '#ffedd5',
        'border-color': '#fb923c'
      }
    },
    {
      selector: 'node.differential',
      style: {
        'background-color': '#dbeafe',
        'border-color': '#60a5fa'
      }
    },
    {
      selector: 'node.action',
      style: {
        'background-color': '#fef9c3',
        'border-color': '#facc15'
      }
    },
    {
      selector: 'node.completed',
      style: {
        'background-color': '#e5e7eb',
        'border-color': '#9ca3af'
      }
    },
    {
      selector: 'edge',
      style: {
        width: 2,
        'line-color': '#94a3b8',
        'target-arrow-color': '#94a3b8',
        'target-arrow-shape': 'triangle',
        label: 'data(label)',
        'font-size': 8,
        'curve-style': 'bezier'
      }
    }
  ];

  const layout = { name: 'preset', fit: true, padding: 30 };

  const handleCy = (cy: Core) => {
    cy.on('tap', 'node', (evt) => {
      const d = evt.target.data() as SelectedInfo;
      setSelected(d);
    });
  };

  return (
    <div className="flex-1 bg-gray-50 relative" style={{ height: '80vh', width: '100%' }}>
      <CytoscapeComponent
        elements={elements}
        stylesheet={stylesheet}
        layout={layout}
        cy={handleCy}
        style={{ width: '100%', height: '100%' }}
      />
      {selected && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border p-4 max-w-xs text-sm">
          <h3 className="font-semibold mb-2">{selected.label}</h3>
          {selected.details && <p className="mb-2">{selected.details}</p>}
          {selected.confidence && (
            <p className="text-green-700">Confidence: {Math.round(selected.confidence * 100)}%</p>
          )}
          {selected.priority && <p>Priority: {selected.priority}</p>}
          {selected.evidence && selected.evidence.length > 0 && (
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {selected.evidence.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
