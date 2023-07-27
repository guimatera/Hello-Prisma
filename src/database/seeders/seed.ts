import { PrismaClient } from "@prisma/client";
import userSeed from "./userSeed";
import postSeed from "./postSeed";
import profileSeed from "./profileSeed";
import categorySeed from "./categorySeed";
import postCategorySeed from "./postCategoriesSeed";
import followSeed from "./followSeed";

const prisma = new PrismaClient();

async function main() {
  userSeed().then(() =>{
    postSeed();
    profileSeed();
    followSeed();
    categorySeed();
  }).then(() => {
    postCategorySeed();
  });
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