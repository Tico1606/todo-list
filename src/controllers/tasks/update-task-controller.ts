import { taskRepository } from '@/database/index.ts'
import { UpdateTaskUseCase } from '@/use-cases/index.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod/v4'

export const updateTaskParamsSchema = z.object({
  taskId: z.uuid(),
})

export const updateTaskBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  checked: z.boolean().optional(),
  due_date: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
})

type UpdateTaskParams = z.infer<typeof updateTaskParamsSchema>

type UpdateTaskRequest = z.infer<typeof updateTaskBodySchema>

export async function UpdateTaskController(
  request: FastifyRequest<{ Params: UpdateTaskParams; Body: UpdateTaskRequest }>,
  reply: FastifyReply,
) {
  const taskId = request.params.taskId

  const taskDto = request.body

  const useCase = new UpdateTaskUseCase(taskRepository)

  const task = await useCase.execute({ taskDto, taskId })

  return reply.send({ task })
}
