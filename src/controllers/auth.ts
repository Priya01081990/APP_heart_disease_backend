import { PrismaClient } from '@prisma/client'
import { ResponseToolkit } from '@hapi/hapi'
import response from '../response/macors'
import IUser from '../interfaces/models/user'
import { verifyPassword, hashPassword } from '../services/password'
import jwt from 'jsonwebtoken'
const { user: User } = new PrismaClient()

const login = async (req: any, res: ResponseToolkit) => {
  try {
    const { email, password } = req.payload

    const getUser = await User.findFirst({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        ph_no: true,
        address: true,
        type: true,
        age: true,
        gender: true
      }
    }) as IUser

    if (!getUser) {
      return response.error({}, 'Email is not correct')(res)
    }

    const hashedPassword = getUser.password

    const checkPassword = await verifyPassword(password, hashedPassword)

    if (checkPassword) {
      const token = jwt.sign(
        {
          id: getUser.id
        },
        process.env.SECRET_KEY,
        { expiresIn: '365d' }
      )

      delete getUser.password
      return response.success({ token, user: getUser }, 'User logged in successfully')(res)
    } else {
      return response.error({}, 'Password is not correct')(res)
    }
  } catch (err) {
    // console.log(err)
    return response.error(err.message)(res)
  }
}

const signup = async (req: any, res: ResponseToolkit) => {
  try {
    const { email, password, name, ph_no, address, type, age, gender } = req.payload

    const getUserEmail = await User.findFirst({
      where: {
        email
      },
      select: {
        id: true
      }
    }) as IUser

    if (getUserEmail) {
      return response.error({}, 'Email is already present')(res)
    }

    const getUserPh = await User.findFirst({
      where: {
        ph_no
      },
      select: {
        id: true
      }
    }) as IUser

    if (getUserPh) {
      return response.error({}, 'Phone number is already present')(res)
    }

    const hashPass: any = await hashPassword(password)

    await User.create({
      data: {
        email,
        name,
        ph_no,
        address,
        password: hashPass,
        age,
        type,
        gender
      }
    }) as IUser

    return response.success({}, 'Registration complete')(res)
  } catch (err) {
    // console.log(err)
    return response.error(err.message)(res)
  }
}

export {
  login,
  signup
}
