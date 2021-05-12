import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Tedis } from 'tedis';
import logger from './utils/logger';

export async function intializeDB(): Promise<void> {
  await createConnection();
  logger.info('Database successfully initialized');
}

export function initializeCache(port: number | undefined) : unknown {
  const tedis = new Tedis({
    host: '127.0.0.1',
    port
  });
  logger.info('Redis cache successfully initialized');
  return tedis;
}
