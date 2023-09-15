import IDynamicAttributes from './dynamic-attributes'

export default interface IDynamicAttributesSelectedValues {

  id?: number
  answer?: string

  dynamic_attributes_id?: number
  dynamic_attributes?: IDynamicAttributes

  created_at?: Date
  updated_at?: Date

}
