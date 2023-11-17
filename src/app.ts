import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRouter } from './app/modules/student/student.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application Router
app.use('/api/v1/students', StudentRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello developerxx!');
});

export default app;
