import * as  Hapi from '@hapi/hapi'
import * as HapiSwagger from 'hapi-swagger'
import * as Inert from '@hapi/inert'
import * as Vision from '@hapi/vision'


const swaggerOptions: HapiSwagger.RegisterOptions = {
  documentationPath: '/patient-med-docs',
  basePath: '/api',
  info: {
    title: 'Patient Med API Documentation'
  },
  securityDefinitions: {
    basicAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  grouping: 'tags',
  security: [{ basicAuth: [] }],
  schemes: process.env.SWAGGER_ENVIRONMENT === 'SERVER' ? ['https'] : ['http']

}

const serverPlugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
    plugin: Inert
  },
  {
    plugin: Vision
  },
  {
    plugin: HapiSwagger,
    options: swaggerOptions
  }
]

export default serverPlugins
