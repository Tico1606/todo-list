import type { TaskDto } from '@/dtos/task-dto.ts'
import { NotFoundError } from '@/errors/index.ts'
import type { ITaskRepository } from '@/interfaces/index.ts'

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

    const task = await this.taskRepository.update(taskDto, taskId)

    return { task }
  }
}
