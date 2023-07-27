import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function followSeed() {
  for(let i=1; i <= 10; i++){
    await prisma.follows.create({
      data: {
        followerId: i,
        followingId: faker.number.int({min: 1, max: 10})
      }
    })
  }
}

export default followSeed;