import React from 'react';
import { NoteInput } from './components/NoteInput';
import { GraphBoard } from './components/GraphBoard';
import { Legend } from './components/Legend';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🩺</div>
              <h1 className="text-2xl font-bold text-gray-900">
                Diagnosis-Space
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              AI-Powered Clinical Reasoning Visualization
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Note Input Section */}
          <NoteInput />

          {/* Graph and Legend Layout */}
          <div className="flex gap-6 h-96">
            {/* Graph Board */}
            <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
              <GraphBoard />
            </div>

            {/* Legend Sidebar */}
            <div className="w-80">
              <Legend />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-gray-500">
            <p>
              Built with React Flow • Powered by AI • For Medical Education & Research
            </p>
            <p className="mt-1">
              <strong>Note:</strong> This is a prototype for educational purposes. 
              Not intended for actual clinical diagnosis.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;