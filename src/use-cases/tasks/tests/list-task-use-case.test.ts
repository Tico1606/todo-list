import { InMemoryTasksRepository } from '@/database/in memory/index.ts'
import { ListTaskUseCase } from '@/use-cases/tasks/list-task-use-case.ts'
import { beforeEach, describe, expect, it } from 'vitest'

describe('ListTaskUseCase', () => {
  let tasksRepository: InMemoryTasksRepository
  let useCase: ListTaskUseCase

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    useCase = new ListTaskUseCase(tasksRepository)
  })

  it('should list tasks with filters and pagination', async () => {
    await tasksRepository.create({
      name: 'Task One',
      priority: 'HIGH',
      due_date: new Date(),
    })
    await tasksRepository.create({
      name: 'Task Two',
      priority: 'LOW',
      due_date: new Date(),
    })
    await tasksRepository.create({ name: 'Another Task', priority: 'MEDIUM' })

    const { tasks } = await useCase.execute({
      name: 'Task',
      checked: false,
      due_date: new Date(),
      priority: 'HIGH',
      page: 1,
    })

    expect(tasks.length).toBeGreaterThan(0)
    expect(tasks.every((task) => task.name.includes('Task'))).toBe(true)
  })

  it('should paginate correctly', async () => {
    for (let i = 1; i <= 25; i++) {
      await tasksRepository.create({ name: `Task ${i}` })
    }

    const { tasks: page1 } = await useCase.execute({ page: 1 })
    const { tasks: page2 } = await useCase.execute({ page: 2 })

    expect(page1).toHaveLength(20)
    expect(page2).toHaveLength(5)
  })
})
