import crypto from 'crypto';
import { PrismaClient } from "@prisma/client"
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session.user.email === process.env.ADMIN_EMAIL) {


    const prisma = new PrismaClient()

    const uuid = req.query.uuid
    const result = await prisma.$queryRaw`SELECT * FROM diary WHERE uuid=${uuid}`


    result.map(x => {
      x.timecreated = x.timecreated.toString()
      x.lastedited = x.lastedited.toString()
      return x
    })

    await prisma.$disconnect()
    res.status(200).json(result[0])
  } else {
    res.status(40).redirect('/')
  }
}
