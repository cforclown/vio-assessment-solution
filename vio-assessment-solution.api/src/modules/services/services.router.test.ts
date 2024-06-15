import { Express } from 'express';
import request from 'supertest';
import { HttpStatusCode } from 'axios';
import { RestApiException } from 'cexpress-utils/lib';
import { container, setup } from '../../di-config';
import { Environment } from '../../utils';
import { mockServiceData, mockUser } from '../../test';

const mockJWTVerify = jest.fn();
jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  verify: jest.fn().mockImplementation((token: string, secret: string) => mockJWTVerify(token, secret))
}));

const mockModel = jest.fn();
jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'),
  model: jest.fn().mockImplementation((collection: string): string => mockModel(collection))
}));

const mockServicesDaoGet = jest.fn();
const mockServicesDaoCreate = jest.fn();
const mockServicesDaoUpdate = jest.fn();
const mockServicesDaoDelete = jest.fn();
jest.mock('./services.dao', () => ({
  ServicesDao: jest.fn().mockImplementation(() => ({
    get: (payload: any): void => mockServicesDaoGet(payload),
    create: (payload: any): void => mockServicesDaoCreate(payload),
    update: (payload: any): void => mockServicesDaoUpdate(payload),
    delete: (payload: any): void => mockServicesDaoDelete(payload)
  }))
}));

const mockUsersServiceGet = jest.fn();
jest.mock('../users/users.service', () => ({
  UsersService: jest.fn().mockImplementation(() => ({
    get: (payload: any): void => mockUsersServiceGet(payload)
  }))
}));

describe('services-router', () => {
  mockUsersServiceGet.mockResolvedValue(mockUser);
  mockServicesDaoGet.mockResolvedValue(mockServiceData);
  mockServicesDaoCreate.mockResolvedValue(mockServiceData);
  mockServicesDaoUpdate.mockResolvedValue(mockServiceData);
  mockServicesDaoDelete.mockResolvedValue(mockServiceData);

  mockJWTVerify.mockReturnValue(mockUser);

  let app: Express;

  beforeAll(() => {
    setup();
    app = container.resolve('app');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should successfully return service', async () => {
      const response = await request(app)
        .get(`/api/${Environment.getApiVersion()}/services/${mockServiceData.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);

      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockServiceData);
    });

    it('should return 404 when service not found', async () => {
      mockServicesDaoGet.mockReturnValueOnce(Promise.resolve(null));
      await request(app)
        .get(`/api/${Environment.getApiVersion()}/services/${mockServiceData.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.NotFound);
    });
  });

  describe('delete', () => {
    it('should successfully delete a service', async () => {
      const response = await request(app)
        .delete(`/api/${Environment.getApiVersion()}/services/${mockServiceData.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockServiceData);
    });

    it('should throw an error when data access object throw an error', async () => {
      mockServicesDaoDelete.mockRejectedValueOnce(new RestApiException('internal server error', 500));
      await request(app)
        .delete(`/api/${Environment.getApiVersion()}/services/${mockServiceData.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.InternalServerError);
    });
  });
});
