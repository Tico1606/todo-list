import type { TaskDto } from '@/dtos/index.ts'

export interface IHttp {
  getBody<Body>(): Body
  getRouteParams<RouteParams>(): RouteParams
  getQueryParams<QueryParams>(): QueryParams
  getCurrentRoute(): string
  getTask(): Promise<TaskDto>
  send(data: unknown, statusCode?: number): unknown
  pass(): unknown
}
