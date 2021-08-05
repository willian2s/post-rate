import express from 'express';
import expressPino from 'express-pino-logger';
import cors from 'cors';
import logger from '@src/logger';
import routes from '@src/routes';

const app = express();
app.use(express.json());
app.use(
  expressPino({
    logger,
  }),
);
app.use(
  cors({
    origin: '*',
  }),
);
app.use(routes);

export default app;
