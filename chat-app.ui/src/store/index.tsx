import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import LayoutReducer, { ILayoutState } from './reducers/layout';
import UsercontextReducer, { IUserContextState } from './reducers/user-context';
import AlertDialogReducer, { IAlertDialogState } from './reducers/alert-dialog';
import ChannelsReducer, { IChannelsState } from './reducers/channels';
import channelsSaga from './reducers/channels/channels-saga';
import MessagesReducer, { IMessagesState } from './reducers/messages';
import messagesSaga from './reducers/messages/messages-saga';

export interface IAppState {
  layout: ILayoutState;
  userContext: IUserContextState;
  alertDialog: IAlertDialogState;
  channels: IChannelsState;
  msgs: IMessagesState;
}

const reducers = combineReducers({
  layout: LayoutReducer,
  userContext: UsercontextReducer,
  alertDialog: AlertDialogReducer,
  channels: ChannelsReducer,
  msgs: MessagesReducer
});

function* rootSaga() {
  yield all([
    fork(channelsSaga),
    fork(messagesSaga)
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducers,
  middleware: () => [ sagaMiddleware ]
});

sagaMiddleware.run(rootSaga);

export default store;
