import type { TaskPriority } from './task-priority.ts'

export type TaskFilterParams = {
  name?: string
  checked?: boolean
  due_date?: Date
  priority?: TaskPriority
  page: number
}
