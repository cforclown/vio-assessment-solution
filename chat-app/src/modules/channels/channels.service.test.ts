import { RestApiException } from 'cexpress-utils/lib';
import { container, setup } from '../../di-config';
import { ChannelsService, EChannelRoles, IMessage } from '..';
import {
  mockChannelDm1,
  mockChannelGroup,
  mockCreateChannelDmReq,
  mockCreateGroupPayload,
  mockMsg,
  mockMsgRes,
  mockUpdateGroupPayload,
  mockUser
} from '../../test';

const mockChannelsDaoGet = jest.fn();
const mockChannelsDaoGetChannel = jest.fn();
const mockChannelsDaoGetAll = jest.fn();
const mockChannelsDaoCreate = jest.fn();
const mockChannelsDaoUpdate = jest.fn();
const mockChannelsDaoDelete = jest.fn();
const mockChannelsDaoGetUserChannels = jest.fn();
const mockChannelsDaoGetChannelDmByUsers = jest.fn();
const mockChannelsDaoCreateChannel = jest.fn();
const mockChannelsDaoPushMsg = jest.fn();
const mockChannelsDaoEditMsg = jest.fn();
const mockChannelsDaoReadMsgs = jest.fn();
const mockChannelsDaoGetMsgs = jest.fn();
jest.mock('./channels.dao', () => ({
  ChannelsDao: jest.fn().mockImplementation(() => ({
    get: (payload: any): void => mockChannelsDaoGet(payload),
    getChannel: (payload: any): void => mockChannelsDaoGetChannel(payload),
    getAll: (payload: any): void => mockChannelsDaoGetAll(payload),
    create: (payload: any): void => mockChannelsDaoCreate(payload),
    update: (payload: any): void => mockChannelsDaoUpdate(payload),
    delete: (payload: any): void => mockChannelsDaoDelete(payload),
    getUserChannels: (payload: any): void => mockChannelsDaoGetUserChannels(payload),
    getChannelDmByUsers: (user1: string, user2: string): void => mockChannelsDaoGetChannelDmByUsers(user1, user2),
    createChannel: (payload: any): void => mockChannelsDaoCreateChannel(payload),
    pushMsg: (channel: string, msg: IMessage, populateUsers?: boolean): void => mockChannelsDaoPushMsg(channel, msg, populateUsers),
    editMsg: (channel: string, msgId: string, text: string): void => mockChannelsDaoEditMsg(channel, msgId, text),
    readMsgs: (channel: string, user: string): void => mockChannelsDaoReadMsgs(channel, user),
    getMsgs: (channel: string): void => mockChannelsDaoGetMsgs(channel)
  }))
}));

const mockUsersServiceGet = jest.fn();
jest.mock('../users/users.service', () => ({
  UsersService: jest.fn().mockImplementation(() => ({
    get: (payload: any): void => mockUsersServiceGet(payload)
  }))
}));

jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'),
  model: jest.fn().mockImplementation(() => ({}))
}));

