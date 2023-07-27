import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function profileSeed() {
    for(let i=1; i <= 10; i++){
        await prisma.profile.create({
          data: {
            userId: i
          }
        })
    }
}

export default profileSeed;