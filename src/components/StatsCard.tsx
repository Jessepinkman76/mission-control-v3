interface StatsCardProps {
  title: string
  value: string | number
  emoji: string
}

export function StatsCard({ title, value, emoji }: StatsCardProps) {
  return (
    <div className="bg-zinc-900 rounded-lg p-4 flex items-center gap-4">
      <span className="text-3xl">{emoji}</span>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}