import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IContentBodyProps {
  className?: string
}

function ContentBody({
  children,
  className
}: PropsWithChildren<IContentBodyProps>) {
  return (
    <div className={twMerge('w-full h-full flex flex-col justify-start items-start overflow-auto py-2 px-4', className)}>
      {children}
    </div>
  );
}

export default ContentBody;