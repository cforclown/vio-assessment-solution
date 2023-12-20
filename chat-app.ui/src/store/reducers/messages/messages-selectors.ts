import { IMessage, IMessagesState } from '.';
import { IAppState } from '../../index';

export const selectMsgsState = (): (state: IAppState) => IMessagesState => (state: IAppState) => state.msgs;
export const selectMsgsLoading = (): (state: IAppState) => boolean => (state: IAppState) => state.msgs.loading;
export const selectMsgs = (): (state: IAppState) => IMessage[] => (state: IAppState) => state.msgs.msgs;
