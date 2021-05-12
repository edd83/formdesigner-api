import 'reflect-metadata';
import { createConnection } from 'typeorm';
import logger from './utils/logger';

export async function intializeDB(): Promise<void> {
  await createConnection();
  logger.info('Database successfully initialized');
}
