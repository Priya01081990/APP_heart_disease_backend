import { PrismaClient } from '@prisma/client'
const {attributeTypes: AttributeTypes} = new PrismaClient();

(async ()=>{

  const data:any = [
    {
      name: 'text'
    },
    {
      name: 'number'
    },
    {
      name: 'checkbox'
    },
    {
      name: 'radio'
    },
    {
      name: 'dropdown'
    }
  ]

  await AttributeTypes.createMany({
    data
  })
})()
