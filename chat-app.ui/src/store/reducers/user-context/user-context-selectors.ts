import { IAppState } from '@/store';
import { IUserContext } from '.';

export const selectUserContext = (): (state: IAppState) => IUserContext | undefined => (state: IAppState) => state.userContext.context;
