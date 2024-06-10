
import { createSlice } from '@reduxjs/toolkit';

export interface IAlertDialogState {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirmText?: string;
  onConfirm?: (data?: any) => Promise<void>;
  onCancelText?: string;
  onCancel?: () => Promise<void>;
}

const initialState: IAlertDialogState = {
  isOpen: false
};


const alertDialogSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    openAlertDialog(state, action) {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.onConfirmText = action.payload.onConfirmText;
      state.onConfirm = action.payload.onConfirm;
      state.onCancelText = action.payload.onCancelText;
      state.onCancel = action.payload.onCancel;
    },
    onConfirmClick(state) {
      state.onConfirm?.();
      state.isOpen = false;
    },
    onCancelClick(state) {
      state.onCancel?.();
      state.isOpen = false;
    }
  }
});

export const { openAlertDialog, onConfirmClick, onCancelClick } = alertDialogSlice.actions;

export default alertDialogSlice.reducer;
