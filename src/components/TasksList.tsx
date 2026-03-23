import { getTasks } from '@/lib/data'

export async function TasksList() {
  const tasks = await getTasks()
  
  const priorityColors: Record<string, string> = {
    high: 'text-red-400',
    medium: 'text-yellow-400',
    low: 'text-green-400'
  }
  
  const statusColors: Record<string, string> = {
    todo: 'bg-gray-600',
    in_progress: 'bg-blue-600',
    done: 'bg-green-600'
  }
  
  return (
    <div className="space-y-2">
      {tasks.slice(0, 6).map((task: any) => (
        <div 
          key={task.id}
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800"
        >
          <div className={`w-2 h-2 rounded-full ${statusColors[task.status] || 'bg-gray-600'}`} />
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{task.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">{task.agent_id || 'Unassigned'}</span>
              <span className={`text-xs ${priorityColors[task.priority] || 'text-gray-400'}`}>
                {task.priority}
              </span>
            </div>
          </div>
        </div>
      ))}
      {tasks.length === 0 && (
        <p className="text-center text-gray-500 py-4">Aucune tâche</p>
      )}
    </div>
  )
}