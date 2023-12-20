import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

function useAction(actionCreator: any, argMap?: any): ((...args: any) => void) {
  const dispatch = useDispatch();

  const callback = (argMap === undefined)
    ? (...args: any) => {
      dispatch(actionCreator(...args));
    }
    : (...args: any) => {
      dispatch(actionCreator(...argMap(...args)));
    };

  return useCallback(callback, [ actionCreator, argMap, dispatch ]);
}

export default useAction;
