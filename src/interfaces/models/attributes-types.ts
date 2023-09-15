import IDynamicAttributes from './dynamic-attributes'

export default interface IAttributes {

  id?: number
  name?: string

  created_at?: Date
  updated_at?: Date

  dynamic_attributes?: IDynamicAttributes[]

}
