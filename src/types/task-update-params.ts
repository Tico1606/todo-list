import type { TaskPriority } from '@/types/task-priority.ts'

export type TaskUpdateParams = {
  name?: string
  description?: string
  due_date?: Date | string
  priority?: TaskPriority
}
