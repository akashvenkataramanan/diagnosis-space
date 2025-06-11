import NoteInput from './components/NoteInput'
import GraphBoard from './components/GraphBoard'
import Legend from './components/Legend'
import './index.css'

function App() {
  return (
    <div className="p-4 space-y-4">
      <NoteInput />
      <Legend />
      <GraphBoard />
    </div>
  )
}

export default App
