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
      due_date: new Date('2025-08-25'),
    })

    await tasksRepository.create({
      name: 'Task Two',
      priority: 'LOW',
      due_date: new Date('2025-08-24'),
    })
    
    await tasksRepository.create({ name: 'Another Task', priority: 'MEDIUM' })

    const tasks = await useCase.execute({
      name: 'Task',
      checked: false,
      due_date: '2025-08-25',
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

    const tasks1 = await useCase.execute({ page: 1 })
    const tasks2 = await useCase.execute({ page: 2 })
    const tasks3 = await useCase.execute({ page: 3 })

    expect(tasks1).toHaveLength(10)
    expect(tasks2).toHaveLength(10)
    expect(tasks3).toHaveLength(5)
  })
})