describe('channels-service', () => {
  mockUsersServiceGet.mockResolvedValue(mockUser);
  mockChannelsDaoGet.mockResolvedValue(mockChannelDm1);
  mockChannelsDaoGetAll.mockReturnValue(Promise.resolve([mockChannelDm1]));
  mockChannelsDaoCreate.mockReturnValue(Promise.resolve(mockChannelDm1));
  mockChannelsDaoUpdate.mockReturnValue(Promise.resolve(mockChannelDm1));
  mockChannelsDaoDelete.mockImplementation((payload) => Promise.resolve(payload));
  mockChannelsDaoGetChannelDmByUsers.mockResolvedValue([mockChannelDm1]);
  mockChannelsDaoGetUserChannels.mockResolvedValue([mockChannelDm1]);
  mockChannelsDaoCreateChannel.mockResolvedValue(mockChannelGroup);
  mockChannelsDaoPushMsg.mockResolvedValue([mockChannelDm1, mockMsgRes]);
  mockChannelsDaoEditMsg.mockResolvedValue(mockMsgRes);
  mockChannelsDaoGetMsgs.mockResolvedValue([mockMsgRes]);

  let channelsService: ChannelsService;

  beforeAll(() => {
    setup();
    channelsService = container.resolve(ChannelsService.INSTANCE_NAME);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get getAll', () => {
    it('should successfully return channel', async () => {
      expect(await channelsService.get(mockChannelDm1.id)).toEqual(mockChannelDm1);
      expect(await channelsService.getAll()).toEqual([mockChannelDm1]);
    });

    it('should return null when channel not found', async () => {
      mockChannelsDaoGet.mockReturnValueOnce(null);

      expect(await channelsService.get(mockChannelDm1.id)).toEqual(null);
    });
  });

  describe('getChannelDmByUsers', () => {
    it('should successfully return channel', async () => {
      expect(await channelsService.getChannelDmByUsers(mockUser.id, mockUser.id)).toEqual([mockChannelDm1]);
    });

    it('should return null when channel not found', async () => {
      mockChannelsDaoGetChannelDmByUsers.mockReturnValueOnce(null);

      expect(await channelsService.getChannelDmByUsers(mockUser.id, mockUser.id)).toEqual(null);
    });
  });

  describe('getUserChannels', () => {
    it('should successfully return channels', async () => {
      expect(await channelsService.getUserChannels(mockUser.id)).toEqual([mockChannelDm1]);
    });

    it('should return empty array', async () => {
      mockChannelsDaoGetUserChannels.mockReturnValueOnce([]);

      expect(await channelsService.getUserChannels(mockUser.id)).toEqual([]);
    });
  });

  describe('create', () => {
    it('should successfully create a channel', async () => {
      expect(await channelsService.create(mockCreateChannelDmReq)).toEqual(mockChannelDm1);
    });
  });

  describe('createDm', () => {
    beforeEach(() => {
      mockChannelsDaoCreateChannel.mockResolvedValue(mockChannelDm1);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should successfully create a dm channel', async () => {
      expect(await channelsService.createDm([mockUser.id, mockUser.id])).toEqual(mockChannelDm1);
      expect(mockChannelsDaoCreateChannel).toHaveBeenCalled();
      const [[payload]] = mockChannelsDaoCreateChannel.mock.calls;
      expect(payload.type).toEqual('dm');
    });

    it('should failed to create dm channel when user id is not valid', async () => {
      mockUsersServiceGet.mockResolvedValueOnce(null);

      await expect(() => channelsService.createDm([mockUser.id, mockUser.id])).rejects.toThrow(RestApiException);
    });
  });

  describe('createGroup', () => {
    beforeEach(() => {
      mockChannelsDaoCreateChannel.mockResolvedValue(mockChannelGroup);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should successfully create a group channel', async () => {
      expect(await channelsService.createGroup(mockUser.id, mockCreateGroupPayload)).toEqual(mockChannelGroup);
      expect(mockChannelsDaoCreateChannel).toHaveBeenCalled();
      const [[payload]] = mockChannelsDaoCreateChannel.mock.calls;
      expect(payload.type).toEqual('group');
    });

    it('should failed to create group channel when user id is not valid', async () => {
      mockUsersServiceGet.mockResolvedValueOnce(null);

      await expect(() => channelsService.createGroup(mockUser.id, mockCreateGroupPayload)).rejects.toThrow(RestApiException);
      expect(mockChannelsDaoCreateChannel).not.toHaveBeenCalled();
    });
  });

  describe('pushMsg', () => {
    it('should successfully a message to channel', async () => {
      expect(await channelsService.pushMsg(mockChannelDm1.id, mockMsg)).toEqual([mockChannelDm1, mockMsgRes]);
      expect(mockChannelsDaoPushMsg).toHaveBeenCalled();
      expect(await channelsService.pushMsg(mockChannelDm1.id, mockMsg, true)).toEqual([mockChannelDm1, mockMsgRes]);
      expect(mockChannelsDaoPushMsg).toHaveBeenCalled();
    });
  });

  describe('updateGroup', () => {
    beforeEach(() => {
      mockChannelsDaoGetChannel.mockResolvedValue(mockChannelGroup);
      mockChannelsDaoUpdate.mockResolvedValueOnce(mockChannelGroup);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should successfully update a channel', async () => {
      expect(await channelsService.updateGroup(mockChannelGroup.id, mockUpdateGroupPayload)).toEqual(mockChannelGroup);
    });

    it('should successfully update member role', async () => {
      expect(await channelsService.updateGroup(mockChannelGroup.id, {
        ...mockUpdateGroupPayload,
        roles: [{
          user: mockUser.id,
          role: EChannelRoles.ADMIN
        }]
      })).toEqual(mockChannelGroup);
    });

    it('should failed to update channel infor and member role when using invalid channel id', async () => {
      mockChannelsDaoGetChannel.mockResolvedValue(null);

      await expect(() => channelsService.updateGroup(mockChannelGroup.id, {
        ...mockUpdateGroupPayload,
        roles: [{
          user: mockUser.id,
          role: EChannelRoles.ADMIN
        }]
      })).rejects.toThrow(RestApiException);
    });

    it('should failed to update member role when using invalid user id', async () => {
      mockUsersServiceGet.mockResolvedValueOnce(null);

      await expect(() => channelsService.updateGroup(mockChannelGroup.id, {
        ...mockUpdateGroupPayload,
        roles: [{
          user: mockUser.id,
          role: EChannelRoles.ADMIN
        }]
      })).rejects.toThrow(RestApiException);
    });
  });

  describe('update', () => {
    it('should successfully update a channel', async () => {
      expect(await channelsService.updateGroup(mockChannelGroup.id, mockUpdateGroupPayload)).toEqual(mockChannelGroup);
    });
  });

  describe('editMsg', () => {
    it('should successfully update a channel', async () => {
      expect(await channelsService.editMsg(mockChannelDm1.id, mockMsgRes.id, 'mock update message text')).toEqual(mockMsgRes);
      expect(mockChannelsDaoEditMsg).toHaveBeenCalled();
    });
  });

  describe('readMsgs', () => {
    it('should successfully update a channel', async () => {
      expect(await channelsService.readMsgs(mockChannelDm1.id, mockUser.id)).toBeUndefined();
      expect(mockChannelsDaoReadMsgs).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should successfully delete a channel', async () => {
      expect(await channelsService.delete('channel-id')).toEqual('channel-id');
    });
  });

  describe('getMsgs', () => {
    it('should successfully update a channel', async () => {
      expect(await channelsService.getMsgs(mockChannelDm1.id)).toEqual([mockMsgRes]);
      expect(mockChannelsDaoGetMsgs).toHaveBeenCalled();
    });
  });
});
