import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function categorySeed() {
    for(let i=1; i <= 10; i++){
        await prisma.category.create({
          data: {
            name: faker.word.noun()
          }
        })
    }
}

export default categorySeed;