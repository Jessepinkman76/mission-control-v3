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

interface KanbanColumn {
  id: string
  title: string
  status: 'todo' | 'in_progress' | 'done'
  color: string
}

const columns: KanbanColumn[] = [
  { id: 'todo', title: 'À faire', status: 'todo', color: 'bg-gray-500' },
  { id: 'in_progress', title: 'En cours', status: 'in_progress', color: 'bg-blue-500' },
  { id: 'done', title: 'Terminé', status: 'done', color: 'bg-green-500' },
]

const priorityConfig = {
  high: { color: 'text-red-400', bg: 'bg-red-400/10', label: 'Haute', border: 'border-red-400/30' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Moyenne', border: 'border-yellow-400/30' },
  low: { color: 'text-green-400', bg: 'bg-green-400/10', label: 'Basse', border: 'border-green-400/30' }
}

interface KanbanTaskCardProps {
  task: Task
  onMove?: (taskId: string, newStatus: string) => void
}

function KanbanTaskCard({ task, onMove }: KanbanTaskCardProps) {
  const [showActions, setShowActions] = useState(false)
  const priority = priorityConfig[task.priority]

  return (
    <div 
      className={`bg-zinc-800 rounded-lg p-3 border ${priority.border} active:scale-[0.98] transition-transform`}
      onClick={() => setShowActions(!showActions)}
    >
      <p className="font-medium text-sm line-clamp-2">{task.title}</p>
      
      <div className="flex items-center gap-2 mt-2">
        <span className={`text-[10px] px-1.5 py-0.5 rounded ${priority.bg} ${priority.color}`}>
          {priority.label}
        </span>
        {task.agent_id && (
          <span className="text-[10px] text-gray-500">{task.agent_id}</span>
        )}
      </div>

      {showActions && onMove && (
        <div className="mt-3 pt-3 border-t border-zinc-700 flex gap-2">
          {task.status !== 'todo' && (
            <button 
              onClick={(e) => { e.stopPropagation(); onMove(task.id, 'todo'); }}
              className="flex-1 text-[10px] py-1 px-2 rounded bg-gray-700 hover:bg-gray-600"
            >
              ← À faire
            </button>
          )}
          {task.status !== 'in_progress' && (
            <button 
              onClick={(e) => { e.stopPropagation(); onMove(task.id, 'in_progress'); }}
              className="flex-1 text-[10px] py-1 px-2 rounded bg-blue-700 hover:bg-blue-600"
            >
              ▶ Cours
            </button>
          )}
          {task.status !== 'done' && (
            <button 
              onClick={(e) => { e.stopPropagation(); onMove(task.id, 'done'); }}
              className="flex-1 text-[10px] py-1 px-2 rounded bg-green-700 hover:bg-green-600"
            >
              ✓ Terminé
            </button>
          )}
        </div>
      )}
    </div>
  )
}

interface MobileKanbanProps {
  tasks: Task[]
  onTaskMove?: (taskId: string, newStatus: string) => void
}

export function MobileKanban({ tasks, onTaskMove }: MobileKanbanProps) {
  const [activeColumn, setActiveColumn] = useState<string>('in_progress')

  const getTasksByStatus = (status: string) => tasks.filter(t => t.status === status)

  return (
    <div className="space-y-4">
      {/* Column Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {columns.map(col => {
          const count = getTasksByStatus(col.status).length
          const isActive = activeColumn === col.id
          return (
            <button
              key={col.id}
              onClick={() => setActiveColumn(col.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                isActive ? 'bg-zinc-800' : 'bg-zinc-900/50 hover:bg-zinc-800/50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${col.color}`} />
              <span className="font-medium text-sm">{col.title}</span>
              <span className="text-xs text-gray-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active Column Tasks */}
      <div className="space-y-3">
        {getTasksByStatus(activeColumn as any).map(task => (
          <KanbanTaskCard 
            key={task.id} 
            task={task} 
            onMove={onTaskMove}
          />
        ))}
        {getTasksByStatus(activeColumn as any).length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">Aucune tâche</p>
            <p className="text-xs mt-1">Glissez ou créez une tâche</p>
          </div>
        )}
      </div>

      {/* Quick Add Button */}
      <button className="w-full py-3 rounded-lg border-2 border-dashed border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400 transition-colors flex items-center justify-center gap-2">
        <span className="text-lg">+</span>
        <span className="text-sm">Nouvelle tâche</span>
      </button>
    </div>
  )
}

// Desktop Kanban (3 columns side by side)
interface DesktopKanbanProps {
  tasks: Task[]
  onTaskMove?: (taskId: string, newStatus: string) => void
}

export function DesktopKanban({ tasks, onTaskMove }: DesktopKanbanProps) {
  const getTasksByStatus = (status: string) => tasks.filter(t => t.status === status)

  return (
    <div className="grid grid-cols-3 gap-4">
      {columns.map(col => (
        <div key={col.id} className="bg-zinc-900 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${col.color}`} />
              <h3 className="font-semibold">{col.title}</h3>
            </div>
            <span className="text-sm text-gray-500 bg-zinc-800 px-2 py-1 rounded">
              {getTasksByStatus(col.status).length}
            </span>
          </div>
          
          <div className="space-y-3">
            {getTasksByStatus(col.status).map(task => (
              <KanbanTaskCard 
                key={task.id} 
                task={task} 
                onMove={onTaskMove}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
