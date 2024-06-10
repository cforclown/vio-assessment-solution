
import { createSlice } from '@reduxjs/toolkit';
import Themes, { ITheme, getTheme } from '../../../themes/themes';

export interface ISidebarState {
  hidden: boolean;
  collapsed: boolean;
}

export interface ILayoutState {
  isSm?: boolean;
  sidebarState: ISidebarState;
  theme: ITheme;
}

const layoutInitialState: ILayoutState = {
  sidebarState: {
    collapsed: false,
    hidden: true
  },
  theme: Themes.PRIMARY,
};


const layoutSlice = createSlice({
  name: 'layout',
  initialState: layoutInitialState,
  reducers: {
    setIsSM(state, action) {
      state.isSm = action.payload;
    },
    showSidebar(state) {
      state.sidebarState.hidden = false;
    },
    hideSidebar(state) {
      state.sidebarState.hidden = true;
    },
    collapseSidebar(state) {
      state.sidebarState.collapsed = true;
    },
    uncollapseSidebar(state) {
      state.sidebarState.collapsed = false;
    },
    changeTheme(state, action) {
      state.theme = getTheme(action.payload) ?? state.theme;
    }
  }
});

export const { 
  setIsSM, 
  showSidebar, 
  hideSidebar, 
  collapseSidebar, 
  uncollapseSidebar, 
  changeTheme 
} = layoutSlice.actions;

export default layoutSlice.reducer;
