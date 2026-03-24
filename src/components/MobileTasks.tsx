'use client'

import { useState } from 'react'

interface Task {
  id: string
  title: string
  agent_id?: string
  priority: 'high' | 'medium' | 'low'
  status: 'todo' | 'in_progress' | 'done'
  deadline?: string
}

interface MobileTaskCardProps {
  task: Task
}

const priorityConfig = {
  high: { 
    color: 'text-red-400', 
    bg: 'bg-red-500/10', 
    border: 'border-red-500/20',
    label: 'Haute',
    dot: 'bg-red-500'
  },
  medium: { 
    color: 'text-amber-400', 
    bg: 'bg-amber-500/10', 
    border: 'border-amber-500/20',
    label: 'Moyenne',
    dot: 'bg-amber-500'
  },
  low: { 
    color: 'text-emerald-400', 
    bg: 'bg-emerald-500/10', 
    border: 'border-emerald-500/20',
    label: 'Basse',
    dot: 'bg-emerald-500'
  }
}

const statusConfig = {
  todo: { color: 'bg-slate-500', label: 'À faire', bgClass: 'bg-slate-500/10' },
  in_progress: { color: 'bg-blue-500', label: 'En cours', bgClass: 'bg-blue-500/10' },
  done: { color: 'bg-emerald-500', label: 'Terminée', bgClass: 'bg-emerald-500/10' }
}

export function MobileTaskCard({ task }: MobileTaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const priority = priorityConfig[task.priority]
  const status = statusConfig[task.status]

  return (
    <div 
      className="bg-[#1a1a24] rounded-xl p-4 cursor-pointer transition-all duration-300 border border-transparent hover:border-white/[0.08] active:scale-[0.98]"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-3">
        <div className={`w-3 h-3 rounded-full mt-1.5 ${priority.dot} shadow-lg ${priority.dot.replace('bg-', 'shadow-')}/50`} />
        <div className="flex-1 min-w-0">
          <p className="font-medium line-clamp-2 text-slate-100">{task.title}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${priority.bg} ${priority.color} border ${priority.border}`}>
              {priority.label}
            </span>
            {task.agent_id && (
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-slate-500" />
                {task.agent_id}
              </span>
            )}
          </div>
        </div>
        <svg 
          className={`w-5 h-5 text-slate-500 transition-transform duration-300 mt-1 ${isExpanded ? 'rotate-180' : ''}`}
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
            <span className={`text-sm px-2 py-1 rounded-full ${status.bgClass} ${status.color.replace('bg-', 'text-')}`}>
              {status.label}
            </span>
          </div>
          {task.deadline && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Échéance</span>
              <span className="text-sm text-slate-300">{task.deadline}</span>
            </div>
          )}
          <div className="flex gap-2 mt-2">
            <button className="flex-1 py-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm font-medium hover:bg-indigo-500/20 transition-colors border border-indigo-500/20">
              Détails
            </button>
            {task.status !== 'done' && (
              <button className="flex-1 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors border border-emerald-500/20">
                Terminer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

interface MobileTasksListProps {
  tasks: Task[]
}

export function MobileTasksList({ tasks }: MobileTasksListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div key={task.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
          <MobileTaskCard task={task} />
        </div>
      ))}
    </div>
  )
}
