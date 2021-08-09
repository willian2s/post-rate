import express from 'express';
import expressPino from 'express-pino-logger';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '@src/doc/swagger.json';
import logger from '@src/logger';
import routes from '@src/routes';

const app = express();
app.use(express.json());
app.use('/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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
app.use('/v1', routes);

export default app;
