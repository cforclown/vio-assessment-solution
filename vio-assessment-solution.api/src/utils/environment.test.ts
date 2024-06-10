import { Environment } from '.';

describe('environment', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Environment.getNodeEnv', () => {
    it('should successfully return environment variable value', () => {
      expect(Environment.getNodeEnv()).toBeTruthy();
    });

    it('should throw an error when environment variable not found', () => {
      process.env.NODE_ENV = ''; // empty string is falsy
      expect(Environment.getNodeEnv).toThrow(Error);
    });
  });

  describe('Environment.getPort', () => {
    it('should successfully return environment variable value', () => {
      expect(Environment.getPort()).toBeTruthy();
    });

    it('should throw an error when environment variable not found', () => {
      process.env.PORT = ''; // empty string is falsy
      expect(Environment.getPort).toThrow(Error);
    });
  });

  describe('Environment.getUIOrigin', () => {
    it('should successfully return environment variable value', () => {
      process.env.UI_ORIGIN = 'http://localhost,http://localhost:8080';
      expect(Environment.getUIOrigin()).toEqual(['http://localhost', 'http://localhost:8080']);
    });

    it('should return empty array when env not set', () => {
      process.env.UI_ORIGIN = ''; // empty string is falsy
      expect(Environment.getUIOrigin).toThrow(Error);
    });
  });

  describe('Environment.isSSL', () => {
    it('should successfully return environment variable value', () => {
      process.env.SSL = 'false';
      expect(Environment.isSSL()).toBeFalsy();

      process.env.SSL = 'true';
      expect(Environment.isSSL()).toBeTruthy();
    });

    it('should return true when env not set', () => {
      process.env.DB_CONN_STR = ''; // empty string is falsy
      expect(Environment.isSSL).toBeTruthy();
    });
  });

  describe('Environment.getDBConnectionString', () => {
    it('should successfully return environment variable value', () => {
      process.env.DB_HOST = 'mongo';
      process.env.DB_PORT = '27017';
      process.env.DB_USERNAME = 'root';
      process.env.DB_PASSWORD = 'root';
      expect(Environment.getDBConnectionString()).toEqual('mongodb://root:root@mongo:27017');

      process.env.DB_HOST = 'mongo';
      process.env.DB_PORT = '27017';
      process.env.DB_USERNAME = '';
      process.env.DB_PASSWORD = '';
      expect(Environment.getDBConnectionString()).toEqual('mongodb://mongo:27017');

      process.env.DB_HOST = 'mongo';
      process.env.DB_PORT = '';
      process.env.DB_USERNAME = '';
      process.env.DB_PASSWORD = '';
      expect(Environment.getDBConnectionString()).toEqual('mongodb://mongo');
    });

    it('should throw error when DB_HOST is not set', () => {
      process.env.DB_HOST = ''; // empty string is falsy
      expect(Environment.getDBConnectionString).toThrow(Error);
    });
  });

  describe('Environment.getDbName', () => {
    it('should successfully return environment variable value', () => {
      expect(Environment.getDbName()).toBeTruthy();
    });

    it('should throw an error when environment variable not found', () => {
      process.env.DB_NAME = ''; // empty string is falsy
      expect(Environment.getDbName).toThrow(Error);
    });
  });

  describe('Environment.getAccessTokenExpIn', () => {
    it('should successfully return environment variable value', () => {
      process.env.ACCESS_TOKEN_EXP_IN = '1000';
      expect(Environment.getAccessTokenExpIn()).toEqual(1000);

      process.env.ACCESS_TOKEN_EXP_IN = '9999';
      expect(Environment.getAccessTokenExpIn()).toEqual(9999);
    });

    it('should default value when env value is not valid string number', () => {
      process.env.ACCESS_TOKEN_EXP_IN = 'invalid string number';
      expect(Environment.getAccessTokenExpIn()).toEqual(900000);
    });

    it('should return default value (900000) when env not set', () => {
      process.env.ACCESS_TOKEN_EXP_IN = ''; // empty string is falsy
      expect(Environment.getAccessTokenExpIn()).toEqual(900000);
    });
  });
});
