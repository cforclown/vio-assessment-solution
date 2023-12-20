
import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/utils/common';

export enum EChannelRoles {
  OWNER='owner',
  ADMIN='admin',
  MEMBER='member'
}

export interface IChannelUserRole {
  user: string;
  role: EChannelRoles;
}

export interface IMessage {
  _id: string;
  id: string;
  channel: string;
  sender: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  archived?: boolean;
}

export interface IChannel {
  _id: string;
  id: string;
  name?: string; // only when type==='group'
  type: 'dm' | 'group';
  desc?: string;
  users: IUser[];
  roles?: IChannelUserRole[]; //  undefined if type==='dm'
  messages: IMessage[];
  unreadMessages?: number;
  lastMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  archived?: boolean;
}

export interface IChannelsState {
  loading: boolean;
  channels: IChannel[];
  selectedChannel?: IChannel;
}

const channelsInitialState: IChannelsState = {
  loading: true,
  channels: [],
};


const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsInitialState,
  reducers: {
    setChannelsLoading(state, { payload }) {
      state.loading = payload;
    },
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    setSelectedChannel(state, { payload }) {
      state.selectedChannel = payload;
    }
  }
});

export const { 
  setChannelsLoading, 
  setChannels,
  setSelectedChannel
} = channelsSlice.actions;

export default channelsSlice.reducer;
