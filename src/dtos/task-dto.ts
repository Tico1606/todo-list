import type { TaskPriority } from '@/types/index.ts'

export type TaskDto = {
  id?: string
  name: string
  description?: string
  due_date?: Date
  priority?: TaskPriority
}
