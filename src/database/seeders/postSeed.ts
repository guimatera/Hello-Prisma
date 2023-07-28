import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';
import categorySeed from "./categorySeed";

const prisma = new PrismaClient();

async function postSeed() {
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
    categorySeed();
}
        
export default postSeed;