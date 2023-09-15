import { ResponseToolkit } from '@hapi/hapi'

function success (data: any, message = 'Success', statusCode: any = 200) {
  return (res: ResponseToolkit) => res.response({
    statusCode,
    message,
    data
  }).code(statusCode)
}

function error (data: any, message = 'Error', statusCode: any = 500) {
  return (res: ResponseToolkit) => res.response({
    statusCode,
    message,
    data
  }).code(statusCode)
}

function redirect (url: string) {
  return (res: ResponseToolkit) => res.redirect(url)
}

export default {
  success,
  error,
  redirect
}
