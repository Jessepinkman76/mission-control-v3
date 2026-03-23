import { MobileAgentsList } from '@/components/MobileAgents'
import { MobileTasksList } from '@/components/MobileTasks'
import { MobileStatsCard, MobileStatsScroll } from '@/components/MobileStats'
import { StatsCard } from '@/components/StatsCard'
import { getAgents, getTasks, getStats } from '@/lib/data'

export default async function Home() {
  const agents = await getAgents()
  const tasks = await getTasks()
  const stats = await getStats()

  // Transform agents for mobile component
  const mobileAgents = agents.slice(0, 6).map((agent: any) => ({
    id: agent.id,
    name: agent.name,
    role: agent.role,
    emoji: agent.emoji || '🤖',
    status: agent.status || 'online',
    lastActive: agent.lastActive || 'Il y a 5 min'
  }))

  // Transform tasks for mobile component
  const mobileTasks = tasks.slice(0, 5).map((task: any) => ({
    id: task.id,
    title: task.title,
    agent_id: task.agent_id,
    priority: task.priority || 'medium',
    status: task.status || 'todo',
    deadline: task.deadline
  }))

  return (
    <div className="p-4 lg:p-8">
      {/* Page Header - Desktop */}
      <header className="hidden lg:block mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <span>🧪</span>
          <span>Mission Control</span>
        </h1>
        <p className="text-gray-400 mt-2">Dashboard central de l'empire</p>
      </header>

      {/* Stats Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 lg:hidden">📊 Vue d'ensemble</h2>
        
        {/* Mobile Stats - Horizontal Scroll */}
        <MobileStatsScroll>
          <MobileStatsCard title="Agents" value={stats?.agents || 11} emoji="🤖" />
          <MobileStatsCard title="Tâches" value={stats?.tasks || 10} emoji="📋" />
          <MobileStatsCard title="En cours" value={stats?.tasksInProgress || 3} emoji="⚡" />
          <MobileStatsCard title="Terminées" value={stats?.tasksDone || 2} emoji="✅" />
        </MobileStatsScroll>

        {/* Desktop Stats - Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-4">
          <StatsCard title="Agents" value={stats?.agents || 11} emoji="🤖" />
          <StatsCard title="Tâches" value={stats?.tasks || 10} emoji="📋" />
          <StatsCard title="En cours" value={stats?.tasksInProgress || 3} emoji="⚡" />
          <StatsCard title="Terminées" value={stats?.tasksDone || 2} emoji="✅" />
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agents Section */}
        <section className="bg-zinc-900 rounded-xl p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span>👥</span> Agents
            </h2>
            <span className="text-sm text-gray-500">{agents.length} total</span>
          </div>
          
          {/* Mobile Agents List */}
          <div className="lg:hidden">
            <MobileAgentsList agents={mobileAgents} />
          </div>
          
          {/* Desktop Agents List */}
          <div className="hidden lg:block">
            <div className="space-y-2">
              {agents.slice(0, 8).map((agent: any) => (
                <div 
                  key={agent.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  <span className="text-2xl">{agent.emoji || '🤖'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{agent.name}</p>
                    <p className="text-sm text-gray-400 truncate">{agent.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tasks Section */}
        <section className="bg-zinc-900 rounded-xl p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span>📋</span> Tâches
            </h2>
            <span className="text-sm text-gray-500">{tasks.length} total</span>
          </div>
          
          {/* Mobile Tasks List */}
          <div className="lg:hidden">
            <MobileTasksList tasks={mobileTasks} />
          </div>
          
          {/* Desktop Tasks List */}
          <div className="hidden lg:block">
            <div className="space-y-2">
              {tasks.slice(0, 6).map((task: any) => (
                <div 
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    task.status === 'done' ? 'bg-green-500' : 
                    task.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {task.agent_id && (
                        <span className="text-xs text-gray-500">{task.agent_id}</span>
                      )}
                      <span className={`text-xs ${
                        task.priority === 'high' ? 'text-red-400' :
                        task.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Empire Julien • Mission Control v3 • Next.js 14</p>
      </footer>
    </div>
  )
}
