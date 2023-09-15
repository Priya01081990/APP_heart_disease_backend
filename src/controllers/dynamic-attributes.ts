import { ResponseToolkit } from '@hapi/hapi'
import { PrismaClient } from '@prisma/client'
import response from '../response/macors'
import IModules from '../interfaces/models/module'
import IDynamicAttributes from '../interfaces/models/dynamic-attributes'
import IAttributes from '../interfaces/models/attributes-types'
// import slugify from 'slugify'
import IModuleWiseUserResponse from '../interfaces/models/module-wise-user-response'
//import {  PublishCommand } from '@aws-sdk/client-sns'
import AWS from '../config/aws'
import logger from '../config/logger'
import axios from 'axios'

const {
  module: Module,
  dynamicAttributes: DynamicAttributes,
  // dynamicAttributesFieldValues: DynamicAttributesFieldValues,
  dynamicAttributesSelectedValues: DynamicAttributesSelectedValues,
  attributeTypes: AttributeTypes,
  moduleWiseUserResponse: ModuleWiseUserResponse,
  prediction: Prediction,
  heartActivityAlarm: HeartActivityAlarm
  //user: User
} = new PrismaClient()

const moduleList = async (req: any, res: ResponseToolkit) => {
  try {
    const list = await Module.findMany({
      select: {
        id: true,
        name: true,
        parent: {
          select: {
            id: true,
            name: true
          }
        }
      }
    }) as IModules[]

    const msg = list.length > 0 ? 'Module list fetched successfully' : 'No module found'

    return response.success(list, msg)(res)
  } catch (err) {
    // console.log(err)
    return response.error({}, err.message)(res)
  }
}

const moduleView = async (req: any, res: ResponseToolkit) => {
  try {
    const view = await Module.findFirst({
      where: {
        name: 'questions'
      },
      select: {
        id: true,
        name: true
        // parent: {
        //     select: {
        //         id: true,
        //         name: true
        //     }
        // }
      }
    }) as IModules

    if (!view) {
      return response.error(view, 'No module found', 404)(res)
    }

    return response.success(view, 'Module fetched successfully')(res)
  } catch (err) {
    // console.log(err)
    return response.error({}, err.message)(res)
  }
}

const symtomsAreaModuleList = async (req: any, res: ResponseToolkit) => {
  try {
    const findModule = await Module.findFirst({
      where: {
        name: 'subjects'
      },
      select: {
        id: true
      }
    }) as IModules

    const list: any = await Module.findMany({
      where: {
        parent_id: findModule.id
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            dynamic_attributes: {
              where: {
                user_id: null
              }
            }
          }
        }
      }
    }) as IModules[]

    const msg = 'Module list fetched successfully'

    return response.success(list, msg)(res)
  } catch (err) {
    // console.log(err)
    return response.error({}, err.message)(res)
  }
}

const dynamicAttributesList = async (req: any, res: ResponseToolkit) => {
  try {
    const { module_id, user_id, visit, no_of_time_response } = req.query
    // const { id } = req.user
    // const where: { [key: string]: any } = {
    //     module_id,
    //     user_id: user_id || null
    // }
    // let select: { [key: string]: any } = {}
    const conditionAndSelect: any = {
      where: {
        module_id,
        user_id: user_id || null
      },
      orderBy: {
        id: 'asc'
      }
    }
    if (visit) {
      conditionAndSelect.select = {
        id: true,
        no_of_time_response: true,
        created_at: true,
        module_id: true,
      }
      conditionAndSelect.distinct = ['no_of_time_response']
    } else {
      conditionAndSelect.select = {
        id: true,
        name: true,
        display_name: true,
        year: true,
        month: true,
        module_id: true,
        user_id: true,
        attribute_type_id: true,
        no_of_time_response: true,
        attribute_type: {
          select: {
            id: true,
            name: true
          }
        },
        dynamic_attributes_field_values: {
          select: {
            // id: true,
            choices: true
          }
        },
        dynamic_attributes_selected_values: {
          select: {
            // id: true,
            answer: true
          }
        }
      }

      if (no_of_time_response) {
        conditionAndSelect.where.no_of_time_response = no_of_time_response
      }
    }

    const list = await DynamicAttributes.findMany(conditionAndSelect) as IDynamicAttributes[]

    const msg = list.length > 0 ? 'List fetched successfully' : 'No list found'

    return response.success(list, msg)(res)
  } catch (err) {
    // console.log(err)
    logger.error(err)
    return response.error({}, err.message)(res)
  }
}

