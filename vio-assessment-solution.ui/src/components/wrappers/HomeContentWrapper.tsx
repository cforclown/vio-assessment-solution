import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Loader from '@/components/loader/Loader.style';

export interface IContentWrapper {
  loading?: boolean;
  className?: string;
}

function HomeContentWrapper({ loading, className, children }: PropsWithChildren<IContentWrapper>) {
  return (
    <>
      <div className={twMerge('relative w-full p-4', className)}>
        {children}
      </div>
      {loading && (
        <Loader />
      )}
    </>
  );
}

export default HomeContentWrapper;
