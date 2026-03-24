import { MobileAgentsList } from '../components/MobileAgents'
import { MobileTasksList } from '../components/MobileTasks'
import { MobileStatsCard, MobileStatsScroll } from '../components/MobileStats'
import { StatsCard } from '../components/StatsCard'
import { getAgents, getTasks, getStats } from '../lib/data'

export default async function Home() {
  const agents = await getAgents()
  const tasks = await getTasks()
  const stats = await getStats()

  const mobileAgents = agents.slice(0, 6).map((agent: any) => ({
    id: agent.id,
    name: agent.name,
    role: agent.role,
    emoji: agent.emoji || '🤖',
    status: agent.status || 'online',
    lastActive: agent.lastActive || 'Il y a 5 min'
  }))

  const mobileTasks = tasks.slice(0, 5).map((task: any) => ({
    id: task.id,
    title: task.title,
    agent_id: task.agent_id,
    priority: task.priority || 'medium',
    status: task.status || 'todo',
    deadline: task.deadline
  }))

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Page Header - Desktop */}
      <header className="hidden lg:block mb-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <span className="text-2xl">🧪</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              Mission <span className="gradient-text">Control</span>
            </h1>
            <p className="text-slate-400 mt-1">Dashboard central de l&apos;empire</p>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 lg:hidden">
          <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">📊</span>
          Vue d&apos;ensemble
        </h2>
        
        <MobileStatsScroll>
          <MobileStatsCard title="Agents" value={stats?.agents || 11} emoji="🤖" trend="+2" trendUp={true} />
          <MobileStatsCard title="Tâches" value={stats?.tasks || 10} emoji="📋" trend="+5" trendUp={true} />
          <MobileStatsCard title="En cours" value={stats?.inProgress || 3} emoji="⚡" trend="-1" trendUp={false} />
          <MobileStatsCard title="Terminées" value={stats?.completed || 2} emoji="✅" trend="+12%" trendUp={true} />
        </MobileStatsScroll>

        <div className="hidden lg:grid grid-cols-4 gap-4">
          <StatsCard title="Agents Actifs" value={stats?.agents || 11} emoji="🤖" trend="+2 ce mois" trendUp={true} />
          <StatsCard title="Tâches Totales" value={stats?.tasks || 10} emoji="📋" trend="+5 cette semaine" trendUp={true} />
          <StatsCard title="En Cours" value={stats?.inProgress || 3} emoji="⚡" trend="1 en attente" trendUp={false} />
          <StatsCard title="Terminées" value={stats?.completed || 2} emoji="✅" trend="+12% vs hier" trendUp={true} />
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agents Section */}
        <section className="bg-[#14141c] rounded-2xl p-4 lg:p-6 border border-white/[0.06] card-hover animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center border border-violet-500/20">
                <span className="text-lg">👥</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Agents</h2>
                <p className="text-xs text-slate-400">{agents.length} agents actifs</p>
              </div>
            </div>
          </div>
          
          <div className="lg:hidden">
            <MobileAgentsList agents={mobileAgents} />
          </div>
          
          <div className="hidden lg:block">
            <div className="space-y-2">
              {agents.slice(0, 8).map((agent: any) => (
                <div key={agent.id} className="group flex items-center gap-3 p-3 rounded-xl bg-[#1a1a24] hover:bg-[#1e1e2a] border border-transparent hover:border-white/[0.08] transition-all cursor-pointer">
                  <div className="relative">
                    <span className="text-2xl">{agent.emoji || '🤖'}</span>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#1a1a24] ${agent.status === 'online' ? 'bg-emerald-500' : agent.status === 'busy' ? 'bg-amber-500' : 'bg-slate-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-slate-100 group-hover:text-white transition-colors">{agent.name}</p>
                    <p className="text-sm text-slate-400 truncate">{agent.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tasks Section */}
        <section className="bg-[#14141c] rounded-2xl p-4 lg:p-6 border border-white/[0.06] card-hover animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/20">
                <span className="text-lg">📋</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tâches</h2>
                <p className="text-xs text-slate-400">{tasks.length} tâches en cours</p>
              </div>
            </div>
          </div>
          
          <div className="lg:hidden">
            <MobileTasksList tasks={mobileTasks} />
          </div>
          
          <div className="hidden lg:block">
            <div className="space-y-2">
              {tasks.slice(0, 6).map((task: any) => (
                <div key={task.id} className="group flex items-center gap-3 p-3 rounded-xl bg-[#1a1a24] hover:bg-[#1e1e2a] border border-transparent hover:border-white/[0.08] transition-all cursor-pointer">
                  <div className={`w-2 h-2 rounded-full ${task.status === 'done' ? 'bg-emerald-500' : task.status === 'in_progress' ? 'bg-blue-500' : 'bg-slate-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-slate-100">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {task.agent_id && <span className="text-xs text-slate-500">{task.agent_id}</span>}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${task.priority === 'high' ? 'bg-red-500/10 text-red-400' : task.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
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
      <footer className="mt-12 text-center text-slate-500 text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <p>Empire Julien • Mission Control v3 • Next.js 14</p>
      </footer>
    </div>
  )
}
