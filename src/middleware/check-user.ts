import Boom from '@hapi/boom'

const checkAdmin = () => {
  return (req: any) => {
    const { type } = req.user

    if (type !== 'Admin') {
      throw Boom.forbidden('User has no admin access')
    }

    return true
  }
}

export {
  checkAdmin
}
