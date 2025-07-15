import { randomUUID } from 'node:crypto'
import type { ITaskRepository } from '@/interfaces/repositories/index.ts'
import type {
  TaskCreateParams,
  TaskFilterParams,
  TaskUpdateParams,
} from '@/types/index.ts'
import type { Task } from '@prisma/client'

export class InMemoryTasksRepository implements ITaskRepository {
  public items: Task[] = []

  async findById(taskId: string): Promise<Task | null> {
    return this.items.find((task) => task.id === taskId) ?? null
  }

  async findByName(taskName: string): Promise<Task | null> {
    return this.items.find((task) => task.name === taskName) ?? null
  }

  async findMany(params: TaskFilterParams): Promise<Task[]> {
    const { name, checked, due_date, priority, page } = params

    const filtered = this.items.filter((task) => {
      const matchesName = name
        ? task.name.toLowerCase().includes(name.toLowerCase())
        : true

      const matchesChecked = checked !== undefined ? task.checked === checked : true

      const matchesDueDate = due_date
        ? task.due_date
            ?.toISOString()
            .startsWith(new Date(due_date).toISOString().split('T')[0])
        : true

      const matchesPriority = priority ? task.priority === priority : true

      return matchesName && matchesChecked && matchesDueDate && matchesPriority
    })

    const pageSize = 20
    const start = (page - 1) * pageSize
    const end = page * pageSize

    return filtered.slice(start, end)
  }

  async create(data: TaskCreateParams): Promise<Task> {
    const task: Task = {
      id: randomUUID(),
      name: data.name,
      description: data.description ?? null,
      checked: false,
      created_at: new Date(),
      due_date: data.due_date ? new Date(data.due_date) : null,
      priority: data.priority ?? 'MEDIUM',
    }

    this.items.push(task)
    return task
  }

  async update(data: TaskUpdateParams, taskId: string): Promise<Task> {
    const index = this.items.findIndex((task) => task.id === taskId)

    if (index === -1) {
      throw new Error('Task not found')
    }

    const existing = this.items[index]

    const updated: Task = {
      ...existing,
      name: data.name ?? existing.name,
      description: data.description ?? existing.description,
      due_date: data.due_date ? new Date(data.due_date) : existing.due_date,
      priority: data.priority ?? existing.priority,
    }

    this.items[index] = updated
    return updated
  }

  async delete(taskId: string): Promise<void> {
    const index = this.items.findIndex((task) => task.id === taskId)
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
