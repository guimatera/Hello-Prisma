import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function postCategorySeed() {
    for(let i=1; i <= 10; i++){
        await prisma.postCategories.create({
          data: {
            type: faker.word.noun(),
            postId: i,
            categoryId: i
          }
        })
    }
}

export default postCategorySeed;