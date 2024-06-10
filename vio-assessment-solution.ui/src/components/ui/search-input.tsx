import {
  useRef, 
  LegacyRef, 
  RefObject, 
  forwardRef
} from 'react';
import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Input, InputProps } from './input';
import { twMerge } from 'tailwind-merge';

interface ISearchInput extends InputProps {
  submitsearch(value: string): void;
  withClearBtn?: boolean;
  submitOnClear?: boolean;
}

function SearchInput({
  submitsearch, 
  withClearBtn,
  submitOnClear, 
  placeholder, 
  ...props
}: ISearchInput, ref?: LegacyRef<HTMLInputElement>): JSX.Element {
  const defaultRef = useRef<HTMLInputElement>(null);

  const onKeyDown = (e: any): void => {
    try {
      const currentRef = getRef();
      if (!currentRef) {
        return;
      }

      if (e.key !== 'Enter') {
        return;
      }
      if (!e.shiftKey) {
        e.preventDefault();
        submitsearch?.(currentRef.value);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Search input: Unextecped error occured');
    }
  };

  const onClearClick = (): void => {
    const currentRef = getRef();
    if (!currentRef) {
      return;
    }
    currentRef.value = '';
    if (submitOnClear) {
      submitsearch?.('');
    }
  };

  const getRef = (): HTMLInputElement | null => (ref as RefObject<HTMLInputElement> | null ?? defaultRef).current;

  return (
    <div className="w-full relative flex flex-row items-center">
      <div className="w-[36px] h-full absolute left-0 flex justify-center items-center">
        <MagnifyingGlassIcon />
      </div>
      <Input
        {...props}
        ref={(ref as RefObject<HTMLInputElement> | null) ?? defaultRef}
        placeholder={placeholder ?? 'Search'}
        onKeyDown={onKeyDown ?? onKeyDown}
        className={twMerge('pl-[36px]', withClearBtn ? 'pr-[44px]' : '', props.className)}
      />
      {withClearBtn && (
        <div 
          className="w-[36px] h-full hover:bg-[#0abde311] absolute right-0 flex justify-center items-center cursor-pointer"
          onClick={onClearClick}
        >
          <Cross1Icon 
            className="h-full " 
          />
        </div>
      )}
    </div>
  );
}

export default forwardRef(SearchInput);
