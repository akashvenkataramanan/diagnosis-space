import { useDiagStore } from '../store/diagStore'
import { analyzeNote } from '../utils/api'

export default function NoteInput() {
  const note = useDiagStore((s) => s.note)
  const setNote = useDiagStore((s) => s.setNote)
  const setGraph = useDiagStore((s) => s.setGraph)
  const isLoading = useDiagStore((s) => s.isLoading)
  const setLoading = useDiagStore((s) => s.setLoading)
  const setError = useDiagStore((s) => s.setError)
  const error = useDiagStore((s) => s.error)

  const handleAnalyze = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await analyzeNote(note)
      setGraph({ nodes: data.nodes, edges: data.edges })
    } catch {
      setError('Failed to analyze note')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className="border rounded p-2 min-h-[120px]"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter notes here"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 w-max"
      >
        Analyze
        {isLoading && (
          <span className="border-2 border-t-transparent border-white rounded-full w-4 h-4 animate-spin" />
        )}
      </button>
    </div>
  )
}
