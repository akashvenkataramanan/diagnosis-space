import { Handle, Position } from '@xyflow/react';
import clsx from 'clsx';
import { useState } from 'react';

interface NodeData {
  label: string;
  type: string;
  details?: string;
  confidence?: number;
  evidence?: string[];
  priority?: 'urgent' | 'high' | 'medium' | 'low';
  category?: string;
  timing?: string;
}

interface NodeProps {
  data: NodeData;
}

export function DiagnosisNode({ data }: NodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  console.log('DiagnosisNode rendering:', data.label, data.type);
  
  const getNodeStyle = (type: string, priority?: string) => {
    const baseClasses = 'relative group min-w-80 max-w-96 cursor-pointer';
    
    switch (type) {
      case 'diagnosis':
        return clsx(baseClasses, 'bg-orange-50 border-4 border-orange-400 rounded-lg p-4 shadow-xl hover:shadow-2xl transition-all duration-200 hover:border-orange-500');
      case 'differential':
        return clsx(baseClasses, 'bg-blue-50 border-4 border-blue-400 rounded-lg p-4 shadow-xl hover:shadow-2xl transition-all duration-200 hover:border-blue-500');
      case 'action':
        const priorityClass = priority === 'urgent' ? 'bg-red-50 border-red-500 hover:border-red-600' :
                            priority === 'high' ? 'bg-amber-50 border-amber-500 hover:border-amber-600' :
                            'bg-green-50 border-green-500 hover:border-green-600';
        return clsx(baseClasses, 'rounded-lg p-4 shadow-xl hover:shadow-2xl transition-all duration-200 border-4', priorityClass);
      case 'completed':
        return clsx(baseClasses, 'bg-gray-50 border-4 border-gray-400 rounded-lg p-4 shadow-xl opacity-75');
      default:
        return clsx(baseClasses, 'bg-gray-50 border-4 border-gray-400 rounded-lg p-4 shadow-xl');
    }
  };

  const getIcon = (type: string, priority?: string) => {
    switch (type) {
      case 'diagnosis':
        return '🩺'; // stethoscope
      case 'differential':
        return '🤔'; // thinking face
      case 'action':
        return priority === 'urgent' ? '🚨' : 
               priority === 'high' ? '⚡' : '📋';
      case 'completed':
        return '✅'; // check mark
      default:
        return '🩺';
    }
  };

  const getPriorityBadge = (priority?: string) => {
    if (!priority || priority === 'medium') return null;
    
    const badgeClasses = {
      urgent: 'bg-red-100 text-red-800 border border-red-200',
      high: 'bg-amber-100 text-amber-800 border border-amber-200',
      low: 'bg-gray-100 text-gray-600 border border-gray-200'
    };
    
    return (
      <div className={clsx('text-xs px-2 py-1 rounded-md font-medium', badgeClasses[priority as keyof typeof badgeClasses])}>
        {priority.toUpperCase()}
      </div>
    );
  };

  return (
    <div className={getNodeStyle(data.type, data.priority)} onClick={() => setIsExpanded(!isExpanded)}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />
      
      <div className="flex items-start gap-2">
        <span className="text-xl flex-shrink-0">{getIcon(data.type, data.priority)}</span>
        <div className="flex-1 min-w-0">
          {/* Clean header view */}
          <div className="flex items-center justify-between">
            <div className="font-medium text-base text-gray-900 truncate flex-1">
              {data.label.length > 35 ? `${data.label.substring(0, 35)}...` : data.label}
            </div>
            <div className="text-sm text-gray-400 ml-3 transform transition-transform duration-200">
              {isExpanded ? '▼' : '▶'}
            </div>
          </div>
          
          {/* Clean info bar */}
          <div className="flex items-center gap-2 mt-2">
            {data.confidence && (
              <div className="text-xs bg-green-100 text-green-700 border border-green-200 px-2 py-1 rounded-md font-medium">
                {Math.round(data.confidence * 100)}%
              </div>
            )}
            {getPriorityBadge(data.priority)}
          </div>
          
          {/* Clean expanded content */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-gray-200 space-y-3 animate-fadeIn">
              {/* Full label */}
              <div className="font-medium text-sm text-gray-900 leading-relaxed">
                {data.label}
              </div>
              
              {/* Details */}
              {data.details && (
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="font-medium text-gray-900 mb-2 flex items-center gap-2 text-sm">
                    <span>📋</span> Clinical Details
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {data.details}
                  </div>
                </div>
              )}
              
              {/* Evidence */}
              {data.evidence && data.evidence.length > 0 && (
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <div className="font-medium text-orange-800 mb-2 flex items-center gap-2 text-sm">
                    <span>🔍</span> Supporting Evidence
                  </div>
                  <ul className="space-y-1">
                    {data.evidence.map((item, index) => (
                      <li key={index} className="text-sm text-orange-700 flex items-start gap-2">
                        <span className="text-orange-500 font-medium">•</span>
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Clean metadata */}
              <div className="flex flex-wrap gap-2">
                {data.category && (
                  <div className="bg-purple-100 text-purple-700 border border-purple-200 px-2 py-1 rounded-md text-xs font-medium">
                    🏷️ {data.category}
                  </div>
                )}
                {data.timing && (
                  <div className="bg-amber-100 text-amber-700 border border-amber-200 px-2 py-1 rounded-md text-xs font-medium">
                    ⏰ {data.timing}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
    </div>
  );
}