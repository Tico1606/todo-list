import {
  CreateTaskController,
  DeleteTaskController,
  GetTasksController,
  ListTaskController,
  UpdateTaskController,
  createTaskBodySchema,
  deleteTaskParamsSchema,
  getTasksQuerySchema,
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
        querystring: getTasksQuerySchema,
      },
    },
    GetTasksController,
  )

  app.get(
    '/list',
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
