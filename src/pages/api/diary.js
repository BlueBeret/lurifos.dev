import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  const prisma = new PrismaClient()
  const data = await prisma.diary.findMany({
    orderBy: [
      {
        timecreated: "desc"
      }
    ]
  })

  data.map(x => {
    x.timecreated = x.timecreated.toString()
    x.lastedited = x.lastedited.toString()
    return x
  })

  await prisma.$disconnect()
  res.status(200).json(data)
}
