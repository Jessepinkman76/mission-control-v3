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

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-500',
  busy: 'bg-yellow-500'
}

export function MobileAgentCard({ agent }: MobileAgentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div 
      className="bg-zinc-800 rounded-xl p-4 cursor-pointer transition-all hover:bg-zinc-700"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="text-3xl">{agent.emoji}</span>
          <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-zinc-800 ${statusColors[agent.status]}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{agent.name}</p>
          <p className="text-sm text-gray-400 truncate">{agent.role}</p>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-zinc-700 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Statut</span>
            <span className={agent.status === 'online' ? 'text-green-400' : agent.status === 'busy' ? 'text-yellow-400' : 'text-gray-400'}>
              {agent.status === 'online' ? 'En ligne' : agent.status === 'busy' ? 'Occupé' : 'Hors ligne'}
            </span>
          </div>
          {agent.lastActive && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Dernière activité</span>
              <span className="text-gray-300">{agent.lastActive}</span>
            </div>
          )}
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
      {agents.map((agent) => (
        <MobileAgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  )
}
