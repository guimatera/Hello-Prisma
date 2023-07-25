import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = Number(process.env.PORT);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running");
});

app.listen(port, () =>
  console.log(`Server ready at: http://localhost:${port}`),
);


async function main() {
  /* Query para criar uma instância 
  const user = await prisma.user.create({
    data: {
        name: 'Alice',
        email: 'alice@prisma.io',
    },
  })*/

  /* Query para retornar todas as intâncias de uma tabela
 const users = await prisma.user.findMany()
  console.log(users) */

  /* Query para criar 2 instância, uma relacionada com a outra 
  const user = await prisma.user.create({
    data: {
        name:'Bob',
        email: 'bob@prisma.io',
        posts:{
            create:{
                title: 'Hello World'
            }
        }
    }
  })*/

  /* Query para retornar todos as instâncias de uma tabela e suas instâncias relacionadas com outra tabela
  const usersWithPosts = await prisma.user.findMany({
    include:{
        posts: true
    }
  })
  console.dir(usersWithPosts, { depth: null })*/

  
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

