import { InMemoryTasksRepository } from '@/database/in memory/index.ts'
import { ConflictError } from '@/errors/index.ts'
import { CreateTaskUseCase } from '@/use-cases/tasks/create-task-use-case.ts'
import { beforeEach, describe, expect, it } from 'vitest'

describe('CreateTaskUseCase', () => {
  let tasksRepository: InMemoryTasksRepository
  let useCase: CreateTaskUseCase

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    useCase = new CreateTaskUseCase(tasksRepository)
  })

  it('should create a new task successfully', async () => {
    const { task } = await useCase.execute({
      taskDto: {
        name: 'New Task',
        description: 'Create a task',
        due_date: '2025-07-20',
        priority: 'HIGH',
      },
    })

    expect(task).toHaveProperty('id')
    expect(task.name).toBe('New Task')
    expect(task.description).toBe('Create a task')
    expect(task.priority).toBe('HIGH')
    expect(task.checked).toBe(false)
  })

  it('should throw ConflictError when task name already exists', async () => {
    await useCase.execute({
      taskDto: { name: 'Duplicate Task' },
    })

    await expect(() =>
      useCase.execute({
        taskDto: { name: 'Duplicate Task' },
      }),
    ).rejects.toThrow(ConflictError)
  })
})
