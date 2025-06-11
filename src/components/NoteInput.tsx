import React, { useState } from 'react';
import { useDiagStore } from '../store/diagStore';

export function NoteInput() {
  const { note, setNote, analyzeNote, isLoading, error } = useDiagStore();
  const [localNote, setLocalNote] = useState(note);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNote(localNote);
    await analyzeNote(localNote);
  };

  const sampleNote = `Patient presents with 3-day history of progressive shortness of breath and bilateral lower extremity swelling. Physical exam reveals bilateral crackles, elevated JVP, and 2+ pitting edema. Vital signs: BP 160/90, HR 110, RR 22, O2 sat 88% on room air.`;

  const loadSampleNote = () => {
    setLocalNote(sampleNote);
    setNote(sampleNote);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Clinical Note Analysis
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="clinical-note" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter Clinical Note:
            </label>
            <textarea
              id="clinical-note"
              value={localNote}
              onChange={(e) => setLocalNote(e.target.value)}
              placeholder="Enter patient presentation, history, physical exam findings..."
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading || !localNote.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Analyzing...
                </>
              ) : (
                'Analyze Note'
              )}
            </button>

            <button
              type="button"
              onClick={loadSampleNote}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Load Sample
            </button>

            {localNote && (
              <button
                type="button"
                onClick={() => setLocalNote('')}
                disabled={isLoading}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="text-xs text-gray-500">
            <p>
              <strong>Tip:</strong> Include patient presentation, symptoms, physical exam findings, 
              and any relevant history for the most accurate analysis.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}