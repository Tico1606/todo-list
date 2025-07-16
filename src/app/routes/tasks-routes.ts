import {
  CreateTaskController,
  DeleteTaskController,
  ListTaskController,
  UpdateTaskController,
  createTaskBodySchema,
  deleteTaskParamsSchema,
  listTaskQuerySchema,
  updateTaskBodySchema,
  updateTaskParamsSchema,
} from '@/controllers/index.ts'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'

export const TasksRoutes: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/',
    {
      schema: {
        body: createTaskBodySchema,
      },
    },
    CreateTaskController,
  )

  app.get(
    '/',
    {
      schema: {
        querystring: listTaskQuerySchema,
      },
    },
    ListTaskController,
  )

  app.patch(
    '/:taskId',
    {
      schema: {
        params: updateTaskParamsSchema,
        body: updateTaskBodySchema,
      },
    },
    UpdateTaskController,
  )

  app.delete(
    '/:taskId',
    {
      schema: {
        params: deleteTaskParamsSchema,
      },
    },
    DeleteTaskController,
  )
}
