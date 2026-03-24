'use client'

interface MobileStatsCardProps {
  title: string
  value: string | number
  emoji: string
  trend?: string
  trendUp?: boolean
}

export function MobileStatsCard({ title, value, emoji, trend, trendUp }: MobileStatsCardProps) {
  return (
    <div className="bg-[#14141c] rounded-2xl p-4 flex items-center gap-4 min-w-[160px] snap-start border border-white/[0.06] hover:border-white/[0.1] transition-all active:scale-[0.98]">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center border border-indigo-500/10">
        <span className="text-2xl">{emoji}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-slate-400 text-xs uppercase tracking-wide font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-100">{value}</p>
        {trend && (
          <p className={`text-xs flex items-center gap-1 ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {trendUp ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              )}
            </svg>
            {trend}
          </p>
        )}
      </div>
    </div>
  )
}

export function MobileStatsScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
      <div className="flex gap-3 snap-x snap-mandatory pb-2">
        {children}
      </div>
    </div>
  )
}