const createEditDynamicAttributes = async (req: any, res: ResponseToolkit) => {
  try {
    const { dynamic_attributes, module_id } = req.payload
    const { id } = req.user

    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const d = new Date()
    const monthName = month[d.getMonth()]
    const yearName = d.getFullYear()
    let msg: any

    let userResponse = await ModuleWiseUserResponse.findFirst({
      where: {
        user_id: id,
        module_id
      },
      select: {
        id: true,
        total_visit: true
      }
    }) as IModuleWiseUserResponse

    if (userResponse) {
      await ModuleWiseUserResponse.update({
        where: {
          id: userResponse.id
        },
        data: {
          total_visit: userResponse.total_visit + 1
        }
      }) as IModuleWiseUserResponse
    } else {
      await ModuleWiseUserResponse.create({
        data: {
          total_visit: 1,
          user_id: id,
          module_id
        }
      }) as IModuleWiseUserResponse
    }

    userResponse = await ModuleWiseUserResponse.findFirst({
      where: {
        user_id: id,
        module_id
      },
      select: {
        id: true,
        total_visit: true
      }
    }) as IModuleWiseUserResponse

    const dynamicAttributePromise = dynamic_attributes.map(async (item: any) => {
      if (item?.user_id) {
        await DynamicAttributesSelectedValues.deleteMany({
          where: {
            dynamic_attributes_id: item.id
          }
        })

        await DynamicAttributesSelectedValues.createMany({
          data: item.dynamic_attributes_selected_values
        })

        msg = 'Update successfull'
      } else {
        let selectedValues: any = []
        if (item.attribute_type.name === 'checkbox') {
          selectedValues = item.dynamic_attributes_selected_values.map((ele: any) => (
            {
              answer: ele.answer === 'true' ? 'true' : 'false'
            }
          ))
        } else {
          selectedValues = item.dynamic_attributes_selected_values
        }

        await DynamicAttributes.create({
          data: {
            name: item.name,
            display_name: item.display_name,
            month: monthName.toString(),
            year: yearName.toString(),
            user_id: id,
            attribute_type_id: item.attribute_type_id,
            module_id: item.module_id,
            no_of_time_response: userResponse.total_visit,
            dynamic_attributes_field_values: {
              create: item.dynamic_attributes_field_values || []
            },
            dynamic_attributes_selected_values: {
              create: selectedValues
            }
          }
        })

        msg = 'Create successfull'
      }
    })

    await Promise.all(dynamicAttributePromise)

    const userDetails = req.user
    const getResponseData = await DynamicAttributes.findMany({
      where: {
        user_id: id,
        no_of_time_response: userResponse.total_visit,
        module_id
      },
      select: {
        name: true,
        display_name: true,
        dynamic_attributes_selected_values: {
          select: {
            answer: true
          },
        },
      }
    })
    const userData = `User details - Name: ${userDetails.name}, Email: ${userDetails.email}, Phone number: ${userDetails.ph_no}, Address: ${userDetails.address}, Age: ${userDetails.age}, Gender: ${userDetails.gender}`
    const time = new Date().toLocaleString('en-Us', {
      timeZone: 'Europe/Berlin'
    })
    let symptomData = 'Symptoms send: '

    getResponseData.map((item) => {
      symptomData+= `${item.display_name}: ${item.dynamic_attributes_selected_values[0].answer === 'true' ? 'Present' : item.dynamic_attributes_selected_values[0].answer}`
    })

    const message = userData + '\n'+ 'Time: ' + time + '\n' + symptomData

    const getModule = await Module.findFirst({
      where: {
        id: module_id
      },
      select: {
        name: true,
        parent: {
          select: {
            name: true
          }
        }
      }
    })

    if(getModule?.parent?.name === 'subjects'){
      // const payload = {
      //   userDetails,
      //   getResponseData
      // }
      const params: {
        TopicArn: string,
        Message: any,
        Subject: string
      } = {
        TopicArn: 'arn:aws:sns:eu-central-1:576378418130:SendSymptomps',
        Message: message,//JSON.stringify(payload), // required
        Subject: 'Symptomps data',
      }
      try{
        const client = await new AWS.SNS({}).publish(params).promise()
        logger.info(client)
      }catch(err: any){
        logger.error(err)
      }
    }



    return response.success({ responseNo: userResponse.total_visit }, msg)(res)
  } catch (err) {
    // console.log(err)
    return response.error({}, err.message)(res)
  }
}

