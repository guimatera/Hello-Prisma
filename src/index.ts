import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = Number(process.env.PORT);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running");
});

app.listen(port, () =>
  console.log(`Server ready at: http://localhost:${port}`),
);




