import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import LayoutReducer, { ILayoutState } from './reducers/layout';
import UsercontextReducer, { IUserContextState } from './reducers/user-context';
import AlertDialogReducer, { IAlertDialogState } from './reducers/alert-dialog';

export interface IAppState {
  layout: ILayoutState;
  userContext: IUserContextState;
  alertDialog: IAlertDialogState;
}

const reducers = combineReducers({
  layout: LayoutReducer,
  userContext: UsercontextReducer,
  alertDialog: AlertDialogReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducers,
  middleware: () => [ sagaMiddleware ]
});

export default store;
