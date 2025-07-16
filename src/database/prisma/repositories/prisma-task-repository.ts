import type { ITaskRepository } from '@/interfaces/index.ts'
import type {
  TaskCreateParams,
  TaskFilterParams,
  TaskUpdateParams,
} from '@/types/index.ts'
import type { Task } from '@prisma/client'
import dayjs from 'dayjs'
import { prisma } from '../prisma-client.ts'
import { PrismaError } from '../prisma-error.ts'

export class PrismaTaskRepository implements ITaskRepository {
  async findById(taskId: string): Promise<Task | null> {
    try {
      const task = await prisma.task.findUnique({
        where: {
          id: taskId,
        },
      })

      return task
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findByName(taskName: string): Promise<Task | null> {
    try {
      const task = await prisma.task.findUnique({
        where: {
          name: taskName,
        },
      })

      return task
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findMany(params: TaskFilterParams): Promise<Task[]> {
    const endOfDate = params.due_date
      ? dayjs(params.due_date).endOf('date').toDate()
      : undefined

    try {
      const tasks = await prisma.task.findMany({
        where: {
          ...(params.name && {
            name: {
              contains: params.name,
              mode: 'insensitive',
            },
          }),
          ...(typeof params.checked === 'boolean' && {
            checked: params.checked,
          }),
          ...(params.due_date && {
            due_date: {
              lte: endOfDate,
            },
          }),
          ...(params.priority && {
            priority: {
              equals: params.priority,
            },
          }),
        },
        take: 10,
        skip: (params.page - 1) * 10,
      })

      return tasks
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async create(data: TaskCreateParams): Promise<Task> {
    const due_date = data.due_date ? dayjs(data.due_date).endOf('date').toDate() : null

    try {
      const task = await prisma.task.create({
        data: {
          ...data,
          due_date,
        },
      })

      return task
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async update(data: TaskUpdateParams, taskId: string): Promise<Task> {
    const due_date = data.due_date ? dayjs(data.due_date).endOf('date').toDate() : null

    try {
      const task = await prisma.task.update({
        data: {
          name: data.name,
          description: data.description,
          checked: data.checked,
          due_date: due_date,
          priority: data.priority,
        },
        where: { id: taskId },
      })

      return task
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async delete(taskId: string): Promise<void> {
    try {
      await prisma.task.delete({
        where: {
          id: taskId,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }
}
