import IDynamicAttributes from './dynamic-attributes'

export default interface IDynamicAttributesFieldValues {

  id?: number
  choices?: string

  dynamic_attributes_id?: number
  dynamic_attributes?: IDynamicAttributes

  created_at?: Date
  updated_at?: Date

}
