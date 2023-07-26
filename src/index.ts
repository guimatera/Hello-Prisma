import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = Number(process.env.PORT);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running");
});

app.listen(port, () =>
  console.log(`Server ready at: http://localhost:${port}`),
);




