import { HTTP_STATUS_CODE } from '@/constants/index.ts'
import { taskRepository } from '@/database/index.ts'
import { ListTaskUseCase } from '@/use-cases/index.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod/v4'

export const listTaskQuerySchema = z.object({
  name: z.string().optional(),
  checked: z.boolean().optional(),
  due_date: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  page: z.coerce.number().optional().default(1),
})

type ListTaskQuery = z.infer<typeof listTaskQuerySchema>

export async function ListTaskController(
  request: FastifyRequest<{ Querystring: ListTaskQuery }>,
  reply: FastifyReply,
) {
  const { name, checked, due_date, priority, page } = request.query

  const useCase = new ListTaskUseCase(taskRepository)

  const listedTasks = await useCase.execute({
    name,
    checked,
    due_date,
    priority,
    page,
  })

  reply.status(HTTP_STATUS_CODE.ok).send(listedTasks)
}
