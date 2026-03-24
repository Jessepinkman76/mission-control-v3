import { MobileKanban, DesktopKanban } from '../../components/Kanban'
import { getTasks } from '../../lib/data'

export default async function TasksPage() {
  const tasks = await getTasks()

  // Transform tasks for Kanban
  const kanbanTasks = tasks.map((task: any) => ({
    id: String(task.id),
    title: task.title,
    agent_id: task.agent_id,
    priority: task.priority || 'medium',
    status: task.status || 'todo',
    deadline: task.deadline
  }))

  return (
    <div className="p-4 lg:p-8">
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
          <span>📋</span>
          <span>Tâches</span>
        </h1>
        <p className="text-gray-400 mt-2">Gestion des missions de l'empire</p>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-zinc-900 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold">{kanbanTasks.filter(t => t.status === 'todo').length}</p>
          <p className="text-xs text-gray-500">À faire</p>
        </div>
        <div className="bg-zinc-900 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-400">{kanbanTasks.filter(t => t.status === 'in_progress').length}</p>
          <p className="text-xs text-gray-500">En cours</p>
        </div>
        <div className="bg-zinc-900 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-400">{kanbanTasks.filter(t => t.status === 'done').length}</p>
          <p className="text-xs text-gray-500">Terminées</p>
        </div>
      </div>

      {/* Mobile Kanban */}
      <div className="lg:hidden">
        <MobileKanban tasks={kanbanTasks} />
      </div>

      {/* Desktop Kanban */}
      <div className="hidden lg:block">
        <DesktopKanban tasks={kanbanTasks} />
      </div>
    </div>
  )
}
