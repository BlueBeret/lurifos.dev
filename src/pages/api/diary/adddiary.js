import crypto from 'crypto';
import { PrismaClient } from "@prisma/client"
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (req.method === "POST" && crypto.createHash('sha512').update(req.body.secret).digest('hex') === process.env.SECRET && session.user.email === process.env.ADMIN_EMAIL) {


        const prisma = new PrismaClient()

        const dtitle = req.body.dtitle
        const dbody = req.body.dbody
        const result = await prisma.$queryRaw`CALL AddDiary(${dtitle}, ${dbody})`


        await prisma.$disconnect()
        res.status(200).send(result)
    } else {
        res.status(404).redirect('/')
    }
}
