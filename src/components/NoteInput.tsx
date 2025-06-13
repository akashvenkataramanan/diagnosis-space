import React, { useState } from 'react';
import { useDiagStore } from '../store/diagStore';
import { ApiKeyInput } from './ApiKeyInput';

export function NoteInput() {
  const { note, setNote, analyzeNote, isLoading, error, apiKey, setApiKey } = useDiagStore();
  const [localNote, setLocalNote] = useState(note);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNote(localNote);
    await analyzeNote(localNote);
  };

  const sampleNote = `67-year-old male presents to ED with 3-day history of progressive dyspnea and bilateral lower extremity swelling. Patient reports orthopnea and paroxysmal nocturnal dyspnea. Past medical history significant for hypertension and diabetes mellitus type 2. 

Physical Examination:
- Vital Signs: BP 160/90, HR 110 bpm, RR 22, O2 sat 88% on room air, Temp 98.6°F
- General: Appears uncomfortable, sitting upright
- Cardiovascular: S3 gallop present, elevated JVP to 12 cm
- Pulmonary: Bilateral basilar crackles extending to mid-lung fields
- Extremities: 2+ pitting edema bilateral lower extremities to knees
- No chest pain reported`;

  const loadSampleNote = () => {
    setLocalNote(sampleNote);
    setNote(sampleNote);
  };

  return (
    <div className="space-y-4">
      {/* API Key Input */}
      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
        <ApiKeyInput 
          onApiKeySet={setApiKey} 
          hasApiKey={!!apiKey} 
        />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="clinical-note" 
            className="block text-base font-medium text-gray-900 mb-2 flex items-center gap-2"
          >
            <span className="text-lg">📝</span>
            Clinical Presentation
          </label>
          <div className="relative">
            <textarea
              id="clinical-note"
              value={localNote}
              onChange={(e) => setLocalNote(e.target.value)}
              placeholder="Describe the patient's presentation, history, physical exam findings, vital signs, and any relevant clinical context..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none bg-white shadow-sm text-gray-900 placeholder-gray-500 transition-all duration-200"
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                  <span className="font-medium">AI analyzing clinical data...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 flex-wrap items-center">
          <button
            type="submit"
            disabled={isLoading || !localNote.trim() || !apiKey}
            className="px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-sm transition-all duration-200"
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Generating Workflow...
              </>
            ) : (
              <>
                <span className="text-base">🧠</span>
                Generate AI Analysis
              </>
            )}
          </button>

          <button
            type="button"
            onClick={loadSampleNote}
            disabled={isLoading}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed font-medium transition-all duration-200"
          >
            💼 Load Sample Case
          </button>

          {localNote && (
            <button
              type="button"
              onClick={() => setLocalNote('')}
              disabled={isLoading}
              className="px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:bg-gray-50 disabled:cursor-not-allowed font-medium transition-all duration-200"
            >
              🗑️ Clear
            </button>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-base">⚠️</span>
              <p className="text-red-700 font-medium text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-start gap-3">
            <span className="text-lg">✨</span>
            <div>
              <p className="font-medium text-gray-900 mb-2">
                AI-Powered Clinical Reasoning Engine
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>Primary & differential diagnoses</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Prioritized clinical actions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Evidence-based reasoning</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Interactive relationship mapping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}