import { HTTP_STATUS_CODE } from '@/constants/index.ts'
import { taskRepository } from '@/database/index.ts'
import { GetTasksUseCase } from '@/use-cases/index.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function GetTasksController(request: FastifyRequest, reply: FastifyReply) {
  const useCase = new GetTasksUseCase(taskRepository)

  const tasks = await useCase.execute()

  reply.status(HTTP_STATUS_CODE.ok).send(tasks)
}
