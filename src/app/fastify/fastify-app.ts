import type { IServerApp } from '@/core/interfaces'
// import fastifyJwt from "@fastify/jwt";
// import fastifyCookie from "@fastify/cookie";
import Fastify, { type FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import { env } from '../../env'

export class FastifyApp implements IServerApp {
  private readonly app: FastifyInstance

  constructor() {
    this.app = Fastify()
    this.setErrorHandler()
    // app.register(fastifyJwt, {
    //   secret: env.JWT_SECRET,
    //   cookie: {
    //     cookieName: 'refreshToken',
    //     signed: false,
    //   },
    //   sign: {
    //     expiresIn: '10m',
    //   },
    // })

    // app.register(fastifyCookie)
  }

  startServer() {
    this.app
      .listen({
        host: '0.0.0.0',
        port: env.PORT,
      })
      .then(() => {
        console.log('༼ つ ◕_◕ ༽つ HTTP Server Running')
      })
  }

  stopServer() {}

  private setErrorHandler() {
    this.app.setErrorHandler((error, _, reply) => {
      if (error instanceof ZodError) {
        return reply
          .status(400)
          .send({ message: 'Validation error.', issues: error.format() })
      }

      if (env.NODE_ENV !== 'production') {
        console.error(error)
      }

      return reply.status(500).send({ message: 'Internal server error' })
    })
  }
}
