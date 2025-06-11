# Development Notes

## Quick Start Commands

### Project Setup
```bash
cd diagnosis-space
npm install
npm run dev
```

### Key Dependencies Installed
- `@xyflow/react`: React Flow v12 for node graphs
- `dagre`: Auto-layout algorithm  
- `zustand`: Lightweight state management
- `axios`: HTTP client
- `clsx`: Conditional CSS classes
- `tailwindcss`: Utility-first CSS

## Development Workflow

### 1. Component Development Order
1. Set up Zustand store (`src/store/diagStore.ts`)
2. Create basic NoteInput component
3. Set up GraphBoard with React Flow
4. Build custom node components
5. Integrate backend API

### 2. Backend Development
Create separate `backend/` directory with:
- FastAPI server (`main.py`)
- OpenAI integration with function calling
- JSON schema validation
- CORS setup for frontend connection

### 3. Testing Strategy
- Unit tests for components with Vitest
- API mocking with Mock Service Worker
- Snapshot tests for React Flow graphs

## Key Implementation Details

### React Flow Setup
- Custom node types: `diagnosis`, `differential`, `action`
- Auto-layout with dagre on graph updates
- Minimap and controls for navigation
- Background grid for visual reference

### State Management
- Single Zustand store for simplicity
- Separate slices for note text and graph data
- Loading states for API calls

### Styling Approach
- Tailwind utility classes for rapid development
- Custom CSS for React Flow node styling
- Color-coded node types for quick visual parsing

## Common Patterns

### Node Component Structure
```typescript
interface NodeProps {
  data: {
    label: string;
    type: 'diagnosis' | 'differential' | 'action';
    details?: string;
    completed?: boolean;
  };
}

export function DiagnosisNode({ data }: NodeProps) {
  return (
    <div className="bg-blue-500 text-white rounded p-2">
      {data.label}
    </div>
  );
}
```

### API Integration Pattern
```typescript
const analyzeNote = async (note: string) => {
  setLoading(true);
  try {
    const response = await axios.post('/api/analyze', { note });
    setGraph(response.data);
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false);
  }
};
```

## Troubleshooting

### Common Issues
1. **React Flow not rendering**: Check container has defined height/width
2. **Dagre layout issues**: Ensure nodes have position before layout
3. **State not updating**: Verify Zustand store subscriptions
4. **CORS errors**: Configure backend CORS settings

### Performance Tips
- Use React.memo for node components
- Debounce API calls during typing
- Implement virtual scrolling for large graphs
- Optimize re-renders with proper key props

## Architecture Decisions

### Why React Flow?
- Purpose-built for node/edge graphs
- Excellent TypeScript support
- Built-in zoom, pan, minimap features
- Extensible with custom nodes/edges

### Why Zustand over Redux?
- Minimal boilerplate
- Direct store subscriptions
- TypeScript-friendly
- Smaller bundle size

### Why Dagre for Layout?
- Hierarchical layout perfect for diagnosis workflows
- Automatic edge routing
- Configurable spacing and direction
- Works well with React Flow

## API Design Notes

### Backend Endpoint Structure
```
POST /api/analyze
Body: { "note": "patient presents with..." }
Response: {
  "nodes": [...],
  "edges": [...],
  "metadata": { "processing_time": 1.2, "confidence": 0.85 }
}
```

### Error Handling
- 422: Invalid input format
- 429: Rate limit exceeded  
- 500: OpenAI API errors
- Graceful degradation for network issues

## Future Enhancements

### Phase 2 Features
- Real-time collaboration
- Graph versioning/history
- Custom node templates
- Export functionality

### Integration Possibilities
- EMR system connections
- FHIR data import/export
- Clinical decision support rules
- Audit logging for compliance

## Useful Resources
- [React Flow Documentation](https://reactflow.dev/)
- [Zustand Guide](https://github.com/pmndrs/zustand)
- [Dagre Layout Algorithm](https://github.com/dagrejs/dagre)
- [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling)