import { PrismaClient } from '@prisma/client'
import { Request, ResponseToolkit } from '@hapi/hapi'
import response from '../response/macors'
import IUser from '../interfaces/models/user'

const { user: User, prediction: Prediction, heartActivityAlarm: HeartActivityAlarm } = new PrismaClient()

const userList = async (req: Request, res: ResponseToolkit) => {
  try {
    const list = await User.findMany({
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
    }) as IUser[]

    const msg = list.length > 0 ? 'List fetched successfully' : 'No list found'

    return response.success(list, msg)(res)
  } catch (err) {
    // console.log(err)
    return response.error(err.message)(res)
  }
}

const userView = async (req: any, res: ResponseToolkit) => {
  try {
    const { id } = req.user
    const view = await User.findFirst({
      where: {
        id
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

    const msg = view ? 'User fetched successfully' : 'No user found'
    return response.success(view, msg)(res)
  } catch (err) {
    // console.log(err)
    return response.error(err.message)(res)
  }
}

const userWisePredictionDetails =async (req:any, res: ResponseToolkit) => {
  try {
    const prediction = await Prediction.findFirst({
      where: {
        user_id: req.user.id
      },
      select: {
        id: true,
        prediction: true
      }
    })
    const msg = prediction ? prediction.prediction ? `Hello ${req.user.name}, your current status is not good.` : `Hello ${req.user.name}, your current status is healthy.` : `Hello ${req.user.name}, your status record not found.`

    return response.success({}, msg)(res)
  } catch (err) {
    return response.error(err.message)(res)
  }
}

const userActivityAlarm =async (req:any, res: ResponseToolkit) => {
  try {
    const usersAlarm = await HeartActivityAlarm.findMany({
      select: {
        user: {
          select: {
            name: true
          }
        },
        id: true,
        confidence: true,
        description: true,
        alarm: true,
        heart_rate: true,
        alarm_set_date_time: true,
        lat: true,
        long: true
      }
    })

    return response.success(usersAlarm, 'List fetched successfully')(res)
  } catch (err) {
    return response.error(err.message)(res)
  }
}

export {
  userList,
  userView,
  userWisePredictionDetails,
  userActivityAlarm
}
