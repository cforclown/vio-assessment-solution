import { EnvNames, getEnvOrThrow, getOptionalEnv } from 'cexpress-utils/lib';

export const Environment = {
  getNodeEnv: (): EnvNames => getEnvOrThrow('NODE_ENV'),
  isSSL: (): boolean => {
    const sslEnv = getOptionalEnv('SSL', true);
    if (sslEnv === 'true' || sslEnv === true) {
      return true;
    }

    return false;
  },
  getPort: (): string => getEnvOrThrow('PORT'),
  getUIOrigin: (): string[] => {
    const allowedOriginsRaw = getEnvOrThrow('UI_ORIGIN');
    return allowedOriginsRaw.split(',').filter(h => !!h);
  },
  getApiVersion: (): string => getOptionalEnv('API_VERSION', 'v1'),

  getDBConnectionString: (): string => {
    const dbHost = getEnvOrThrow('DB_HOST');
    const dbPort = getOptionalEnv('DB_PORT', undefined);
    const dbUsername = getOptionalEnv('DB_USERNAME', undefined);
    const dbPassword = getOptionalEnv('DB_PASSWORD', undefined);
    return `mongodb://${dbUsername && dbPassword ? `${dbUsername}:${dbPassword}@` : ''}${dbHost}${dbPort ? `:${dbPort}` : ''}`;
  },
  getDbName: (): string => getEnvOrThrow('DB_NAME'),

  getSessionSecret: (): string => getOptionalEnv('SESSION_SECRET', 'mern-boilerplate-session-secret'),

  getAccessTokenSecret: (): string => getEnvOrThrow('ACCESS_TOKEN_SECRET'),
  getRefreshTokenSecret: (): string => getEnvOrThrow('REFRESH_TOKEN_SECRET'),
  getAccessTokenExpIn: (): number => {
    let accessTokenExpIn = getOptionalEnv('ACCESS_TOKEN_EXP_IN', 900000);
    accessTokenExpIn = typeof accessTokenExpIn === 'string' ? isNaN(parseInt(accessTokenExpIn)) ? 900000 : parseInt(accessTokenExpIn) : accessTokenExpIn;

    return accessTokenExpIn;
  },
  getRefreshTokenExpIn: (): string => '7d'
};
