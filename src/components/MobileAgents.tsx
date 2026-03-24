'use client'

import { useState } from 'react'

interface Agent {
  id: string
  name: string
  role: string
  emoji: string
  status: 'online' | 'offline' | 'busy'
  lastActive?: string
}

interface MobileAgentCardProps {
  agent: Agent
}

const statusConfig = {
  online: { color: 'bg-emerald-500', glow: 'shadow-emerald-500/50', label: 'En ligne' },
  offline: { color: 'bg-slate-500', glow: 'shadow-slate-500/50', label: 'Hors ligne' },
  busy: { color: 'bg-amber-500', glow: 'shadow-amber-500/50', label: 'Occupé' }
}

export function MobileAgentCard({ agent }: MobileAgentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const status = statusConfig[agent.status]

  return (
    <div 
      className="bg-[#1a1a24] rounded-xl p-4 cursor-pointer transition-all duration-300 border border-transparent hover:border-white/[0.08] active:scale-[0.98]"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center border border-violet-500/10">
            <span className="text-2xl">{agent.emoji}</span>
          </div>
          <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#1a1a24] ${status.color} shadow-lg ${status.glow}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate text-slate-100">{agent.name}</p>
          <p className="text-sm text-slate-400 truncate">{agent.role}</p>
        </div>
        <svg 
          className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3 animate-fade-in">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">Statut</span>
            <span className={`text-sm px-2 py-1 rounded-full ${status.color.replace('bg-', 'bg-').replace('500', '500/10')} ${status.color.replace('bg-', 'text-')}`}>
              {status.label}
            </span>
          </div>
          {agent.lastActive && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Dernière activité</span>
              <span className="text-sm text-slate-300">{agent.lastActive}</span>
            </div>
          )}
          <button className="w-full mt-2 py-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm font-medium hover:bg-indigo-500/20 transition-colors border border-indigo-500/20">
            Voir le profil
          </button>
        </div>
      )}
    </div>
  )
}

interface MobileAgentsListProps {
  agents: Agent[]
}

export function MobileAgentsList({ agents }: MobileAgentsListProps) {
  return (
    <div className="space-y-3">
      {agents.map((agent, index) => (
        <div key={agent.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
          <MobileAgentCard agent={agent} />
        </div>
      ))}
    </div>
  )
}
