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

  const stylesheet = [
    {
      selector: 'node',
      style: {
        label: 'data(label)',
        'text-wrap': 'wrap',
        'text-max-width': 160,
        'background-color': '#2e3138',
        color: '#f8f8f2',
        'border-width': 2,
        'border-color': '#5c5f70',
        'font-size': 11,
        'text-outline-color': '#2e3138',
        'text-outline-width': 2,
        'shadow-blur': 6,
        'shadow-color': '#000',
        'shadow-opacity': 0.2,
        'shadow-offset-x': 0,
        'shadow-offset-y': 2
      }
    },
    {
      selector: 'node.diagnosis',
      style: {
        'background-color': '#7aa2f7',
        'border-color': '#7aa2f7'
      }
    },
    {
      selector: 'node.differential',
      style: {
        'background-color': '#bb9af7',
        'border-color': '#bb9af7'
      }
    },
    {
      selector: 'node.action',
      style: {
        'background-color': '#2ac3de',
        'border-color': '#2ac3de'
      }
    },
    {
      selector: 'node.completed',
      style: {
        'background-color': '#6e738d',
        'border-color': '#6e738d'
      }
    },
    {
      selector: 'edge',
      style: {
        width: 2,
        'line-color': '#5c5f70',
        'target-arrow-color': '#5c5f70',
        'target-arrow-shape': 'triangle',
        label: 'data(label)',
        color: '#c0c0c0',
        'font-size': 9,
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
    <div className="flex-1 bg-[#1e1e2e] relative" style={{ height: '80vh', width: '100%' }}>
      <CytoscapeComponent
        elements={elements}
        stylesheet={stylesheet}
        layout={layout}
        cy={handleCy}
        style={{ width: '100%', height: '100%' }}
      />
      {selected && (
        <div className="absolute top-4 right-4 bg-[#272b33] text-gray-100 rounded-lg shadow-lg border border-gray-700 p-4 max-w-xs text-sm">
          <h3 className="font-semibold mb-2">{selected.label}</h3>
          {selected.details && <p className="mb-2">{selected.details}</p>}
          {selected.confidence && (
            <p className="text-green-400">Confidence: {Math.round(selected.confidence * 100)}%</p>
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
