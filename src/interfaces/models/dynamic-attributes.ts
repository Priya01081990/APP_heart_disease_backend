import IAttributes from './attributes-types'
import IDynamicAttributesFieldValues from './dynamic-attributes-field-values'
import IDynamicAttributesSelectedValues from './dynamic-attributes-selected-values'
import IModules from './module'
import IUser from './user'

export default interface IDynamicAttributes {

  id?: number
  name?: string
  display_name?: string
  no_of_time_response?: number

  attribute_type_id?: number
  attribute_type?: IAttributes

  user_id?: number
  user?: IUser

  module_id?: number
  module?: IModules

  year?: string
  month?: string

  created_at?: Date
  updated_at?: Date

  dynamic_attributes_field_values?: IDynamicAttributesFieldValues[]
  dynamic_attributes_selected_values?: IDynamicAttributesSelectedValues

}
