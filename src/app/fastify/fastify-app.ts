// import fastifyJwt from "@fastify/jwt";
// import fastifyCookie from "@fastify/cookie";
import { env } from '@/constants/index.ts'
import type { IServerApp } from '@/interfaces/handlers/server-app.ts'
import fastify, { type FastifyInstance } from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { ZodError } from 'zod'

export class FastifyApp implements IServerApp {
  private readonly app: FastifyInstance

  constructor() {
    this.app = fastify().withTypeProvider<ZodTypeProvider>()
    this.app.setSerializerCompiler(serializerCompiler)
    this.app.setValidatorCompiler(validatorCompiler)
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
