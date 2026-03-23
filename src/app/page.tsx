import { AgentsList } from '@/components/AgentsList'
import { StatsCard } from '@/components/StatsCard'
import { TasksList } from '@/components/TasksList'

export default function Home() {
  return (
    <main className="min-h-screen p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <span>🧪</span>
          <span>Mission Control</span>
        </h1>
        <p className="text-gray-400 mt-2">Dashboard central de l'empire</p>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Agents" value="11" emoji="🤖" />
        <StatsCard title="Tâches" value="10" emoji="📋" />
        <StatsCard title="En cours" value="3" emoji="⚡" />
        <StatsCard title="Terminées" value="2" emoji="✅" />
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agents */}
        <section className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>👥</span> Agents
          </h2>
          <AgentsList />
        </section>

        {/* Tasks */}
        <section className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>📋</span> Tâches
          </h2>
          <TasksList />
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Empire Julien • Mission Control v3 • Next.js 14</p>
      </footer>
    </main>
  )
}