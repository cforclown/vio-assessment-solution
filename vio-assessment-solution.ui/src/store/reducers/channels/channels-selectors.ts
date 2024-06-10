import { IChannel, IChannelsState } from '.';
import { IAppState } from '../../index';

export const selectChannelsState = (): (state: IAppState) => IChannelsState => (state: IAppState) => state.channels;
export const selectChannels = (): (state: IAppState) => IChannel[] => (state: IAppState) => state.channels.channels;
export const selectSelectedChannel = (): (state: IAppState) => IChannel | undefined => (state: IAppState) => state.channels.selectedChannel;
