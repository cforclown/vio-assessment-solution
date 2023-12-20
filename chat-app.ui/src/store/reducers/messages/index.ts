
import { createSlice } from '@reduxjs/toolkit';

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

export interface IMessagesState {
  loading: boolean;
  msgs: IMessage[];
}

const msgsInitialState: IMessagesState = {
  loading: true,
  msgs: []
};


const msgsSlice = createSlice({
  name: 'messages',
  initialState: msgsInitialState,
  reducers: {
    setMsgsLoading(state, action) {
      state.loading = action.payload;
    },
    setMsgs(state, action) {
      state.msgs = action.payload;
    },
    pushMsg(state, action) {
      state.msgs.push(action.payload);
    }
  }
});

export const { 
  setMsgsLoading, 
  setMsgs,
  pushMsg 
} = msgsSlice.actions;

export default msgsSlice.reducer;
