import { taskRepository } from '@/database/index.ts'
import { DeleteTaskUseCase } from '@/use-cases/index.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod/v4'

export const deleteTaskParamsSchema = z.object({
  taskId: z.uuid(),
})

type DeleteTaskParams = z.infer<typeof deleteTaskParamsSchema>

export async function DeleteTaskController(
  request: FastifyRequest<{ Params: DeleteTaskParams }>,
  reply: FastifyReply,
) {
  const taskId = request.params.taskId

  const useCase = new DeleteTaskUseCase(taskRepository)

  await useCase.execute({ taskId })

  return reply.send(null)
}
