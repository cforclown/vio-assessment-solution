import { IAppState } from '../../index';

export const selectLayoutState = () => (state: IAppState) => state.layout;
export const selectSidebarState = () => (state: IAppState) => state.layout.sidebarState;
