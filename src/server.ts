import 'reflect-metadata';
import './util/module-alias';
import config from 'config';
import logger from '@src/logger';
import app from '@src/app';
import '@src/database';

const port: number = config.get('App.port');

app.listen(port, () => {
  logger.info(`🏃 🚀 Running Server on port ${port}`);
});
