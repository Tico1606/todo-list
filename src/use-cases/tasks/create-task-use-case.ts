import type { TaskDto } from '@/dtos/task-dto.ts'
import { ConflictError, NotFoundError } from '@/errors/index.ts'
import type { ITaskRepository } from '@/interfaces/index.ts'
import type { TaskPriority } from '@/types/index.ts'

type Request = {
  taskDto: TaskDto
}

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute({ taskDto }: Request) {
    const existingTask = await this.taskRepository.findByName(taskDto.name)

    if (existingTask) {
      throw new ConflictError('Already exist one task with this name')
    }

    const taskToCreate = {
      ...taskDto,
      due_date: taskDto.due_date ? new Date(taskDto.due_date) : undefined,
      priority: taskDto.priority ? (taskDto.priority as TaskPriority) : undefined,
    }

    const task = await this.taskRepository.create(taskToCreate)

    return { task }
  }
}
