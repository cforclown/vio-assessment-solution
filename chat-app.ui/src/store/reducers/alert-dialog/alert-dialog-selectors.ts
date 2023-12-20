import { IAppState } from '@/store';
import { IAlertDialogState } from '.';

export const selectAlertDialogState = (state: IAppState): IAlertDialogState => state.alertDialog;
