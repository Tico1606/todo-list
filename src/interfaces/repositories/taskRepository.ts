import type {
  TaskCreateParams,
  TaskFilterParams,
  TaskUpdateParams,
} from '@/types/index.ts'
import type { Task } from '@prisma/client'

export interface ITaskRepository {
  findById(taskId: string): Promise<Task | null>
  findByName(taskName: string): Promise<Task | null>
  findMany(params: TaskFilterParams): Promise<Task[]>
  create(data: TaskCreateParams): Promise<Task>
  update(data: TaskUpdateParams, taskId: string): Promise<Task>
  delete(taskId: string): Promise<void>
}
