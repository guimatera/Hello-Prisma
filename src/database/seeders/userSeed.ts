import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function userSeed() {
  for(let i=1; i <= 10; i++){
    await prisma.user.create({
      data: {
        name: faker.person.firstName(),
        email: faker.internet.email()
      }
    })
  }
}

export default userSeed;