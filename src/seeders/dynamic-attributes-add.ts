import { PrismaClient } from '@prisma/client'
const {
  module: Module,
  dynamicAttributes: DynamicAttributes,
  //   dynamicAttributesFieldValues: DynamicAttributesField_values,
  //   dynamicAttributesSelectedValues: DynamicAttributesSelectedValues,
  attributeTypes: AttributeType
} = new PrismaClient();

(async ()=> {
  const data: any = [{
    name: 'Diabeties',
    attribute_type: 'checkbox',
    module: 'questions'
  },{
    name: 'Blood pressure count',
    attribute_type: 'number',
    module: 'questions'
  },{
    name: 'Blood pressure count',
    attribute_type: 'number',
    module: 'questions'
  },{
    name: 'Serum sodium count',
    attribute_type: 'number',
    module: 'questions'
  },{
    name: 'Cholesterol count',
    attribute_type: 'number',
    module: 'questions'
  },{
    name: 'Heart disease',
    attribute_type: 'number',
    module: 'questions'
  },{
    name: 'BMI level count',
    attribute_type: 'number',
    module: 'questions'
  },{
    name: 'Smoking status',
    attribute_type: 'number',
    module: 'questions',
    values: [{
      choices: 'High'
    },{
      choices: 'Mid'
    },{
      choices: 'Low'
    }]
  },{
    name: 'Fever',
    attribute_type: 'checkbox',
    module: 'general'
  },{
    name: 'Asthma',
    attribute_type: 'checkbox',
    module: 'general'
  },{
    name: 'Liver Problem',
    attribute_type: 'checkbox',
    module: 'general'
  },{
    name: 'Hypertension',
    attribute_type: 'checkbox',
    module: 'general'
  },{
    name: 'Viral Infection',
    attribute_type: 'checkbox',
    module: 'general'
  },{
    name: 'Others',
    attribute_type: 'checkbox',
    module: 'general'
  },{
    name: 'Polycystic Ovarian Syndrome',
    attribute_type: 'checkbox',
    module: 'gynecology'
  },{
    name: 'Pelvic Pain',
    attribute_type: 'checkbox',
    module: 'gynecology'
  },{
    name: 'Menstrual Disorders',
    attribute_type: 'checkbox',
    module: 'gynecology'
  },{
    name: 'Pregnency',
    attribute_type: 'checkbox',
    module: 'gynecology'
  },{
    name: 'Hormonal Disbalance',
    attribute_type: 'checkbox',
    module: 'gynecology'
  },{
    name: 'Others',
    attribute_type: 'checkbox',
    module: 'gynecology'
  }]


  for(const ele of data){
    const getModule = await Module.findFirst({
      where: {
        name: ele.module
      },
      select: {
        id: true
      }
    })

    const attribute = await AttributeType.findFirst({
      where: {
        name: ele.attribute_type
      },
      select: {
        id: true
      }
    })

    await DynamicAttributes.create({
      data: {
        name: ele.name,
        attribute_type_id: attribute.id,
        module_id: getModule.id,
        dynamic_attributes_field_values: {
          create: ele?.values || []
        }
      }
    })


  }


})()
