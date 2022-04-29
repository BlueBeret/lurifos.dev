import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    const last = new Date(req.query.last)
    const data = await prisma.diary.findMany(
        {
            where: {
                timecreated: {
                    lt: last
                }
            },
            orderBy: {
                timecreated: 'desc'
            },
            take: 10
        }
    )

    data.map(x => {
        x.timecreated = x.timecreated.toString()
        x.lastedited = x.lastedited.toString()
        return x
    })

    await prisma.$disconnect()
    res.status(200).json(data)
}
