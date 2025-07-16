import { HTTP_STATUS_CODE } from '@/constants/index.ts'
import { taskRepository } from '@/database/index.ts'
import { CreateTaskUseCase } from '@/use-cases/index.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod/v4'

export const createTaskBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  due_date: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
})

type CreateTaskRequest = z.infer<typeof createTaskBodySchema>

export async function CreateTaskController(
  request: FastifyRequest<{ Body: CreateTaskRequest }>,
  reply: FastifyReply,
) {
  const taskDto = request.body

  const useCase = new CreateTaskUseCase(taskRepository)

  const task = await useCase.execute({ taskDto })

  return reply.status(HTTP_STATUS_CODE.created).send({ task })
}
