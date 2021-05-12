import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import express, { Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status-codes';

import BaseRouter from './routes';
import logger from './utils/logger';
import { Configuration } from './config/config';

// Init express
const app = express();

/** **********************************************************************************
 *                              Set basic express settings
 ********************************************************************************** */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (Configuration.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security
if (Configuration.NODE_ENV === 'production') {
  app.use(helmet());
}

// Add APIs
app.use(Configuration.API_ROOT_PATH, BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response) => {
  logger.error(err.message, err);
  return res.status(BAD_REQUEST).json({
    error: err.message
  });
});

// Export express instance
export default app;
