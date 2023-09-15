import * as Joi from 'joi'
import {
  moduleList,
  symtomsAreaModuleList,
  dynamicAttributesList,
  createEditDynamicAttributes,
  createBulkDynamicAttributesByAdmin,
  attributeList,
  moduleView,
  dynamicAttributeListMLSupprt,
  dynamicAttributesView,
  heartActivity

} from '../controllers/dynamic-attributes'
import { checkAdmin } from '../middleware/check-user'

export const dynamic_attributes = [
  {
    method: 'get',
    path: '/module-list',
    options: {
      description: 'Module list',
      notes: 'Module list',
      tags: ['api', 'dynamic-attributes'],
      pre: [checkAdmin()],
      handler: moduleList
    }
  },
  {
    method: 'get',
    path: '/module',
    options: {
      description: 'Module vieew',
      notes: 'Module view',
      tags: ['api', 'dynamic-attributes'],
      handler: moduleView
    }
  },
  {
    method: 'get',
    path: '/symtomps-module-list',
    options: {
      description: 'Symptoms Module list',
      notes: 'Symptoms Module list',
      tags: ['api', 'dynamic-attributes'],
      handler: symtomsAreaModuleList
    }
  },{
    method: 'get',
    path: '/dynamic-attribute-list',
    options: {
      description: 'Dynamic attribute list',
      notes: 'Dynamic attribute list',
      tags: ['api', 'dynamic-attributes'],
      handler: dynamicAttributesList,
      validate: {
        query: Joi.object({
          module_id: Joi.number().integer().required(),
          user_id: Joi.number().integer(),
          no_of_time_response: Joi.number().integer(),
          visit: Joi.boolean().default(false)
        })
      }
    }
  },{
    method: 'post',
    path: '/add-edit-dynamic-attributes-module-wise',
    options: {
      description: 'Dynamic attribute create and edit',
      notes: 'Dynamic attribute create and edit',
      tags: ['api', 'dynamic-attributes'],
      handler: createEditDynamicAttributes,
      validate: {
        payload: Joi.object({
          module_id: Joi.number().integer().required(),
          dynamic_attributes: Joi.array().items(Joi.object({
            id: Joi.number().integer(),
            module_id: Joi.number().integer().required(),
            year: Joi.string().allow(null).allow(''),
            month: Joi.string   ().allow(null).allow(''),
            name: Joi.string().required(),
            display_name: Joi.string().required(),
            user_id: Joi.number().integer().allow(null),
            no_of_time_response: Joi.number().integer().allow(null),
            attribute_type_id: Joi.number().integer().allow(null),
            attribute_type: Joi.object().keys({
              id: Joi.number().integer(),
              name: Joi.string()
            }).optional().allow(null),
            dynamic_attributes_selected_values:Joi.array().items(Joi.object({
              answer: Joi.string().allow(null).allow(''),
              //dynamic_attribute_id: Joi.number().integer(),
            })).optional(),
            dynamic_attributes_field_values:Joi.array().items(Joi.object({
              choices: Joi.string().allow(null).allow(''),
              //dynamic_attribute_id: Joi.number().integer(),
            })).optional()
          }))

        })
      }
    }
  },
  {
    method: 'post',
    path: '/create-dynamic-attributes',
    options: {
      description: 'Dynamic attribute create',
      notes: 'Dynamic attribute create',
      tags: ['api', 'dynamic-attributes'],
      pre: [checkAdmin()],
      handler: createBulkDynamicAttributesByAdmin,
      validate: {
        payload: Joi.object({
          dynamic_attributes: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            display_name: Joi.string().required(),
            attribute_type_id: Joi.number().integer().required(),
            module_id: Joi.number().integer().required(),
            field_values:Joi.array().items(Joi.object({
              choices: Joi.string().allow(null).allow('')
            })).optional()
          }))

        })
      }
    }
  },
  {
    method: 'get',
    path: '/attribute-type-list',
    options: {
      description: 'Attribute type list',
      notes: 'Attribute type list',
      tags: ['api', 'dynamic-attributes'],
      pre: [checkAdmin()],
      handler: attributeList
    }
  },
  {
    method: 'get',
    path: '/dynamic-attribute-list-ml-support',
    options: {
      description: 'Dynamic attribute list ml support',
      notes: 'Dynamic attribute list ml support',
      tags: ['api', 'dynamic-attributes'],
      handler: dynamicAttributeListMLSupprt,
      validate: {
        query: Joi.object({
          no_of_time_response: Joi.number().integer().required(),
          module_id: Joi.number().integer().required(),
        })
      }
    }
  },
  {
    method: 'get',
    path: '/attribute-view',
    options: {
      description: 'Attribute view',
      notes: 'Attribute view',
      tags: ['api', 'dynamic-attributes'],
      pre: [checkAdmin()],
      handler: dynamicAttributesView,
      validate: {
        query: Joi.object({
          id: Joi.number().integer().required(),
        })
      }
    }
  },{
    method: 'post',
    path: '/user-heart-activity',
    options: {
      description: 'User heart activity',
      notes: 'User heart activity',
      tags: ['api', 'dynamic-attributes'],
      handler: heartActivity,
      validate: {
        payload: Joi.object({
          rate: Joi.string().required(),
          activity: Joi.string().required(),
        })
      }
    }
  },
]
