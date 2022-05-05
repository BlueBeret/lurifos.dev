import { PrismaClient } from "@prisma/client"

export default async function getLatestDiary() {
    const prisma = new PrismaClient()
    try {
        const data = await prisma.$queryRaw`SELECT * FROM diary ORDER BY timecreated DESC LIMIT 20`

        data.map(x => {
            x.timecreated = x.timecreated.toString()
            x.lastedited = x.lastedited.toString()
            return x
        })
        await prisma.$disconnect()
        return data
    } catch (error) {
        await prisma.$disconnect()
        return []
    }




}
