import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/router';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application Router
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello developerxx!');
});

app.use(globalErrorHandler);

//Not found route
app.use(notFound);

export default app;
