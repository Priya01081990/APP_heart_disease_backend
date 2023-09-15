import IDynamicAttributes from './dynamic-attributes'

export default interface IModules {

  id?: number
  name?: string
  display_name?: string

  created_at?: Date
  updated_at?: Date
  dynamic_attributes?: IDynamicAttributes[]

}
