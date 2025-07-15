import { NotFoundError } from '@/errors/index.ts'
import type { ITaskRepository } from '@/interfaces/index.ts'

type Request = {
  taskId: string
}

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute({ taskId }: Request) {
    const existingTask = await this.taskRepository.findById(taskId)

    if (!existingTask) {
      throw new NotFoundError("Task doesn't exist")
    }

    await this.taskRepository.delete(taskId)
  }
}
