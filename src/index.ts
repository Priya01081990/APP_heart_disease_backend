import * as Hapi from '@hapi/hapi'
import { baseRouter } from './routes'
import * as dotenv from 'dotenv'
import basicAuth from 'basic-auth'
import server from './config/server'
import authMiddleware from './middleware/auth'
import serverPlugins from './config/plugin'
import logger from './config/logger'

dotenv.config()

const init = async () => {
  server.ext('onRequest', (req: any, h: any) => {
    const route = req.url.pathname
    // // console.log(route)
    if (route === '/patient-med-docs' || route === '/swagger.json') {
      const user = basicAuth(req)
      if (user === undefined || user.name !== process.env.SWAGGER_UNAME || user.pass !== process.env.SWAGGER_PASSWORD) {
        return h.response('Unauthorized')
          .code(401)
          .header('WWW-Authenticate', 'Basic realm="Node"')
          .takeover()
      }
    }
    return h.continue
  })

  // Auth

  server.auth.scheme('custom', authMiddleware)
  server.auth.strategy('default', 'custom')
  server.auth.default('default')

  await server.register(serverPlugins)

  await server.register(baseRouter as Array<Hapi.ServerRegisterPluginObject<any>>, {
    routes: {
      prefix: '/api'
    }
  })

  server.events.on('response', function (request: any) {
    // console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.path + ' --> ' + request.response.statusCode + ' time --> ' + Number(request?.info?.completed - request?.info?.responded))
    logger.info(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.path + ' --> ' + request.response.statusCode + ' time --> ')
  })

  await server.start()

  logger.info('Server running on '+ server.info.uri)
  // console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  // console.log(err)
  logger.error(err)
  process.exit(1)
})

init()