const createBulkDynamicAttributesByAdmin = async (req: any, res: ResponseToolkit) => {
  try {
    const { dynamic_attributes } = req.payload

    await Promise.all(
      dynamic_attributes.map(async (item: any) => {
        await DynamicAttributes.create({
          data: {
            name: item.name,
            display_name: item.display_name,
            attribute_type_id: item.attribute_type_id,
            module_id: item.module_id,
            dynamic_attributes_field_values: {
              create: item.field_values || []
            }
          }
        })
      })
    )

    const msg = 'Create successfull'

    return response.success({}, msg)(res)
  } catch (err) {
    // console.log(err)
    return response.error({}, err.message)(res)
  }
}

const attributeList = async (req: any, res: ResponseToolkit) => {
  try {
    const list = await AttributeTypes.findMany({
      select: {
        id: true,
        name: true
      }
    }) as IAttributes[]

    const msg = 'Attribute types fetched successfully'

    return response.success(list, msg)(res)
  } catch (err) {
    // console.log(err)
    return response.error({}, err.message)(res)
  }
}

const dynamicAttributeListMLSupprt = async (req: any, res: ResponseToolkit) => {
  try {
    const { id } = req.user
    const { no_of_time_response, module_id } = req.query

    const list = await DynamicAttributes.findMany({
      where: {
        no_of_time_response,
        user_id: id,
        module_id
      },
      select: {
        name: true,
        display_name: true,
        attribute_type: {
          select: {
            name: true
          }
        },
        dynamic_attributes_selected_values: {
          select: {
            // id: true,
            answer: true
          }
        }
      }

    }) as IDynamicAttributes[]

    let payload: any = {}

    list.map((item: IDynamicAttributes) => {
      let answer: any

      if (item.attribute_type.name === 'number') {
        answer = +item.dynamic_attributes_selected_values[0].answer
      } else if (item.attribute_type.name === 'checkbox') {
        answer = item.dynamic_attributes_selected_values[0].answer === 'true'
      } else {
        answer = item.dynamic_attributes_selected_values[0].answer
      }


      payload[`${item.name}`]= answer

    })
    payload = JSON.stringify(payload)
    const url = 'https://flknyjlpf5.execute-api.eu-west-2.amazonaws.com/dev/api'
    try {
      const prediction = await axios.post(url, payload, {headers:{'Content-Type' : 'application/json'}})

      const getPrediction = await Prediction.findFirst({
        where: {
          user_id: id
        },select: {
          id: true
        }
      })

      if(getPrediction){

        await Prediction.update({
          where: {
            id: getPrediction.id
          },
          data: {
            prediction: prediction?.data?.prediction ? true : false,
            description: prediction?.data?.description,
            confidence: prediction?.data?.confidence
          }

        })
      }else{
        await Prediction.create({
          data: {
            user_id: id,
            prediction: prediction?.data?.prediction ? true : false,
            description: prediction?.data?.description,
            confidence: prediction?.data?.confidence
          }
        })
      }
      const result = prediction?.data?.prediction ? 'Heart condition is not good' : 'Heart condition is good'

      return response.success({prediction: prediction?.data?.prediction}, result)(res)
    } catch (error) {
      logger.error(error,'prediction error')
      return response.error(error)(res)
    }

  } catch (err) {
    // console.log(err)
    return response.error({}, err.message)(res)
  }
}

const dynamicAttributesView = async (req: any, res: ResponseToolkit) => {
  try {
    const { id } = req.query

    const view = await DynamicAttributes.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        display_name: true,
        attribute_type: {
          select: {
            id: true,
            name: true
          }
        },
        dynamic_attributes_field_values: {
          select: {
            choices: true
          }
        }
      }
    }) as IDynamicAttributes

    const msg = view ? 'Attribute fetched successfully' : 'No attribute found'

    return response.success(view, msg)(res)
  } catch (err) {
    // console.log(err)
    return response.error({}, err.message)(res)
  }
}

