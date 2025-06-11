import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { DiagnosisNodeData } from '../../types';
import clsx from 'clsx';

export function DiagnosisNode({ data }: NodeProps<DiagnosisNodeData>) {
  const getNodeStyle = (type: string) => {
    switch (type) {
      case 'diagnosis':
        return 'diagnosis-node';
      case 'differential':
        return 'differential-node';
      case 'action':
        return 'action-node';
      case 'completed':
        return 'completed-node';
      default:
        return 'diagnosis-node';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'diagnosis':
        return '🩺'; // stethoscope
      case 'differential':
        return '🤔'; // thinking face
      case 'action':
        return '⚡'; // lightning bolt
      case 'completed':
        return '✅'; // check mark
      default:
        return '🩺';
    }
  };

  return (
    <div className={clsx(getNodeStyle(data.type), 'relative group')}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />
      
      <div className="flex items-center gap-2">
        <span className="text-lg">{getIcon(data.type)}</span>
        <div className="flex-1">
          <div className="font-medium text-sm">{data.label}</div>
          {data.confidence && (
            <div className="text-xs opacity-75">
              {Math.round(data.confidence * 100)}% confidence
            </div>
          )}
        </div>
      </div>

      {/* Tooltip on hover */}
      {(data.details || data.evidence) && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap max-w-xs">
          {data.details && (
            <div className="mb-1">{data.details}</div>
          )}
          {data.evidence && (
            <div>
              <strong>Evidence:</strong> {data.evidence.join(', ')}
            </div>
          )}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
    </div>
  );
}