interface StatsCardProps {
  title: string
  value: string | number
  emoji: string
  trend?: string
  trendUp?: boolean
}

export function StatsCard({ title, value, emoji, trend, trendUp }: StatsCardProps) {
  return (
    <div className="bg-[#14141c] rounded-2xl p-5 flex items-center gap-4 border border-white/[0.06] card-hover group">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center border border-indigo-500/10 group-hover:scale-110 transition-transform duration-300">
        <span className="text-3xl">{emoji}</span>
      </div>
      <div className="flex-1">
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-slate-100">{value}</p>
        {trend && (
          <p className={`text-xs flex items-center gap-1 mt-1 ${trendUp ? 'text-emerald-400' : 'text-amber-400'}`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {trendUp ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              )}
            </svg>
            {trend}
          </p>
        )}
      </div>
    </div>
  )
}
