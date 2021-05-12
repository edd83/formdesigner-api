import './loadEnv'; // Must be the first import
import app from './server';
import logger from './utils/logger';
import { intializeDB, initializeCache } from './db';

import { Configuration } from './config/config';

intializeDB();

initializeCache(Configuration.REDIS_PORT);

// Start the server
app.listen(Configuration.PORT, () => {
  logger.info(`Express server started on port: ${Configuration.PORT}`);
});
