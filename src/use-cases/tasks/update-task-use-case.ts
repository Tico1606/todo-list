import type { TaskDto } from '@/dtos/task-dto.ts'
import { NotFoundError } from '@/errors/index.ts'
import type { ITaskRepository } from '@/interfaces/index.ts'
import type { TaskPriority } from '@/types/index.ts'

type Request = {
  taskDto: Partial<TaskDto>
  taskId: string
}

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute({ taskDto, taskId }: Request) {
    const existingTask = await this.taskRepository.findById(taskId)

    if (!existingTask) {
      throw new NotFoundError("Task doesn't exist")
    }

    const taskToUpdate = {
      ...taskDto,
      due_date: taskDto.due_date ? new Date(taskDto.due_date) : undefined,
      priority: taskDto.priority ? (taskDto.priority as TaskPriority) : undefined,
    }

    const task = await this.taskRepository.update(taskToUpdate, taskId)

    return { task }
  }
}
