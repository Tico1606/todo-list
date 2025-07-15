import { InMemoryTasksRepository } from '@/database/in memory/index.ts'
import { NotFoundError } from '@/errors/index.ts'
import { DeleteTaskUseCase } from '@/use-cases/tasks/delete-task-use-case.ts'
import { beforeEach, describe, expect, it } from 'vitest'

describe('DeleteTaskUseCase', () => {
  let tasksRepository: InMemoryTasksRepository
  let useCase: DeleteTaskUseCase

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    useCase = new DeleteTaskUseCase(tasksRepository)
  })

  it('should delete an existing task', async () => {
    const task = await tasksRepository.create({ name: 'Task to delete' })

    await useCase.execute({ taskId: task.id })

    const found = await tasksRepository.findById(task.id)
    expect(found).toBeNull()
  })

  it("should throw ConflictError if task doesn't exist", async () => {
    await expect(() => useCase.execute({ taskId: 'non-existent-id' })).rejects.toThrow(
      NotFoundError,
    )
  })
})
