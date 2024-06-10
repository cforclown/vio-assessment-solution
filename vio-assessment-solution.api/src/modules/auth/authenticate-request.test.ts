import { HttpStatusCode } from 'axios';
import { TokenExpiredError } from 'jsonwebtoken';
import { dro, Logger } from 'cexpress-utils/lib';
import { authenticateRequest, IExcludePath } from '.';
import { mockUser } from '../../test';

const mockJWTVerify = jest.fn();
jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  verify: (token: string, secret: string): any => mockJWTVerify(token, secret)
}));

describe('authenticate-request', () => {
  mockJWTVerify.mockReturnValue(mockUser);

  const spyOnLoggerError = jest.spyOn(Logger, 'error');
  const spyOnLoggerException = jest.spyOn(Logger, 'exception');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully authenticate a request with a valid access token', () => {
    // Arrange
    const excludePaths: IExcludePath[] = [];
    const mockReq: any = {
      originalUrl: '/api/v1/users',
      method: 'GET',
      headers: {
        authorization: 'Bearer validAccessToken'
      }
    };
    const mockRes: any = {
      sendStatus: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const mockNext = jest.fn();

    // Act
    authenticateRequest(excludePaths)(mockReq, mockRes, mockNext);

    // Assert
    expect(mockRes.sendStatus).not.toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.send).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it('should skip authentication for excluded paths with GET method', () => {
    // Arrange
    const excludePaths: IExcludePath[] = [{ path: '/api/v1/public' }];
    const mockReq: any = {
      originalUrl: '/api/v1/public',
      method: 'GET',
      headers: {}
    };
    const mockRes: any = {};
    const mockNext = jest.fn();

    // Act
    authenticateRequest(excludePaths)(mockReq, mockRes, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockJWTVerify).not.toHaveBeenCalled();
  });

  it('should return 401 Unauthorized if no authorization header set', () => {
    // Arrange
    const excludePaths: IExcludePath[] = [];
    const mockReq: any = {
      originalUrl: '/api/v1/users',
      method: 'GET',
      headers: {}
    };
    const mockRes: any = {
      sendStatus: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const mockNext = jest.fn();

    // Act
    authenticateRequest(excludePaths)(mockReq, mockRes, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatusCode.Unauthorized);
    expect(mockRes.send).toHaveBeenCalledWith(dro.error('Unauthorized'));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 401 Unauthorized if the access token is invalid', () => {
    // Arrange
    const excludePaths: IExcludePath[] = [];
    const mockReq: any = {
      originalUrl: '/api/v1/users',
      method: 'GET',
      headers: {
        authorization: 'Bearer invalidAccessToken'
      }
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const mockNext = jest.fn();

    mockJWTVerify.mockReturnValueOnce(null);

    // Act
    authenticateRequest(excludePaths)(mockReq, mockRes, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatusCode.Unauthorized);
    expect(mockRes.send).toHaveBeenCalledWith(dro.error('Invalid access token'));
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should set req.user if the access token is valid', () => {
    // Arrange
    const excludePaths: IExcludePath[] = [];
    const mockReq: any = {
      originalUrl: '/api/v1/users',
      method: 'GET',
      headers: {
        authorization: 'Bearer validAccessToken'
      }
    };
    const mockRes: any = {};
    const mockNext = jest.fn();

    // Act
    authenticateRequest(excludePaths)(mockReq, mockRes, mockNext);

    // Assert
    expect(mockReq.user).toBeDefined();
    expect(mockNext).toHaveBeenCalled();
  });

  it('should call logger error when token exceptions throws', () => {
    // Arrange
    const excludePaths: IExcludePath[] = [];
    const mockReq: any = {
      originalUrl: '/api/v1/users',
      method: 'GET',
      headers: {
        authorization: 'Bearer invalidAccessToken'
      }
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const mockNext = jest.fn();

    mockJWTVerify.mockImplementation(() => { throw new TokenExpiredError('expired', new Date()); });

    // Act
    authenticateRequest(excludePaths)(mockReq, mockRes, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatusCode.Unauthorized);
    expect(mockRes.send).toHaveBeenCalledWith(dro.error('expired'));
    expect(mockNext).not.toHaveBeenCalled();
    expect(spyOnLoggerError).toHaveBeenCalled();
  });

  it('should call logger error when unexpected error throws', async () => {
    // Arrange
    const excludePaths: IExcludePath[] = [];
    const mockReq: any = {
      originalUrl: '/api/v1/users',
      method: 'GET',
      headers: {
        authorization: 'Bearer invalidAccessToken'
      }
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const mockNext = jest.fn();

    mockJWTVerify.mockImplementation(() => { throw new Error('error'); });

    // Act
    authenticateRequest(excludePaths)(mockReq, mockRes, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatusCode.InternalServerError);
    expect(mockRes.send).toHaveBeenCalledWith(dro.error('error'));
    expect(mockNext).not.toHaveBeenCalled();
    expect(spyOnLoggerException).toHaveBeenCalled();
  });
});
