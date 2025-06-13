# Diagnosis-Space Implementation Plan

## Project Overview
A React Flow-based application for visualizing medical diagnosis workflows, converting free-text clinical notes into interactive node graphs with diagnoses, differential diagnoses, and suggested actions.

## Architecture Components

### 1. Frontend Stack
- **React 18 + TypeScript**: Core UI framework
- **Vite**: Build tool and dev server
- **@xyflow/react**: Node graph engine with hooks, background grid, minimap
- **Zustand**: Lightweight global state management
- **Tailwind CSS + clsx**: Utility-first styling
- **Axios**: HTTP client for API calls
- **Dagre**: Auto-layout algorithm for node positioning

### 2. Backend Requirements
- **FastAPI + Python**: REST API server
- **OpenAI API**: LLM for text analysis with function calling
- **JSON Schema**: Structured output validation

## Component Architecture

### Core Components

#### App.tsx
```
<App>
 ├── <NoteInput />        // Textarea + Analyze button
 ├── <GraphBoard />       // React Flow wrapper
 └── <Legend />           // Color coding reference
```

#### State Management (Zustand)
```typescript
interface DiagState {
  note: string;
  graph: { nodes: Node[]; edges: Edge[] };
  isLoading: boolean;
  setNote: (note: string) => void;
  setGraph: (graph: { nodes: Node[]; edges: Edge[] }) => void;
  setLoading: (loading: boolean) => void;
}
```

#### Node Types
- **DiagnosisNode**: Blue background, confirmed diagnoses
- **DifferentialNode**: Light blue, uncertain diagnoses  
- **ActionNode**: Orange background, suggested next steps
- **CompletedActionNode**: Green background, completed actions

## Implementation Phases

### Phase 1: Core UI Setup
- [x] Project scaffolding with Vite + React + TypeScript
- [x] Install required dependencies
- [ ] Set up Tailwind CSS configuration
- [ ] Create basic component structure
- [ ] Implement Zustand store

### Phase 2: React Flow Integration
- [ ] Set up GraphBoard component with React Flow
- [ ] Create custom node components
- [ ] Implement dagre auto-layout
- [ ] Add minimap, controls, and background
- [ ] Style nodes with color coding

### Phase 3: Backend Integration
- [ ] Create FastAPI backend service
- [ ] Implement OpenAI function calling
- [ ] Define JSON schema for structured output
- [ ] Connect frontend to backend API

### Phase 4: Interactivity Features
- [ ] Click-to-expand node details
- [ ] Drag-and-drop repositioning
- [ ] Keyboard shortcuts
- [ ] Node state management (completed/pending)

### Phase 5: Polish & Testing
- [ ] Add loading states and error handling
- [ ] Implement responsive design
- [ ] Write unit tests with Vitest
- [ ] Add mock service worker for testing

## Data Flow

### Input Processing
1. User enters clinical note text
2. Frontend sends POST request to `/analyze` endpoint
3. Backend processes with OpenAI function calling
4. Structured JSON returned with nodes and edges
5. Frontend updates Zustand store
6. React Flow re-renders with new graph

### Expected API Response Format
```json
{
  "nodes": [
    { "id": "CHF", "type": "diagnosis", "label": "Acute CHF", "data": {...} },
    { "id": "BNP", "type": "action", "label": "Order BNP", "data": {...} }
  ],
  "edges": [
    { "id": "e1", "source": "CHF", "target": "BNP", "label": "next-step" }
  ]
}
```

## Styling Conventions

| Node Type | Color | CSS Class | Purpose |
|-----------|-------|-----------|---------|
| diagnosis | Blue (#1f77b4) | bg-blue-500 | Confirmed diagnoses |
| differential | Light Blue (#87ceeb) | bg-sky-400 | Uncertain diagnoses |
| action | Orange (#ff7f0e) | bg-orange-500 | Next steps/orders |
| completed | Green (#2ca02c) | bg-green-500 | Completed actions |

## Technical Considerations

### Performance
- Use React.memo for custom node components
- Implement virtual scrolling for large graphs
- Debounce API calls during text input

### Accessibility
- ARIA labels for all interactive elements
- Keyboard navigation support
- High contrast color options

### Security
- Sanitize all text input
- Implement rate limiting
- Store API keys securely

## Development Workflow

### Local Development
```bash
# Frontend
npm run dev

# Backend (separate terminal)
cd backend
uvicorn main:app --reload
```

### Testing Strategy
- Component testing with React Testing Library
- API mocking with MSW
- E2E testing with Playwright (optional)

### Deployment Options
1. **Development**: Vite preview + local FastAPI
2. **Staging**: Vercel frontend + Railway backend
3. **Production**: Docker containers + cloud hosting

## File Structure
```
diagnosis-space/
├── src/
│   ├── components/
│   │   ├── GraphBoard.tsx
│   │   ├── NoteInput.tsx
│   │   ├── Legend.tsx
│   │   └── nodes/
│   │       ├── DiagnosisNode.tsx
│   │       ├── ActionNode.tsx
│   │       └── DifferentialNode.tsx
│   ├── store/
│   │   └── diagStore.ts
│   ├── utils/
│   │   ├── layout.ts
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css
├── backend/
│   ├── main.py
│   ├── models.py
│   └── requirements.txt
└── docs/
    └── IMPLEMENTATION_PLAN.md
```

## Next Steps
1. Set up Tailwind CSS configuration
2. Create basic component structure
3. Implement Zustand store
4. Build GraphBoard with React Flow integration
5. Create custom node components
6. Set up FastAPI backend
7. Integrate OpenAI API with function calling

## Stretch Goals
- Real-time collaboration with WebSockets
- Graph persistence with SQLite/Supabase  
- HIPAA compliance with local LLM option
- Mobile-responsive design
- Export to PDF/PNG functionality