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
    <div className="bg-zinc-900 rounded-xl p-4 flex items-center gap-4 min-w-[140px] snap-start">
      <span className="text-3xl">{emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-gray-400 text-xs uppercase tracking-wide">{title}</p>
        <p className="text-xl font-bold">{value}</p>
        {trend && (
          <p className={`text-xs ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
    </div>
  )
}

export function MobileStatsScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:hidden -mx-6 px-6 overflow-x-auto scrollbar-hide">
      <div className="flex gap-3 snap-x snap-mandatory">
        {children}
      </div>
    </div>
  )
}
