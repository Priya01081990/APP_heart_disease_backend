import { userActivityAlarm, userList, userView, userWisePredictionDetails } from '../controllers/user'
import { checkAdmin } from '../middleware/check-user'

export const user = [
  {
    method: 'get',
    path: '/user-list',
    options: {
      description: 'User list',
      notes: 'User list',
      tags: ['api', 'user'],
      pre: [checkAdmin()],
      handler: userList
    }
  },
  {
    method: 'get',
    path: '/user-details',
    options: {
      description: 'User view',
      notes: 'User view',
      tags: ['api', 'user'],
      handler: userView,
      auth: 'default',
      // validate: {
      //     query: Joi.object({
      //         id: Joi.number().integer().required()
      //     })
      // }
    }
  },
  {
    method: 'get',
    path: '/user-heart-prediction-status',
    options: {
      description: 'User heart prediction details',
      notes: 'User heart prediction details',
      tags: ['api', 'user'],
      handler: userWisePredictionDetails,
      auth: 'default',
    }
  },
  {
    method: 'get',
    path: '/users-alarm-list',
    options: {
      description: 'User alarm list',
      notes: 'User alarm list',
      tags: ['api', 'user'],
      handler: userActivityAlarm,
      auth: 'default',
    }
  }
]
