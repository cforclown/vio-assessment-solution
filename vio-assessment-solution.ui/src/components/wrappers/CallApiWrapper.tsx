import { toast } from 'react-toastify';
import { CallAPIException, HTTPStatusCodes } from '@/utils/call-api';
import { NavigateFunction } from 'react-router-dom';

function callApiWrapper<T>(
  callback: (...args: any) => Promise<T | void>,
  loadingSetter?: (isloading: boolean) => void,
  navigate?: NavigateFunction
): (...args: any) => Promise<T | void> {
  return async (...callbackArgs: any) => {
    try {
      loadingSetter?.(true);
      const result = await callback(...callbackArgs);
      return result;
    } catch (err) {
      if (err instanceof CallAPIException) {
        if (err.message) {
          toast.error(err.message);
        }
        if (!err.message && err.status === HTTPStatusCodes.NotFound) {
          toast.error('Endpoint not found');
        }
        if (err.status === HTTPStatusCodes.Unauthorized) {
          navigate?.('/auth/signin');
        }
      } else {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    } finally {
      loadingSetter?.(false);
    }
  };
}

export default callApiWrapper;
