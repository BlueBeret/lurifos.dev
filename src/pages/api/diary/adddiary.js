import crypto from 'crypto';
import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    

    if (req.method === "POST" && crypto.createHash('sha512').update(req.body.secret).digest('hex') === process.env.SECRET) {

    
        const prisma = new PrismaClient()

        const dtitle = req.body.dtitle
        const dbody = req.body.dbody
        const result = await prisma.$queryRaw`CALL AddDiary(${dtitle}, ${dbody})`


        await prisma.$disconnect()
        res.status(200).send(result)
    } else {
        res.status(405).send('Method Not Allowed')
    }
}
