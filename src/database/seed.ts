import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

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
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          published: true,
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: true,
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            published: true,
          },
        ],
      },
    },
  })
  console.log({ alice, bob })
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