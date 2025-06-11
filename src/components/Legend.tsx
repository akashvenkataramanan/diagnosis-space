export default function Legend() {
  const items = [
    { color: 'bg-blue-500', label: 'Diagnosis' },
    { color: 'bg-sky-400', label: 'Differential' },
    { color: 'bg-orange-500', label: 'Pending Action' },
    { color: 'bg-green-500', label: 'Completed Action' },
  ]

  return (
    <div className="flex gap-4 flex-wrap text-sm">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1">
          <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
