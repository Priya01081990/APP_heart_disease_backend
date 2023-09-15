import jwt from 'jsonwebtoken'

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY)
  } catch (error) {
    return (error.message)
  }
}

export default verifyToken
