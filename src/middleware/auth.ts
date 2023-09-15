import { ResponseToolkit } from '@hapi/hapi'
import { PrismaClient } from '@prisma/client'
import verifyToken from './auth-helper'
import response from '../response/macors'
import IUser from '../interfaces/models/user'
import Boom from '@hapi/boom'
const { user: User } = new PrismaClient()

export = () => {
  return {
    authenticate: async (req: any, res: ResponseToolkit) => {
      try {
        let { authorization } = req.headers

        authorization = authorization.split(' ')[0] === 'Basic' ? null : authorization

        if (!authorization) {
          return Boom.unauthorized('User is not authorized.')
        }

        const data = verifyToken(authorization)

        if (!data) {
          return Boom.unauthorized('Invalid token')
        }
        const userDetails = await User.findFirst({
          where: {
            id: data?.id
          },
          select: {
            id: true,
            name: true,
            email: true,
            ph_no: true,
            address: true,
            type: true,
            age: true,
            gender: true
          }
        }) as IUser

        if (!userDetails) {
          return response.error({}, 'User is not authorized.')(res)
        }
        req.user = userDetails
        return res.continue
      } catch (err) {
        return Boom.unauthorized('User is not authorized.')
        // return response.error({}, 'User is not authorized.')(res).takeover()//new Error(err.message)
      }
    }
  }
}
