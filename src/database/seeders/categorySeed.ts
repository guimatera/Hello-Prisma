import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import postCategorySeed from "./postCategoriesSeed";

const prisma = new PrismaClient();

async function categorySeed() {
    for(let i=1; i <= 10; i++){
        await prisma.category.create({
          data: {
            name: faker.word.noun()
          }
        })
    }
    postCategorySeed();
}

export default categorySeed;