import * as Hapi from '@hapi/hapi'
import { type Server } from '@hapi/hapi'
import * as dotenv from 'dotenv'
dotenv.config()
const server: Server = Hapi.server({
  port: process.env.PORT,
  host: 'localhost',
  // debug: {
  //   log: '*',
  //   request: '*'
  // },
  routes: {
    cors: {
      origin: ['*'],
      headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
      exposedHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      additionalExposedHeaders: ['Accept'],
      maxAge: 60,
      credentials: true
    },
    validate: {
      failAction: async (req, res, err) => {
        return err
      },
      options: {
        abortEarly: false
      }
    }
  }
})

export default server
