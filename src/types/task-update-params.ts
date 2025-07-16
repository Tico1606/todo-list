import type { TaskPriority } from '@/types/task-priority.ts'

export type TaskUpdateParams = {
  name?: string
  description?: string
  checked?: boolean
  due_date?: Date
  priority?: TaskPriority
}
