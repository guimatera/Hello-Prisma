import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);

app.get('/', (req: Request, res: Response) => {
  res.json('Express + TypeScript Server is running');
});

export default app;


