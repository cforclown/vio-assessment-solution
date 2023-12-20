import { Types } from 'mongoose';
import { some } from 'lodash';
import { BaseService, RestApiException } from 'cexpress-utils/lib';
import { IMessage, IUser, UsersService } from '../';
import { ChannelsDao, IChannel, IChannelRes, ICreateDmChannelReq, ICreateGroupReq, IUpdateChannelReq, IUpdateGroupReq } from '.';

export class ChannelsService extends BaseService<IChannel> {
  public static readonly INSTANCE_NAME = 'channelsService';

  constructor (private readonly channelsDao: ChannelsDao, private readonly usersService: UsersService) {
    super(channelsDao);

    this.channelsDao = channelsDao;
    this.usersService = usersService;
  }

  async getChannelDmByUsers (user1: string, user2: string): Promise<IChannelRes | null> {
    return this.channelsDao.getChannelDmByUsers(user1, user2);
  }

  async getUserChannels (user: string): Promise<Omit<IChannelRes, 'messages'>[]> {
    return this.channelsDao.getUserChannels(user);
  }

  async createDm (users: [string, string]): Promise<IChannelRes> {
    const usersDocs = await Promise.all(users.map(user => this.usersService.get(user)));
    if (some(usersDocs, user => !user)) {
      throw new RestApiException('Some user id is invalid');
    }

    const dmChannel: ICreateDmChannelReq = {
      type: 'dm',
      users: usersDocs.map(user => new Types.ObjectId((user as IUser).id)) as [Types.ObjectId, Types.ObjectId]
    };

    return this.channelsDao.createChannel(dmChannel, true);
  }

  async createGroup (user: string, payload: ICreateGroupReq): Promise<IChannelRes> {
    const usersDocs = await Promise.all(payload.users.map(user => this.usersService.get(user)));
    if (some(usersDocs, user => !user)) {
      throw new RestApiException('Some user id is invalid');
    }

    const users = [user, ...payload.users.filter(u => u !== user)];
    const groupChannel: ICreateGroupReq & { type: 'group', } = {
      ...payload,
      type: 'group',
      users
    };

    return this.channelsDao.createChannel(groupChannel, true);
  }

  async updateGroup (channel: string, payload: IUpdateGroupReq): Promise<IChannel | null> {
    if (payload.roles) {
      const [channelDoc, ...usersDocs] = await Promise.all([
        this.channelsDao.getChannel(channel),
        ...payload.roles.map(role => this.usersService.get(role.user))
      ]);
      if (!channelDoc) {
        throw new RestApiException('Channel not found');
      }
      if (some(usersDocs, user => !user) || some(payload.roles, role => !usersDocs.find(u => u?.id === role.user))) {
        throw new RestApiException('Some roles assign to invalid user id');
      }
    }

    const groupChannel: IUpdateChannelReq = {
      id: channel,
      ...payload
    };

    return this.update(groupChannel);
  }

  async pushMsg (channel: string, msg: IMessage): Promise<[IChannel, IMessage] | null>
  async pushMsg (channel: string, msg: IMessage, populateUsers: true): Promise<[IChannelRes, IMessage] | null>
  async pushMsg (channel: string, msg: IMessage, populateUsers?: boolean): Promise<[IChannel | IChannelRes, IMessage] | null> {
    return this.channelsDao.pushMsg(channel, msg, populateUsers as any);
  }

  async editMsg (channel: string, msgId: string, text: string): Promise<IMessage | null> {
    return this.channelsDao.editMsg(channel, msgId, text);
  }

  async readMsgs (channel: string, user: string): Promise<void> {
    return this.channelsDao.readMsgs(channel, user);
  }

  async getMsgs (channel: string): Promise<IMessage[] | null> {
    return this.channelsDao.getMsgs(channel);
  }
}
