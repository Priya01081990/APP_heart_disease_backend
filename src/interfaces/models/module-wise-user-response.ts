import IModules from './module'
import IUser from './user'

export default interface IModuleWiseUserResponse {

  id?: number
  total_visit?: number

  user_id?: number
  user?: IUser

  module_id?: number
  module?: IModules

}
