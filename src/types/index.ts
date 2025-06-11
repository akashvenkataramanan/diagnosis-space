import type { Node, Edge } from '@xyflow/react';

export type NodeType = 'diagnosis' | 'differential' | 'action' | 'completed';

export interface DiagnosisNodeData extends Record<string, unknown> {
  label: string;
  type: NodeType;
  details?: string;
  confidence?: number;
  evidence?: string[];
}

export interface DiagnosisNode extends Node<DiagnosisNodeData> {
  data: DiagnosisNodeData;
}

export interface DiagnosisEdge extends Edge {
  label?: string;
  type?: 'next-step' | 'supports' | 'excludes' | 'related';
}

export interface AnalysisResponse {
  nodes: DiagnosisNode[];
  edges: DiagnosisEdge[];
  metadata?: {
    processing_time?: number;
    confidence?: number;
    model_used?: string;
  };
}

export interface DiagnosisState {
  note: string;
  graph: {
    nodes: DiagnosisNode[];
    edges: DiagnosisEdge[];
  };
  isLoading: boolean;
  error: string | null;
  setNote: (note: string) => void;
  setGraph: (graph: { nodes: DiagnosisNode[]; edges: DiagnosisEdge[] }) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  analyzeNote: (note: string) => Promise<void>;
}