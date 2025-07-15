import { InMemoryTasksRepository } from '@/database/in memory/index.ts'
import { NotFoundError } from '@/errors/index.ts'
import { UpdateTaskUseCase } from '@/use-cases/tasks/update-task-use-case.ts'
import { beforeEach, describe, expect, it } from 'vitest'

describe('UpdateTaskUseCase', () => {
  let tasksRepository: InMemoryTasksRepository
  let useCase: UpdateTaskUseCase

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    useCase = new UpdateTaskUseCase(tasksRepository)
  })

  it('should update an existing task', async () => {
    const task = await tasksRepository.create({
      name: 'Old Task',
      description: 'Old desc',
    })

    const { task: updatedTask } = await useCase.execute({
      taskId: task.id,
      taskDto: { name: 'Updated Task', description: 'Updated desc' },
    })

    expect(updatedTask.name).toBe('Updated Task')
    expect(updatedTask.description).toBe('Updated desc')
  })

  it("should throw ConflictError if task doesn't exist", async () => {
    await expect(() =>
      useCase.execute({ taskId: 'non-existent-id', taskDto: { name: 'Name' } }),
    ).rejects.toThrow(NotFoundError)
  })
})
