import { PrismaClient } from '@prisma/client'
import { type ResponseToolkit } from '@hapi/hapi'
import response from '../response/macors'

const { user: User } = new PrismaClient()
const prisma = new PrismaClient()

const userListTypeWise = async (req: any, res: ResponseToolkit) => {
  try {
    let userList: any = await User.groupBy({
      by: ['type'],
      _count: {
        id: true
      }
    })

    userList = userList.map((item: any) => {
      return {
        name: item.type,
        value: item._count.id
      }
    })

    return response.success(userList, 'Successfull')(res)
  } catch (err) {
    return response.error({}, err.message)(res)
  }
}

const monthWiseUserJoined = async (req: any, res: ResponseToolkit) => {
  try {
    let userList: any = await prisma.$queryRaw`SELECT
        DATE_TRUNC('month',created_at) AS  month_joined,
        COUNT(id) AS count
        FROM users 
        GROUP BY DATE_TRUNC('month',created_at);`

    // let userList1: IUser[] = await prisma.$queryRaw`SELECT
    // DATE_TRUNC('year',created_at) AS  year_joined,
    // COUNT(id) AS count
    // FROM users
    // GROUP BY DATE_TRUNC('year',created_at);`
    // // console.log(userList, userList1)

    //         SELECT
    //   DATEPART(YEAR, production_timestamp) AS year,
    //   DATEPART(MONTH, production_timestamp) AS month,
    //   COUNT(id) AS count
    // FROM furniture
    // GROUP BY
    //   DATEPART(MONTH, production_timestamp),
    //   DATEPART(YEAR, production_timestamp);
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    userList = userList.map((item: any) => {
      const getMonth = new Date(item.month_joined).getMonth()
      return {
        month: month[getMonth],
        user: Number(item.count)
      }
    })
    return response.success(userList, 'Successfull')(res)
  } catch (err) {
    // console.log(err)
    return response.error({ err }, err.message)(res)
  }
}

const yearWiseUserJoined = async (req: any, res: ResponseToolkit) => {
  try {
    let userList: any = await prisma.$queryRaw`SELECT
        DATE_TRUNC('year',created_at) AS  year_joined,
        COUNT(id) AS count
        FROM users 
        GROUP BY DATE_TRUNC('year',created_at);`

    userList = userList.map((item: any) => {
      const getYear = new Date(item.year_joined).getFullYear()
      return {
        month: getYear,
        value: Number(item.count)
      }
    })
    return response.success(userList, 'Successfull')(res)
  } catch (err) {
    // console.log(err)
    return response.error({ err }, err.message)(res)
  }
}

export {
  userListTypeWise,
  monthWiseUserJoined,
  yearWiseUserJoined
}
