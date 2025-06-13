import { NoteInput } from './components/NoteInput';
import { GraphBoard } from './components/GraphBoard';
import { Legend } from './components/Legend';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - True Claude-style */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">🧠</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Diagnosis-Space AI
                </h1>
                <p className="text-gray-500 text-sm">
                  Clinical Reasoning Platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700 text-sm font-medium">AI Ready</span>
              </div>
              <div className="text-gray-500 text-sm">
                Powered by <span className="text-orange-500 font-medium">OpenAI O3</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Left Sidebar - Legend */}
        <aside className="w-96 bg-gray-50 border-r border-gray-200 flex-shrink-0">
          <div className="h-full overflow-y-auto p-6">
            <Legend />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Input Section */}
          <div className="bg-white border-b border-gray-200">
            <div className="p-6">
              <NoteInput />
            </div>
          </div>

          {/* Graph Visualization */}
          <div className="flex-1 relative bg-gray-50">
            <div className="absolute inset-0">
              <GraphBoard />
            </div>
            
            {/* Floating Performance Indicator */}
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-700 text-sm font-medium">Live Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-full mx-auto px-6 py-3">
          <div className="flex items-center justify-between text-gray-500">
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                AI-Powered Clinical Analysis
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                Interactive Workflow Visualization
              </span>
            </div>
            <div className="text-xs">
              <span className="text-orange-600 font-semibold">
                ⚠️ Research & Education Only
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;