import type { ITaskRepository } from '@/interfaces/index.ts'
import type { TaskPriority } from '@/types/task-priority.ts'

type Request = {
  name?: string
  checked?: boolean
  due_date?: string
  priority?: string
  page: number
}

export class ListTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute({ name, checked, due_date, priority, page }: Request) {
    const tasks = await this.taskRepository.findMany({
      name,
      checked,
      due_date: due_date ? new Date(due_date) : undefined,
      priority: priority ? (priority as TaskPriority) : undefined,
      page,
    })

    return { tasks }
  }
}
