import React from 'react';

export function Legend() {
  const legendItems = [
    {
      icon: '🩺',
      label: 'Confirmed Diagnosis',
      color: 'bg-blue-500',
      description: 'High confidence diagnosis based on clinical findings'
    },
    {
      icon: '🤔',
      label: 'Differential Diagnosis',
      color: 'bg-sky-400',
      description: 'Possible diagnosis requiring further evaluation'
    },
    {
      icon: '⚡',
      label: 'Recommended Action',
      color: 'bg-orange-500',
      description: 'Suggested tests, treatments, or next steps'
    },
    {
      icon: '✅',
      label: 'Completed Action',
      color: 'bg-green-500',
      description: 'Action that has been completed or ordered'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Node Legend
      </h3>
      
      <div className="space-y-3">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`${item.color} text-white rounded p-2 flex items-center justify-center min-w-8 h-8`}>
              <span className="text-sm">{item.icon}</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-800">
                {item.label}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p className="mb-1">
            <strong>Tips:</strong>
          </p>
          <ul className="space-y-1 ml-2">
            <li>• Hover over nodes for detailed information</li>
            <li>• Drag nodes to reposition</li>
            <li>• Use controls to zoom and pan</li>
            <li>• Check minimap for overview</li>
          </ul>
        </div>
      </div>
    </div>
  );
}