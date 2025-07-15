import type { ITaskRepository } from '@/interfaces/index.ts'
import type { TaskPriority } from '@/types/task-priority.ts'

type Request = {
  name?: string
  checked?: boolean
  due_date?: Date
  priority?: TaskPriority
  page: number
}

export class ListTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute({ name, checked, due_date, priority, page }: Request) {
    const tasks = await this.taskRepository.findMany({
      name,
      checked,
      due_date,
      priority,
      page,
    })

    return { tasks }
  }
}
