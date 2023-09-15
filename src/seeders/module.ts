import { PrismaClient } from '@prisma/client'
const {module: Module} = new PrismaClient();

(async () => {

  const data: any = [
    {
      name: 'questions',
      display_name: 'Questions',
      parent_id: null
    },
    {
      name: 'subjects',
      display_name: 'Subjects',
      parent_id: null
    },
    {
      name: 'general',
      display_name: 'General',
      parent_id: 'subjects'
    },
    {
      name: 'gynecology',
      display_name: 'Gynecology',
      parent_id: 'subjects'
    },
    {
      name: 'cardiology',
      display_name: 'cardiology',
      parent_id: 'subjects'
    },
    {
      name: 'neurology',
      display_name: 'Neurology',
      parent_id: 'subjects'
    },
    {
      name: 'orthopedics',
      display_name: 'Orthopedics',
      parent_id: 'subjects'
    },
    {
      name: 'others',
      display_name: 'Others',
      parent_id: 'subjects'
    },
  ]

  for(const ele of data){

    if(ele.parent_id){


      const parent = await Module.findFirst({
        where: {
          name: ele.parent_id
        },select:{
          id: true
        }
      })

      ele.parent_id = parent?.id
    }

    await Module.create({
      data: ele
    })
  }


})()
