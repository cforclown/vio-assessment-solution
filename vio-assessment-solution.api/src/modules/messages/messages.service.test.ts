import { Types } from 'mongoose';
import { container, setup } from '../../di-config';
import { MessagesService } from '.';
import { mockChannelDm1, mockMsgRes, mockUser } from '../../test';

const mockChannelsDaoGetChannelDmByUsers = jest.fn();
const mockChannelsDaoGetMsgs = jest.fn();
const mockChannelsDaoCreateChannel = jest.fn();
const mockChannelsDaoPushMsg = jest.fn();
const mockChannelsDaoEditMsg = jest.fn();
const mockChannelsDaoReadMsgs = jest.fn();
jest.mock('../channels/channels.dao', () => ({
  ChannelsDao: jest.fn().mockImplementation(() => ({
    getChannelDmByUsers: (user1: string, user2: string): void => mockChannelsDaoGetChannelDmByUsers(user1, user2),
    getMsgs: (payload: any): void => mockChannelsDaoGetMsgs(payload),
    createChannel: (payload: any): void => mockChannelsDaoCreateChannel(payload),
    pushMsg: (payload: any): void => mockChannelsDaoPushMsg(payload),
    editMsg: (payload: any): void => mockChannelsDaoEditMsg(payload),
    readMsgs: (payload: any): void => mockChannelsDaoReadMsgs(payload)
  }))
}));

const mockUsersDaoGet = jest.fn();
jest.mock('../users/users.dao', () => ({
  UsersDao: jest.fn().mockImplementation(() => ({
    get: (payload: any): void => mockUsersDaoGet(payload)
  }))
}));

jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'),
  model: jest.fn().mockImplementation(() => ({}))
}));

describe('messages-service', () => {
  mockChannelsDaoGetChannelDmByUsers.mockResolvedValue(null);
  mockChannelsDaoGetMsgs.mockResolvedValue([mockChannelDm1]);
  mockChannelsDaoCreateChannel.mockResolvedValue(mockChannelDm1);
  mockChannelsDaoPushMsg.mockResolvedValue([mockChannelDm1, mockMsgRes]);
  mockChannelsDaoEditMsg.mockResolvedValue(mockMsgRes);
  mockChannelsDaoReadMsgs.mockImplementation((payload) => Promise.resolve(payload));
  mockUsersDaoGet.mockResolvedValue(mockUser);

  let messagesService: MessagesService;

  beforeAll(() => {
    setup();
    messagesService = container.resolve(MessagesService.INSTANCE_NAME);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMsgs', () => {
    it('should successfully return messages', async () => {
      expect(await messagesService.getMsgs(mockChannelDm1.id)).toEqual([mockChannelDm1]);
    });

    it('should return null', async () => {
      mockChannelsDaoGetMsgs.mockReturnValueOnce(null);

      expect(await messagesService.getMsgs(mockChannelDm1.id)).toEqual(null);
    });
  });

  describe('startConversation', () => {
    it('should successfully create a channel and push initial message', async () => {
      expect(await messagesService.startConversation(mockUser.id, { receiver: mockUser.id, text: 'yo wassap!' })).toEqual([mockChannelDm1, mockMsgRes]);
      expect(mockChannelsDaoGetChannelDmByUsers).toHaveBeenCalled();
      expect(mockChannelsDaoCreateChannel).toHaveBeenCalled();
      expect(mockChannelsDaoPushMsg).toHaveBeenCalled();
    });
    it('should push the message to existing channel', async () => {
      mockChannelsDaoGetChannelDmByUsers.mockReturnValue(Promise.resolve(mockChannelDm1));

      expect(await messagesService.startConversation(mockUser.id, { receiver: mockUser.id, text: 'yo wassap!' })).toEqual([mockChannelDm1, mockMsgRes]);
      expect(mockChannelsDaoGetChannelDmByUsers).toHaveBeenCalled();
      expect(mockChannelsDaoCreateChannel).not.toHaveBeenCalled();
      expect(mockChannelsDaoPushMsg).toHaveBeenCalled();
    });

    it('should return null when failed to push message', async () => {
      mockChannelsDaoPushMsg.mockResolvedValueOnce(null);

      expect(await messagesService.startConversation(mockUser.id, { receiver: mockUser.id, text: 'yo wassap!' })).toEqual(null);
    });
  });

  describe('sendMsg', () => {
    it('should successfully create a channel and push initial message', async () => {
      expect(await messagesService.sendMsg(mockChannelDm1.id, mockUser.id, { text: 'yo wassap!' })).toEqual([mockChannelDm1, mockMsgRes]);
      expect(mockChannelsDaoPushMsg).toHaveBeenCalled();
    });
    it('should return null when channelsService return null', async () => {
      mockChannelsDaoPushMsg.mockResolvedValueOnce(null);

      expect(await messagesService.sendMsg(mockChannelDm1.id, mockUser.id, { text: 'yo wassap!' })).toEqual(null);
      expect(mockChannelsDaoPushMsg).toHaveBeenCalled();
    });
  });

  describe('editMsg', () => {
    it('should successfully create a channel and push initial message', async () => {
      expect(await messagesService.editMsg(mockChannelDm1.id, mockMsgRes.id, { text: 'yo wassap!' })).toEqual(mockMsgRes);
      expect(mockChannelsDaoEditMsg).toHaveBeenCalled();
    });
    it('should return null when channelsService return null', async () => {
      mockChannelsDaoEditMsg.mockResolvedValueOnce(null);

      expect(await messagesService.editMsg(mockChannelDm1.id, mockMsgRes.id, { text: 'yo wassap!' })).toEqual(null);
      expect(mockChannelsDaoEditMsg).toHaveBeenCalled();
    });
  });

  describe('readMsgs', () => {
    it('should successfully create a channel and push initial message', async () => {
      await messagesService.readMsgs(mockChannelDm1.id, mockUser.id);
      expect(mockChannelsDaoReadMsgs).toHaveBeenCalled();
    });
  });

  describe('createMsgObj', () => {
    it('should successfully create a channel and push initial message', async () => {
      const msg = messagesService.createMsgObj(mockChannelDm1.id, mockUser.id, 'yo wassap!');
      expect(msg._id).toBeTruthy();
      expect(msg.id).toBeTruthy();
      expect(msg.channel).toEqual(new Types.ObjectId(mockChannelDm1.id));
      expect(msg.sender).toEqual(new Types.ObjectId(mockUser.id));
      expect(msg.text).toEqual('yo wassap!');
      expect(msg.createdAt).toBeTruthy();
      expect(msg.updatedAt).toBeTruthy();
    });
  });
});
