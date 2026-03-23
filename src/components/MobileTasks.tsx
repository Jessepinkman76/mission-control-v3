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
  high: { color: 'text-red-400', bg: 'bg-red-400/10', label: 'Haute' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Moyenne' },
  low: { color: 'text-green-400', bg: 'bg-green-400/10', label: 'Basse' }
}

const statusConfig = {
  todo: { color: 'bg-gray-500', label: 'À faire' },
  in_progress: { color: 'bg-blue-500', label: 'En cours' },
  done: { color: 'bg-green-500', label: 'Terminée' }
}

export function MobileTaskCard({ task }: MobileTaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const priority = priorityConfig[task.priority]
  const status = statusConfig[task.status]

  return (
    <div 
      className="bg-zinc-800 rounded-xl p-4 cursor-pointer transition-all hover:bg-zinc-700"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-3">
        <div className={`w-3 h-3 rounded-full mt-1.5 ${status.color}`} />
        <div className="flex-1 min-w-0">
          <p className="font-medium line-clamp-2">{task.title}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${priority.bg} ${priority.color}`}>
              {priority.label}
            </span>
            {task.agent_id && (
              <span className="text-xs text-gray-500">{task.agent_id}</span>
            )}
          </div>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-500 transition-transform mt-1 ${isExpanded ? 'rotate-180' : ''}`}
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
            <span className="text-gray-300">{status.label}</span>
          </div>
          {task.deadline && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Échéance</span>
              <span className="text-gray-300">{task.deadline}</span>
            </div>
          )}
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
      {tasks.map((task) => (
        <MobileTaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}
