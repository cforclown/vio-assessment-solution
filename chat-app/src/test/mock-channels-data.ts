import { Types } from 'mongoose';
import {
  IChannelRes,
  ICreateDmChannelReq,
  ICreateGroupReq,
  IMessage,
  IMessageRes,
  IUpdateGroupReq
} from '../modules';
import { EChannelRoles } from '../modules/channels';
import { mockUser } from './mock-users-data';

const mockObjectId1 = new Types.ObjectId();
export const mockChannelDm1: IChannelRes = {
  _id: mockObjectId1.toString(),
  id: mockObjectId1.toString(),
  name: 'channel name',
  type: 'dm',
  desc: 'mock channel desc',
  users: [mockUser]
};

const mockObjectId2 = new Types.ObjectId();
export const mockChannelDm2: IChannelRes = {
  _id: mockObjectId2.toString(),
  id: mockObjectId2.toString(),
  name: 'channel name',
  type: 'dm',
  desc: 'mock channel desc',
  users: [mockUser]
};

export const mockChannelGroup: IChannelRes = {
  _id: mockObjectId1.toString(),
  id: mockObjectId1.toString(),
  name: 'channel name',
  type: 'group',
  desc: 'mock channel desc',
  users: [mockUser]
};

export const mockCreateChannelDmReq: ICreateDmChannelReq = {
  type: 'dm',
  users: [new Types.ObjectId(), new Types.ObjectId()]
};

export const mockCreateGroupPayload: ICreateGroupReq = {
  name: 'channel name',
  desc: 'mock channel desc',
  users: [mockUser.id],
  roles: [{
    user: mockUser.id as string,
    role: EChannelRoles.OWNER
  }]
};

export const mockUpdateChannelPayload: IUpdateGroupReq = {
  name: 'channel name',
  desc: 'mock channel desc'
};

export const mockUpdateGroupPayload: IUpdateGroupReq = {
  name: 'channel name',
  desc: 'mock channel desc'
};

const msgId = new Types.ObjectId();

export const mockMsg: IMessage = {
  _id: msgId,
  id: msgId.toString(),
  channel: new Types.ObjectId(),
  sender: mockUser.id,
  text: 'mock message text',
  createdAt: new Date()
};

export const mockMsgRes: IMessageRes = {
  _id: msgId.toString(),
  id: msgId.toString(),
  channel: mockChannelDm1._id,
  sender: mockUser.id,
  text: 'mock message text',
  createdAt: '2023-12-18T12:31:18.260Z'
};
