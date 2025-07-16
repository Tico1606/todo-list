import type { TaskPriority } from '@/types/task-priority.ts'

export type TaskCreateParams = {
  name: string
  description?: string
  due_date?: Date
  priority?: TaskPriority
}
