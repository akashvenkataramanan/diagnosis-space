import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DiagnosisState } from '../types';
import { analyzeWithOpenAI } from '../utils/openai';

export const useDiagStore = create<DiagnosisState>()(
  persist(
    (set, get) => ({
      note: '',
      graph: { nodes: [], edges: [] },
      isLoading: false,
      error: null,
      apiKey: '',
      
      setNote: (note: string) => set({ note }),
      
      setGraph: (graph) => set({ graph }),
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      
      setError: (error: string | null) => set({ error }),
      
      setApiKey: (apiKey: string) => set({ apiKey }),
      
      analyzeNote: async (note: string) => {
        const { setLoading, setError, setGraph, apiKey } = get();
        
        if (!note.trim()) {
          setError('Please enter a clinical note to analyze');
          return;
        }
        
        if (!apiKey.trim()) {
          setError('Please enter your OpenAI API key first');
          return;
        }
        
        try {
          setLoading(true);
          setError(null);
          
          // Use real OpenAI API
          const result = await analyzeWithOpenAI(note, apiKey);
          setGraph(result);
          
        } catch (error) {
          console.error('Analysis error:', error);
          setError(error instanceof Error ? error.message : 'Failed to analyze note');
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'diagnosis-storage',
      // Only persist the API key, not the sensitive clinical data
      partialize: (state) => ({ apiKey: state.apiKey }),
    }
  )
);