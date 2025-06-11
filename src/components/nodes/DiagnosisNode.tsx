import { memo } from 'react'
import type { NodeProps } from '@xyflow/react'
import type { GraphNode } from "../../types"

function DiagnosisNode({ data }: NodeProps<GraphNode>) {
  return (
    <div className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm">
      {data.label}
    </div>
  )
}

export default memo(DiagnosisNode)
