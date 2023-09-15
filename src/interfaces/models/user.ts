import IDynamicAttributes from './dynamic-attributes'

export default interface IUser {

  id?: number
  name?: string
  email?: string
  password?: string
  ph_no?: string
  address?: string
  type?: string
  age?: string
  gender?: string
  login_status?: boolean
  created_at?: Date
  updated_at?: Date
  dynamic_attributes?: IDynamicAttributes[]

}
