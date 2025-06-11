import { create } from 'zustand';
import { DiagnosisState, DiagnosisNode, DiagnosisEdge } from '../types';

// Mock API call for now - will be replaced with real backend
const mockAnalyzeNote = async (note: string): Promise<{ nodes: DiagnosisNode[]; edges: DiagnosisEdge[] }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock response based on common medical scenarios
  const mockNodes: DiagnosisNode[] = [
    {
      id: 'chf',
      type: 'default',
      position: { x: 100, y: 100 },
      data: {
        label: 'Acute CHF',
        type: 'diagnosis',
        confidence: 0.85,
        evidence: ['SOB', 'Bilateral crackles', 'Elevated JVP']
      }
    },
    {
      id: 'pneumonia',
      type: 'default',
      position: { x: 100, y: 200 },
      data: {
        label: 'Pneumonia',
        type: 'differential',
        confidence: 0.65,
        evidence: ['Fever', 'Cough', 'CXR findings']
      }
    },
    {
      id: 'bnp',
      type: 'default',
      position: { x: 400, y: 100 },
      data: {
        label: 'Order BNP',
        type: 'action',
        details: 'To help differentiate CHF from other causes'
      }
    },
    {
      id: 'cxr',
      type: 'default',
      position: { x: 400, y: 200 },
      data: {
        label: 'Chest X-ray',
        type: 'action',
        details: 'Evaluate for pulmonary edema vs consolidation'
      }
    },
    {
      id: 'echo',
      type: 'default',
      position: { x: 400, y: 300 },
      data: {
        label: 'Echocardiogram',
        type: 'action',
        details: 'Assess cardiac function and structure'
      }
    }
  ];

  const mockEdges: DiagnosisEdge[] = [
    {
      id: 'e1',
      source: 'chf',
      target: 'bnp',
      label: 'next-step',
      type: 'next-step'
    },
    {
      id: 'e2',
      source: 'chf',
      target: 'echo',
      label: 'next-step',
      type: 'next-step'
    },
    {
      id: 'e3',
      source: 'pneumonia',
      target: 'cxr',
      label: 'next-step',
      type: 'next-step'
    }
  ];

  return { nodes: mockNodes, edges: mockEdges };
};

export const useDiagStore = create<DiagnosisState>()((set, get) => ({
  note: '',
  graph: { nodes: [], edges: [] },
  isLoading: false,
  error: null,
  
  setNote: (note: string) => set({ note }),
  
  setGraph: (graph) => set({ graph }),
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  setError: (error: string | null) => set({ error }),
  
  analyzeNote: async (note: string) => {
    const { setLoading, setError, setGraph } = get();
    
    if (!note.trim()) {
      setError('Please enter a clinical note to analyze');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // For now, use mock data - will be replaced with real API call
      const result = await mockAnalyzeNote(note);
      setGraph(result);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to analyze note');
    } finally {
      setLoading(false);
    }
  }
}));