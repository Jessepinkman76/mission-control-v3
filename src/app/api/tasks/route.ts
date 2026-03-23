import { NextResponse } from 'next/server'
import { getTasks } from '@/lib/data'

export async function GET() {
  try {
    const tasks = await getTasks()
    return NextResponse.json({ tasks, count: tasks.length })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}