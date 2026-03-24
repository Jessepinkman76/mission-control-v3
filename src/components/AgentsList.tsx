import { getAgents } from '../lib/data'

export async function AgentsList() {
  const agents = await getAgents()
  
  return (
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
      {agents.length > 8 && (
        <p className="text-center text-gray-500 text-sm py-2">
          +{agents.length - 8} autres agents
        </p>
      )}
    </div>
  )
}