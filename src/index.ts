import './loadEnv'; // Must be the first import
import app from './server';
import logger from './utils/logger';
import { intializeDB } from './db';

import { Configuration } from './config/config';

intializeDB();

// Start the server
app.listen(Configuration.PORT, () => {
  logger.info(`Express server started on port: ${Configuration.PORT}`);
});
