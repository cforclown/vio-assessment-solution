import { Request } from 'express';
import { Server } from 'socket.io';
import { dro, Logger, RestApiException } from 'cexpress-utils/lib';
import { IMessage, ISendMsgReq, IStartConversationReq, MessagesService } from '.';
import { IChannelRes, IUser } from '..';
import { IO_INSTANCE_NAME } from '../../socketio';
import SIOController from '../../socketio/sio.controller';
import { HttpStatusCode } from 'axios';

export class MessagesController {
  public static readonly INSTANCE_NAME = 'messagesController';

  constructor (
    private readonly messagesService: MessagesService,
    private readonly sioController: SIOController
  ) {
    this.getMsgs = this.getMsgs.bind(this);
    this.startConversation = this.startConversation.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.readMsgs = this.readMsgs.bind(this);
  }

  async getMsgs ({ params }: Request): Promise<IMessage[]> {
    const msgs = await this.messagesService.getMsgs(params.id);
    if (!msgs) {
      throw new RestApiException('Invalid channel id', HttpStatusCode.NotFound);
    }

    return msgs;
  }

  async startConversation ({ app, user: u, body }: Request): Promise<IChannelRes | null> {
    const user = u as IUser;
    const payload: IStartConversationReq = body;

    const result = await this.messagesService.startConversation(user.id, payload);
    if (!result) {
      throw new RestApiException('Invalid channel id');
    }

    const [channel, msg] = result;

    const io: Server | undefined | null = app.get(IO_INSTANCE_NAME);
    io?.to(payload.receiver).emit('on-message', dro.response(msg));

    return channel;
  }

  async sendMsg ({ app, user: u, params, body }: Request): Promise<IMessage | null> {
    const user = u as IUser;
    const payload: ISendMsgReq = body;

    const result = await this.messagesService.sendMsg(params.id, user.id, payload);
    if (!result) {
      throw new RestApiException('Failed to send message');
    }

    const [channel, msg] = result;
    const receiver = channel.users.find(u => u.toString() !== user.id);
    if (!receiver) {
      Logger.warn('Unexpected error occured. Send message receiver not found');
    } else {
      const io: Server | undefined | null = app.get(IO_INSTANCE_NAME);
      io?.to(receiver.toString()).emit('on-message', dro.response(msg));
    }

    return msg;
  }

  async readMsgs ({ user, params }: Request): Promise<boolean> {
    await this.messagesService.readMsgs(params.id, (user as IUser).id);

    return true;
  }
}
