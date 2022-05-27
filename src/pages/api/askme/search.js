import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    var searchWords = req.query.search

    const query = "%" + searchWords + "%"
    const data = await prisma.$queryRaw`SELECT * FROM qna WHERE question ILIKE ${query} OR answer ILIKE ${query}`

    data.map(x => {
        x.timecreated = x.timecreated.toString()
        x.lastedited = x.lastedited.toString()
        return x
    })
    console.log(data)

    await prisma.$disconnect()
    res.status(200).json(data)
}
