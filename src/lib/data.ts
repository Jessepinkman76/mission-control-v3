import fs from 'fs'
import path from 'path'

// Data paths
const DATA_DIR = path.join(process.cwd(), 'data')
const AGENTS_FILE = path.join(DATA_DIR, 'agents-export.json')
const MEMORIES_FILE = path.join(DATA_DIR, 'memories-export.json')
const NOTES_FILE = path.join(DATA_DIR, 'notes.json')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

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

// Get agents
export async function getAgents() {
  const data = readJsonFile(AGENTS_FILE, { agents: [] })
  return data.agents || []
}

// Get memories
export async function getMemories(limit = 50) {
  const data = readJsonFile(MEMORIES_FILE, { memories: [] })
  return (data.memories || []).slice(0, limit)
}

// Get notes
export async function getNotes() {
  const data = readJsonFile(NOTES_FILE, { notes: [] })
  return data.notes || []
}

// Get tasks (from notes for now, or separate file)
export async function getTasks() {
  // For now, return mock tasks until we have a proper tasks file
  const mockTasks = [
    { id: 1, title: 'Audit API Jesse', agent_id: 'jesse', status: 'done', priority: 'high' },
    { id: 2, title: 'Création skills dev', agent_id: 'jesse', status: 'in_progress', priority: 'medium' },
    { id: 3, title: 'Mission Control v3', agent_id: 'jesse', status: 'in_progress', priority: 'high' },
    { id: 4, title: 'Niche research BR', agent_id: 'lydia', status: 'todo', priority: 'high' },
    { id: 5, title: 'SEO audit sites', agent_id: 'saul', status: 'todo', priority: 'medium' },
    { id: 6, title: 'Design landing page', agent_id: 'badger', status: 'in_progress', priority: 'medium' },
    { id: 7, title: 'Setup analytics', agent_id: 'skyler', status: 'done', priority: 'low' },
    { id: 8, title: 'Paid traffic test', agent_id: 'hank', status: 'todo', priority: 'high' },
    { id: 9, title: 'Coordination sprint', agent_id: 'gus', status: 'todo', priority: 'medium' },
    { id: 10, title: 'Security audit', agent_id: 'mike', status: 'todo', priority: 'low' },
  ]
  return mockTasks
}

// Get stats
export async function getStats() {
  const agents = await getAgents()
  const tasks = await getTasks()
  const memories = await getMemories()
  
  return {
    agents: agents.length,
    tasks: tasks.length,
    tasksInProgress: tasks.filter((t: any) => t.status === 'in_progress').length,
    tasksDone: tasks.filter((t: any) => t.status === 'done').length,
    memories: memories.length,
  }
}