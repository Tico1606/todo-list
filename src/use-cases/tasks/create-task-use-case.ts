import type { TaskDto } from '@/dtos/task-dto.ts'
import { ConflictError, NotFoundError } from '@/errors/index.ts'
import type { ITaskRepository } from '@/interfaces/index.ts'

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

    const task = await this.taskRepository.create(taskDto)

    return { task }
  }
}
