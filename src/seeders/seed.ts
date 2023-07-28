import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();



async function main() {
  for(let i=1; i <= 10; i++){
    await prisma.user.create({
      data: {
        name: faker.person.firstName(),
        email: faker.internet.email()
      }
    })
  }

  for(let i=1; i <= 10; i++){
    await prisma.category.create({
      data: {
        name: faker.word.noun()
      }
    })
  }

  for(let i=1; i <= 10; i++){
    await prisma.post.create({
      data: {
        title: faker.word.noun(),
        content: faker.word.words(),
        published: faker.datatype.boolean(),
        authorId: i
      }
    })
  }

  for(let i=1; i <= 10; i++){
    await prisma.postCategories.create({
      data: {
        type: faker.word.noun(),
        postId: i,
        categoryId: i
      }
    })
  }

  for(let i=1; i <= 10; i++){
    await prisma.follows.create({
      data: {
        followerId: i,
        followingId: faker.number.int({min: 1, max: 10})
      }
    })
  }

  for(let i=1; i <= 10; i++){
    await prisma.profile.create({
      data: {
      userId: i
      }
    })
  }
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