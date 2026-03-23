import fs from 'fs'
import path from 'path'

// Data paths - read from workspace (local) or data/ (production)
const isProduction = process.env.NODE_ENV === 'production'
const DATA_DIR = isProduction 
  ? path.join(process.cwd(), 'data')
  : '/home/julien/.openclaw/workspace'

const AGENTS_PATH = '/home/julien/.openclaw/workspace/agents'

// Helper to read JSON file
function readJsonFile<T>(filePath: string, defaultValue: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(content)
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err)
  }
  return defaultValue
}

// Parse agent markdown file
function parseAgentMarkdown(filePath: string): any {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const name = path.basename(filePath, '.md')
    
    const roleMatch = content.match(/#\s*[A-Z-]+\s*—\s*(.+)/i)
    const vibeMatch = content.match(/\*\*Vibe:\*\*\s*(.+)/i)
    const emojiMatch = content.match(/\*\*Emoji:\*\*\s*(\S+)/i)
    
    return {
      id: name.toLowerCase(),
      name: name,
      role: roleMatch ? roleMatch[1].trim() : 'Agent',
      vibe: vibeMatch ? vibeMatch[1].trim() : '',
      emoji: emojiMatch ? emojiMatch[1].trim() : '🤖'
    }
  } catch {
    return null
  }
}

// Get agents from .md files or JSON export
export async function getAgents() {
  if (isProduction) {
    const data = readJsonFile(path.join(process.cwd(), 'data', 'agents-export.json'), { agents: [] })
    return data.agents || []
  }
  
  // Local: read from .md files
  try {
    const files = fs.readdirSync(AGENTS_PATH)
    const agents = files
      .filter(f => f.endsWith('.md') && !f.includes('MISSION'))
      .map(f => parseAgentMarkdown(path.join(AGENTS_PATH, f)))
      .filter(Boolean)
    return agents
  } catch {
    return []
  }
}

// Get memories from JSON export
export async function getMemories(limit = 50) {
  const filePath = isProduction 
    ? path.join(process.cwd(), 'data', 'memories-export.json')
    : path.join(DATA_DIR, 'memory.db')
  
  // For now, use JSON export
  const data = readJsonFile(
    path.join(process.cwd(), 'data', 'memories-export.json'),
    { memories: [] }
  )
  return (data.memories || []).slice(0, limit)
}

// Get tasks
export async function getTasks() {
  // Real tasks from memory
  const tasks = [
    { id: 1, title: 'Audit API Jesse', agent_id: 'jesse', status: 'done', priority: 'high', description: 'Audit des APIs gratuites' },
    { id: 2, title: 'Création skills dev', agent_id: 'jesse', status: 'done', priority: 'medium', description: 'deployment-hooks + testing-automation' },
    { id: 3, title: 'Mission Control v3', agent_id: 'jesse', status: 'in_progress', priority: 'high', description: 'Next.js 14 rebuild' },
    { id: 4, title: 'Niche research BR/MX', agent_id: 'lydia', status: 'todo', priority: 'high', description: 'Nutra, Crypto, Dating' },
    { id: 5, title: 'SEO audit sites', agent_id: 'saul', status: 'todo', priority: 'medium', description: 'Blackhat SEO strategy' },
    { id: 6, title: 'Mobile components V3', agent_id: 'badger', status: 'in_progress', priority: 'medium', description: 'Migration React → Next.js' },
    { id: 7, title: 'Setup analytics', agent_id: 'skyler', status: 'done', priority: 'low', description: 'GA4 + Sheets dashboard' },
    { id: 8, title: 'Paid traffic test', agent_id: 'hank', status: 'todo', priority: 'high', description: 'Facebook/Google ads' },
    { id: 9, title: 'Coordination sprint', agent_id: 'gus', status: 'todo', priority: 'medium', description: 'Phase 2 follow-up' },
    { id: 10, title: 'Security audit', agent_id: 'mike', status: 'todo', priority: 'low', description: 'Healthcheck + monitoring' },
  ]
  return tasks
}

// Get stats
export async function getStats() {
  const agents = await getAgents()
  const tasks = await getTasks()
  const memories = await getMemories()
  
  return {
    agents: agents.length,
    tasks: tasks.length,
    tasksInProgress: tasks.filter(t => t.status === 'in_progress').length,
    tasksDone: tasks.filter(t => t.status === 'done').length,
    memories: memories.length,
    timestamp: new Date().toISOString()
  }
}