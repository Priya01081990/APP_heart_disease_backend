import * as Joi from 'joi'
import { login, signup } from '../controllers/auth'

export const auth = [
  {
    method: 'post',
    path: '/user-login',
    options: {
      description: 'User login',
      notes: 'User login',
      tags: ['api', 'auth'],
      handler: login,
      auth: false,
      validate: {
        payload: Joi.object({
          email:  Joi.string().email().required(),
          password: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'post',
    path: '/user-signup',
    options: {
      description: 'User signup',
      notes: 'User signup',
      tags: ['api', 'auth'],
      handler: signup,
      auth: false,
      validate: {
        payload: Joi.object({
          email:  Joi.string().email().required(),
          password: Joi.string().required(),
          name: Joi.string().required(),
          ph_no: Joi.string().required(),
          address: Joi.string().required(),
          age: Joi.string().required(),
          type: Joi.string().required(),
          gender: Joi.string().required(),
        })
      }
    }
  }
]