const heartActivity =async (req:any, res: ResponseToolkit) => {
  try {
    const { rate, activity} = req.payload

    const url = 'https://mvcstybohd.execute-api.eu-west-2.amazonaws.com/dev/api'
    // const heartRateData: any = []
    const trueValue = 1
    const payload = {
      'user_id':req.user.id,
      'contact':'+4123454678',
      'user_lat':77.90,
      'user_lon':88.90,
      'user_device':'apple watch',
      'user_age_group': '15-23',
      'user_activity':activity,
      'user_heart_rate':80
    }
    let result: any
    while(trueValue){

      if(rate === 'increase') {
        payload.user_heart_rate = payload.user_heart_rate + 4
      }else if(rate === 'decrease'){
        payload.user_heart_rate = payload.user_heart_rate - 4
      }

      const heartRate = await axios.post(url, payload, {headers:{'Content-Type' : 'application/json'}})
      logger.info({data: heartRate.data, heartRate: payload.user_heart_rate})
      // heartRateData.push({
      //   alarm: heartRate.data?.alarm ? true : false,
      //   confidence: heartRate.data?.confidence,
      //   description: heartRate.data?.description,
      //   heartRate: payload.user_heart_rate,
      //   alarm_set_date_time: new Date(),
      //   lat: payload.user_lat.toString(),
      //   long: payload.user_lon.toString(),
      // })
      if(heartRate.data?.alarm){
        result = {
          alarm: heartRate.data?.alarm,
          confidence: heartRate.data?.confidence,
          description: heartRate.data?.description,
          heartRate: payload.user_heart_rate
        }
        break
      }
    }

    const check: any = await HeartActivityAlarm.findFirst({
      where: {
        user_id: req.user.id
      },
      select: {
        id: true
      }
    })

    if(check){
      await HeartActivityAlarm.update({
        where: {
          id: check?.id
        },
        data: {
          alarm: result.alarm ? true : false,
          confidence: result.confidence,
          description: result.description,
          heart_rate: result.heartRate,
          alarm_set_date_time:new Date(),
          lat: payload.user_lat.toString(),
          long: payload.user_lon.toString(),
        }
      })
    }else{
      await HeartActivityAlarm.create({
        data:{
          alarm: result.alarm ? true : false,
          confidence: result.confidence,
          description: result.description,
          heart_rate: result.heartRate,
          alarm_set_date_time: new Date(),
          user_id: req.user.id,
          lat: payload.user_lat.toString(),
          long: payload.user_lon.toString(),
        }
      })
    }
    const userDetails = req.user
    const userData = `User details - Name: ${userDetails.name}, Email: ${userDetails.email}, Phone number: ${userDetails.ph_no}, Address: ${userDetails.address}, Age: ${userDetails.age}, Gender: ${userDetails.gender}` + '\n'

    const alarmData = `Sends alarm: Heart rate: ${result.heartRate}, Alarm time: ${new Date().toLocaleString('en-us',{
      timeZone: 'Europe/Berlin'
    })}, Activity: ${activity}, Latitude: ${payload.user_lat.toString()}, Longitude: ${payload.user_lon.toString()}`

    const message = userData + alarmData

    const params: {
      TopicArn: string,
      Message: any,
      Subject: string
    } = {
      TopicArn: 'arn:aws:sns:eu-central-1:576378418130:alarmSend',
      Message: message,//JSON.stringify(payload), // required
      Subject: 'Patient'+ ' '+ userDetails.name + ' '+ 'sends alarm',
    }
    try{
      const client = await new AWS.SNS({}).publish(params).promise()
      logger.info(client)
    }catch(err: any){
      logger.error(err)
    }

    return response.success(result, `Alarm is set with heart rate ${payload.user_heart_rate}`)(res)

  } catch (err) {
    logger.error(err)
    return response.error(err.message)(res)
  }
}

export {
  moduleList,
  moduleView,
  symtomsAreaModuleList,
  dynamicAttributeListMLSupprt,
  dynamicAttributesList,
  createEditDynamicAttributes,
  createBulkDynamicAttributesByAdmin,
  attributeList,
  dynamicAttributesView,
  heartActivity
}
