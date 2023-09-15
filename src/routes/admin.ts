// import * as Joi from 'joi'

import { checkAdmin } from '../middleware/check-user'
import { monthWiseUserJoined, userListTypeWise, yearWiseUserJoined } from '../controllers/admin'

export const admin = [
  {
    method: 'get',
    path: '/type-wise-user-list',
    options: {
      description: 'User list',
      notes: 'User list',
      tags: ['api', 'admin'],
      pre: [checkAdmin()],
      handler: userListTypeWise
    }
  }, {
    method: 'get',
    path: '/month-wise-user-joined',
    options: {
      description: 'User list',
      notes: 'User list',
      tags: ['api', 'admin'],
      pre: [checkAdmin()],
      handler: monthWiseUserJoined
    }
  }, {
    method: 'get',
    path: '/year-wise-user-joined',
    options: {
      description: 'User list',
      notes: 'User list',
      tags: ['api', 'admin'],
      pre: [checkAdmin()],
      handler: yearWiseUserJoined
    }
  }
]
