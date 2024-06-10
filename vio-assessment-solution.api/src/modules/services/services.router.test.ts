import { Express } from 'express';
import request from 'supertest';
import { HttpStatusCode } from 'axios';
import { RestApiException } from 'cexpress-utils/lib';
import { container, setup } from '../../di-config';
import { Environment } from '../../utils';
import { mockChannelDm1, mockChannelGroup, mockCreateGroupPayload, mockUpdateGroupPayload, mockUser } from '../../test';

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

const mockChannelsDaoGet = jest.fn();
const mockChannelsDaoGetUserChannels = jest.fn();
const mockChannelsDaoCreateChannel = jest.fn();
const mockChannelsDaoCreate = jest.fn();
const mockChannelsDaoUpdate = jest.fn();
const mockChannelsDaoDelete = jest.fn();
jest.mock('./channels.dao', () => ({
  ChannelsDao: jest.fn().mockImplementation(() => ({
    get: (payload: any): void => mockChannelsDaoGet(payload),
    getUserChannels: (payload: any): void => mockChannelsDaoGetUserChannels(payload),
    createChannel: (payload: any): void => mockChannelsDaoCreateChannel(payload),
    create: (payload: any): void => mockChannelsDaoCreate(payload),
    update: (payload: any): void => mockChannelsDaoUpdate(payload),
    delete: (payload: any): void => mockChannelsDaoDelete(payload)
  }))
}));

const mockUsersServiceGet = jest.fn();
jest.mock('../users/users.service', () => ({
  UsersService: jest.fn().mockImplementation(() => ({
    get: (payload: any): void => mockUsersServiceGet(payload)
  }))
}));

describe('channels-router', () => {
  mockUsersServiceGet.mockResolvedValue(mockUser);
  mockChannelsDaoGet.mockResolvedValue(mockChannelDm1);
  mockChannelsDaoGetUserChannels.mockResolvedValue([mockChannelDm1]);
  mockChannelsDaoCreateChannel.mockResolvedValue(mockChannelGroup);
  mockChannelsDaoCreate.mockResolvedValue(mockChannelDm1);
  mockChannelsDaoUpdate.mockResolvedValue(mockChannelDm1);
  mockChannelsDaoDelete.mockImplementation((payload) => Promise.resolve(payload));

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
    it('should successfully return channel', async () => {
      const response = await request(app)
        .get(`/api/${Environment.getApiVersion()}/channels/${mockChannelDm1.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);

      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockChannelDm1);
    });

    it('should return 404 when channel not found', async () => {
      mockChannelsDaoGet.mockReturnValueOnce(Promise.resolve(null));
      await request(app)
        .get(`/api/${Environment.getApiVersion()}/channels/${mockChannelDm1.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.NotFound);
    });
  });

  describe('Get all user channels', () => {
    it('should successfully get all channels', async () => {
      const response = await request(app)
        .get(`/api/${Environment.getApiVersion()}/channels`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual([mockChannelDm1]);
    });

    it('should return empty', async () => {
      mockChannelsDaoGetUserChannels.mockResolvedValueOnce([]);

      const response = await request(app)
        .get(`/api/${Environment.getApiVersion()}/channels`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual([]);
    });
  });

  describe('Create group', () => {
    it('should successfully update channel', async () => {
      const response = await request(app)
        .post(`/api/${Environment.getApiVersion()}/channels/group`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .send(mockCreateGroupPayload)
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockChannelGroup);
      expect(mockUsersServiceGet).toHaveBeenCalled();
      expect(mockChannelsDaoCreateChannel).toHaveBeenCalled();
    });

    it('should fail to create group when user id is invalid', async () => {
      mockUsersServiceGet.mockResolvedValueOnce(null);

      const response = await request(app)
        .post(`/api/${Environment.getApiVersion()}/channels/group`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .send(mockCreateGroupPayload)
        .expect(HttpStatusCode.BadRequest);
      expect(response).toHaveProperty('text');
      expect(mockUsersServiceGet).toHaveBeenCalled();
      expect(mockChannelsDaoCreateChannel).not.toHaveBeenCalled();
    });

    it('should fail to create channel group if error happen on channels.dao', async () => {
      mockChannelsDaoCreateChannel.mockRejectedValueOnce(Error);

      await request(app)
        .post(`/api/${Environment.getApiVersion()}/channels/group`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .send(mockCreateGroupPayload)
        .expect(HttpStatusCode.InternalServerError);
      expect(mockUsersServiceGet).toHaveBeenCalled();
      expect(mockChannelsDaoCreateChannel).toHaveBeenCalled();
    });
  });

  describe('Update group', () => {
    it('should successfully update channel', async () => {
      const response = await request(app)
        .patch(`/api/${Environment.getApiVersion()}/channels/group/${mockChannelGroup.id}`)
        .send(mockUpdateGroupPayload)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockChannelDm1);
    });

    it('should successfully update channel when only some of the field is provided', async () => {
      const response = await request(app)
        .patch(`/api/${Environment.getApiVersion()}/channels/group/${mockChannelGroup.id}`)
        .send({
          name: 'new-name'
        })
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockChannelDm1);
    });

    it('should fail update channel when channel not found', async () => {
      mockChannelsDaoUpdate.mockResolvedValueOnce(null);

      await request(app)
        .patch(`/api/${Environment.getApiVersion()}/channels/group/${mockChannelDm1.id}`)
        .send(mockUpdateGroupPayload)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.NotFound);
    });
  });

  describe('delete', () => {
    it('should successfully delete a channel', async () => {
      const response = await request(app)
        .delete(`/api/${Environment.getApiVersion()}/channels/${mockChannelDm1.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockChannelDm1.id);
    });

    it('should throw an error when data access object throw an error', async () => {
      mockChannelsDaoDelete.mockRejectedValueOnce(new RestApiException('internal server error', 500));
      await request(app)
        .delete(`/api/${Environment.getApiVersion()}/channels/${mockChannelDm1.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.InternalServerError);
    });
  });
});
