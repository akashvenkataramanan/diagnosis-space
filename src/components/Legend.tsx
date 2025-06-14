export function Legend() {
  const legendItems = [
    {
      icon: '🩺',
      label: 'Primary Diagnosis',
      color: 'from-blue-500 to-blue-600',
      description: 'High confidence diagnosis (>70%) based on clinical findings'
    },
    {
      icon: '🤔',
      label: 'Differential Diagnosis',
      color: 'from-sky-400 to-sky-500',
      description: 'Alternative diagnosis requiring further evaluation'
    },
    {
      icon: '🚨',
      label: 'Urgent Action',
      color: 'from-red-500 to-red-600',
      description: 'Critical immediate intervention needed'
    },
    {
      icon: '⚡',
      label: 'High Priority Action',
      color: 'from-orange-500 to-orange-600',
      description: 'Important test or treatment needed soon'
    },
    {
      icon: '📋',
      label: 'Standard Action',
      color: 'from-emerald-500 to-emerald-600',
      description: 'Routine follow-up test or intervention'
    }
  ];

  const workflowLayout = [
    {
      title: 'Medical Clusters',
      position: 'Relationship-Based',
      description: 'Related diagnoses and actions grouped together'
    },
    {
      title: 'Expandable Nodes',
      position: 'Click to Expand', 
      description: 'Tap any node to view detailed clinical information'
    },
    {
      title: 'Smart Layout',
      position: 'Adaptive Positioning',
      description: 'Connected findings appear side-by-side in clusters'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Main Legend Card */}
      <div className="bg-[#242933] rounded-lg shadow-sm border border-gray-700 p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">🧾</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-100">
            Clinical Workflow Guide
          </h3>
        </div>
        
        {/* Node Types */}
        <div className="space-y-3 mb-5">
          <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            Node Classifications
          </h4>
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[#272b33] hover:bg-[#2e3138] transition-colors duration-200">
              <div className={`bg-gradient-to-br ${item.color} text-white rounded-lg p-2 flex items-center justify-center shadow-sm`}>
                <span className="text-sm">{item.icon}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-100">
                  {item.label}
                </div>
                <div className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Features */}
        <div className="mb-5 pt-4 border-t border-gray-700">
          <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            Interactive Features
          </h4>
          <div className="space-y-2">
            {workflowLayout.map((item, index) => (
              <div key={index} className="bg-[#272b33] p-3 rounded-lg border border-orange-700">
                <div className="font-medium text-sm text-gray-100">{item.title}</div>
                <div className="text-xs text-gray-400 mt-1">
                  <span className="font-medium text-orange-400">{item.position}</span> - {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* AI Capabilities */}
        <div className="pt-4 border-t border-gray-700">
          <div className="bg-[#272b33] rounded-lg p-4 text-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">✨</span>
              <span className="font-semibold text-sm">OpenAI O3 Reasoning Engine</span>
            </div>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                Comprehensive clinical analysis
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                Clustered relationship mapping
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                Interactive expandable nodes
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                Evidence-based medical reasoning
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Tips Card */}
      <div className="bg-[#272b33] rounded-lg p-4 border border-orange-700">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">💡</span>
          <span className="font-medium text-orange-400 text-sm">Quick Tips</span>
        </div>
        <ul className="space-y-1 text-xs text-orange-300">
          <li>• Click any node to expand details</li>
          <li>• Use mouse wheel to zoom in/out</li>
          <li>• Drag to pan around the diagram</li>
          <li>• Related nodes are clustered together</li>
        </ul>
      </div>
    </div>
  );
}