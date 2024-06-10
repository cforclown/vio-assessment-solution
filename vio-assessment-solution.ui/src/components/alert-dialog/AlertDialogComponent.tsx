import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

export interface IAlertDialogContainerProps {
  trigger?: JSX.Element;
  title?: string;
  message?: string;
  onConfirmText?: string;
  onConfirm?: () => void;
  onCancelText?: string;
  onCancel?: () => void;
}

function AlertDialogContainer({
  trigger,
  title,
  message,
  onConfirmText,
  onConfirm,
  onCancelText,
  onCancel
}: IAlertDialogContainerProps): JSX.Element | null {
  const { t } = useTranslation('common');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline">Show Dialog</Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? t('areYouSure')}</AlertDialogTitle>
          {message && (
            <AlertDialogDescription>
              {message}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{onCancelText ?? t('cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{onConfirmText ?? t('confirm')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDialogContainer;
