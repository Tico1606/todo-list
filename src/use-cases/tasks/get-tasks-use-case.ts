import type { ITaskRepository } from '@/interfaces/index.ts'

export class GetTasksUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute() {
    const tasks = await this.taskRepository.getTasks()

    return { tasks }
  }
}
