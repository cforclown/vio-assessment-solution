import { Express } from 'express';
import request from 'supertest';
import { HttpStatusCode } from 'axios';
import { IO_INSTANCE_NAME } from '../../socketio';
import { container, setup } from '../../di-config';
import { Environment } from '../../utils';
import { IMessage } from '.';
import { mockChannelDm1, mockMsgRes, mockUpdateGroupPayload, mockUser } from '../../test';

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

const mockChannelsDaoGetChannelDmByUsers = jest.fn();
const mockChannelsServiceCreateDm = jest.fn();
const mockChannelsServicePushMsg = jest.fn();
const mockChannelsServiceEditMsg = jest.fn();
const mockChannelsServiceGetMsgs = jest.fn();
const mockChannelsDaoReadMsgs = jest.fn();
jest.mock('../channels/channels.service', () => ({
  ChannelsService: jest.fn().mockImplementation(() => ({
    getChannelDmByUsers: (user1: string, user2: string): void => mockChannelsDaoGetChannelDmByUsers(user1, user2),
    createDm: (payload: Record<string, any>): void => mockChannelsServiceCreateDm(payload),
    pushMsg: (channel: string, msg: IMessage): void => mockChannelsServicePushMsg(channel, msg),
    editMsg: (channel: string, msgId: string, payload: any): void => mockChannelsServiceEditMsg(channel, msgId, payload),
    getMsgs: (channel: string): void => mockChannelsServiceGetMsgs(channel),
    readMsgs: (channel: string): void => mockChannelsDaoReadMsgs(channel)
  }))
}));

describe('messages-router', () => {
  mockChannelsDaoGetChannelDmByUsers.mockResolvedValue(null);
  mockChannelsServiceCreateDm.mockResolvedValue(mockChannelDm1);
  mockChannelsServicePushMsg.mockResolvedValue([mockChannelDm1, mockMsgRes]);
  mockChannelsServiceEditMsg.mockResolvedValue(mockMsgRes);
  mockChannelsServiceGetMsgs.mockResolvedValue([mockMsgRes]);

  mockJWTVerify.mockReturnValue(mockUser);

  const baseUrl = `/api/${Environment.getApiVersion()}`;

  let app: Express;

  let spyOnAppGet: jest.SpyInstance;

  beforeAll(() => {
    setup();
    app = container.resolve('app');
  });

  beforeEach(() => {
    spyOnAppGet = jest.spyOn(app, 'get');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Get messages', () => {
    it('should successfully return messages', async () => {
      const response = await request(app)
        .get(`${baseUrl}/messages/${mockChannelDm1.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.Ok);

      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual([mockMsgRes]);
    });

    it('should return 404 when channel not found', async () => {
      mockChannelsServiceGetMsgs.mockResolvedValueOnce(null);

      await request(app)
        .get(`${baseUrl}/messages/${mockChannelDm1.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .expect(HttpStatusCode.NotFound);
    });
  });

  describe('Start a new conversation', () => {
    it('should successfully send message (create new channel)', async () => {
      const response = await request(app)
        .post(`${baseUrl}/messages/start`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .send({ receiver: mockUser.id, text: 'yo wassap!' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockChannelDm1);
      expect(spyOnAppGet).toHaveBeenCalledWith(IO_INSTANCE_NAME);
    });

    it('should fail to send message', async () => {
      mockChannelsServicePushMsg.mockResolvedValueOnce(null);

      await request(app)
        .post(`${baseUrl}/messages/start`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .send({ receiver: mockUser.id, text: 'yo wassap!' })
        .expect(HttpStatusCode.BadRequest);
      expect(spyOnAppGet).not.toHaveBeenCalledWith(IO_INSTANCE_NAME);
    });
  });

  describe('Send message', () => {
    it('should successfully send message', async () => {
      const response = await request(app)
        .put(`${baseUrl}/messages/${mockChannelDm1.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .send({ text: 'yo wassap!' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockMsgRes);
      expect(spyOnAppGet).toHaveBeenCalledWith(IO_INSTANCE_NAME);
    });

    it('should fail send message', async () => {
      mockChannelsServicePushMsg.mockResolvedValueOnce(null);

      await request(app)
        .put(`${baseUrl}/messages/${mockChannelDm1.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .send({ text: 'yo wassap!' })
        .expect(HttpStatusCode.BadRequest);
      expect(spyOnAppGet).not.toHaveBeenCalledWith(IO_INSTANCE_NAME);
    });

    it('should send message successfully but not broadcast it to receiver because receiver not found on channel users', async () => {
      mockChannelsServicePushMsg.mockResolvedValueOnce([{ ...mockChannelDm1, users: [] }, mockMsgRes]);

      const response = await request(app)
        .put(`${baseUrl}/messages/${mockChannelDm1.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .send({ text: 'yo wassap!' })
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockMsgRes);
      expect(spyOnAppGet).not.toHaveBeenCalledWith(IO_INSTANCE_NAME);
    });
  });

  describe('Read message', () => {
    it('should successfully read message', async () => {
      const response = await request(app)
        .patch(`${baseUrl}/messages/read/${mockChannelDm1.id}`)
        .set({ Authorization: 'Bearer fake-access-token' })
        .send(mockUpdateGroupPayload)
        .expect(HttpStatusCode.Ok);
      expect(response).toHaveProperty('text');
      const body = JSON.parse(response.text);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(true);
    });
  });
});
