import { IChannel, IMessage } from '@/store/reducers/channels';
import { callProtectedMainAPI, getAPIEndpoint } from '@/utils/call-api';

export const getChannels = () => callProtectedMainAPI(getAPIEndpoint('/channels'));
export const startConversation = (receiver: string, text: string): Promise<IChannel> => callProtectedMainAPI(
  getAPIEndpoint('/messages/start', 'POST'), 
  { receiver, text }
);

export const getChannelMsgs = (channel: string): Promise<IMessage[]> => callProtectedMainAPI(getAPIEndpoint(`/messages/${channel}`));

export interface ISendMsgPayload {
  channel: string;
  text: string;
}

export const sendMsg = ({ channel, text }: ISendMsgPayload) => callProtectedMainAPI(
  getAPIEndpoint(`/messages/${channel}`, 'PUT'),
  { text }
);

export const readMsgs = (channel: string) => callProtectedMainAPI(getAPIEndpoint(`/messages/read/${channel}`, 'PATCH'));
