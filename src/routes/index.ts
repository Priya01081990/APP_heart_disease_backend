
import { Server, ServerRoute } from '@hapi/hapi'

import { user } from './user'
import { auth } from './auth'
import { dynamic_attributes } from './dynamic-attributes'
import { admin } from './admin'
export const baseRouter:object = {
  name: 'base-route',
  version: '1.0.0',
  register: (server:Server) => {
    server.route(user as Array<ServerRoute>)
    server.route(auth as Array<ServerRoute>)
    server.route(dynamic_attributes as Array<ServerRoute>)
    server.route(admin as Array<ServerRoute>)
  }
}
