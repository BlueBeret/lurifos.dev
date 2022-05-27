
import { PrismaClient } from "@prisma/client"
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (req.method === "POST" && session.user.email) {


        const prisma = new PrismaClient()

        const question = req.body.question
        const username = req.body.username
        const result = await prisma.$queryRaw`CALL AddQuestion(${question}, ${username})`


        await prisma.$disconnect()
        res.status(200).send(result)
    } else {
        res.status(404).redirect('/')
    }
}
