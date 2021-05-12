import { EnvironmentVariableMissing } from '../errors/environmentVariableMissing';

function getEnv(name: string, defaultValue?: string): string {
  const env = process.env[name];
  if (env !== undefined) {
    return env;
  }
  if (defaultValue) {
    return defaultValue;
  }
  throw new EnvironmentVariableMissing(name);
}

function getEnvAsNumber(name: string, defaultValue?: number): number {
  const env = process.env[name];
  if (env !== undefined) {
    return parseInt(env, 10);
  }
  if (defaultValue) {
    return defaultValue;
  }
  throw new EnvironmentVariableMissing(name);
}

function getEnvAsBoolean(name: string, defaultValue?: boolean): boolean {
  const env = process.env[name];
  if (env !== undefined) {
    return process.env[name] === 'true';
  }
  if (defaultValue) {
    return defaultValue;
  }
  throw new EnvironmentVariableMissing(name);
}

export interface ConfigurationType {
  API_ROOT_PATH: string;
  NODE_ENV: string;
  HEALTH_CHECK_PATH: string;
  IS_TEST: boolean;
  PORT: number;
  REDIS_PORT: number;
  SERVICE_NAME: string;
  SWAGGER_SPEC_PATH: string;
}

export const Configuration: ConfigurationType = {
  API_ROOT_PATH: getEnv('API_ROOT_PATH'),
  HEALTH_CHECK_PATH: 'health-check',
  IS_TEST: getEnvAsBoolean('IS_TEST', false),
  NODE_ENV: getEnv('NODE_ENV'),
  PORT: getEnvAsNumber('PORT', 3000),
  REDIS_PORT: getEnvAsNumber('REDIS_PORT', 6379),
  SERVICE_NAME: getEnv('SERVICE_NAME'),
  SWAGGER_SPEC_PATH: getEnv('SWAGGER_SPEC_PATH')
};
