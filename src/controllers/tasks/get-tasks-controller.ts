import { HTTP_STATUS_CODE } from '@/constants/index.ts'
import { taskRepository } from '@/database/index.ts'
import { ListTaskUseCase } from '@/use-cases/index.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod/v4'

export const getTasksQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
})

type GetTasksQuery = z.infer<typeof getTasksQuerySchema>

export async function GetTasksController(
  request: FastifyRequest<{ Querystring: GetTasksQuery }>,
  reply: FastifyReply,
) {
  const { page } = request.query

  const useCase = new ListTaskUseCase(taskRepository)

  const tasks = await useCase.execute({ page })

  reply.status(HTTP_STATUS_CODE.ok).send(tasks)
}
