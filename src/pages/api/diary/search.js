import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    var searchWords = req.query.search.split(" ")
    searchWords = searchWords.map(word => {

        return `${word}`
    })

    const query = searchWords.join(" | ")
    const data = await prisma.diary.findMany(
        {
            where: {

                body: {
                    search: query
                }, title: {
                    search: query
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
