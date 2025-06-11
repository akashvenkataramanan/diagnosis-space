import { ReactFlow, 
  Background,
  Controls,
  ReactFlowProvider,
} from '@xyflow/react'
import type { GraphNode, GraphEdge } from "../types"
import { useDiagStore } from '../store/diagStore'
import DiagnosisNode from './nodes/DiagnosisNode'
import DifferentialNode from './nodes/DifferentialNode'
import ActionNode from './nodes/ActionNode'
import CompletedActionNode from './nodes/CompletedActionNode'

const nodeTypes = {
  diagnosis: DiagnosisNode,
  differential: DifferentialNode,
  action: ActionNode,
  completed: CompletedActionNode,
}

function Flow() {
  const nodes = useDiagStore((s) => s.nodes)
  const edges = useDiagStore((s) => s.edges)

  return (
    <ReactFlow<GraphNode, GraphEdge> nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
      <Background />
      <Controls />
    </ReactFlow>
  )
}

export default function GraphBoard() {
  return (
    <div className="h-96 border rounded">{/* 96 height ~ 384px */}
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  )
}
