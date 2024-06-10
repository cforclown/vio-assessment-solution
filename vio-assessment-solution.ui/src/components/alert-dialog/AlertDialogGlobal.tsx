import { useSelector, useDispatch } from 'react-redux';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { useTranslation } from 'react-i18next';
import { selectAlertDialogState } from '@/store/reducers/alert-dialog/alert-dialog-selectors';
import { onCancelClick, onConfirmClick } from '@/store/reducers/alert-dialog';

export interface IAlertDialogContainerProps {
  trigger?: JSX.Element;
  title?: string;
  message?: string;
  onConfirmText?: string;
  onConfirm?: () => void;
  onCancelText?: string;
  onCancel?: () => void;
}

function AlertDialogGlobal(): JSX.Element | null {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const alertDialogState = useSelector(selectAlertDialogState);

  return (
    <AlertDialog open={alertDialogState.isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertDialogState.title ?? t('common.areYouSure')}</AlertDialogTitle>
          {alertDialogState.message && (
            <AlertDialogDescription>
              {alertDialogState.message}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => dispatch(onCancelClick())}>{alertDialogState.onCancelText ?? t('common.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={() => dispatch(onConfirmClick())}>{alertDialogState.onConfirmText ?? t('common.confirm')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDialogGlobal;
