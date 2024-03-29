
import { PrismaClient } from "@prisma/client"
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (req.method === "POST") {


        const prisma = new PrismaClient()

        const question = req.body.question
        const username = req.body.username
        const result = await prisma.$queryRaw`CALL addqna(${question}, ${username})`

        await prisma.$disconnect()
        res.status(200).send('success')
    } else {
        res.status(403).send('unauthorized')
    }
}
