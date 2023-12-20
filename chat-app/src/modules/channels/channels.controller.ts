import { Request } from 'express';
import { HttpStatusCode } from 'axios';
import { BaseController, RestApiException } from 'cexpress-utils/lib';
import { IUser } from '..';
import { ChannelsService, IChannel, IChannelRes } from '.';

export class ChannelsController extends BaseController<IChannel> {
  public static readonly INSTANCE_NAME = 'channelsController';

  private readonly channelsService: ChannelsService;

  constructor (channelsService: ChannelsService) {
    super(channelsService);
    this.channelsService = channelsService;

    this.getUserChannels = this.getUserChannels.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.updateGroup = this.updateGroup.bind(this);
  }

  async getUserChannels ({ user }: Request): Promise<Omit<IChannelRes, 'messages'>[]> {
    return this.channelsService.getUserChannels((user as IUser).id);
  }

  async createGroup ({ user, body }: Request): Promise<IChannelRes> {
    return this.channelsService.createGroup((user as IUser).id, body);
  }

  async updateGroup ({ params, body }: Request): Promise<IChannel> {
    const channel = await this.channelsService.updateGroup(params.id, body);
    if (!channel) {
      throw new RestApiException('Failed to update channel', HttpStatusCode.NotFound);
    }

    return channel;
  }
}
