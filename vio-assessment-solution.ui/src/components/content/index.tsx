import { twMerge } from 'tailwind-merge';
import { PropsWithChildren } from 'react';

export interface IContentProps {
  className?: string
}

function Content({
  children,
  className
}: PropsWithChildren<IContentProps>) {
  return (
    <div className={twMerge('w-full h-full flex flex-col justify-start items-start overflow-hidden', className)}>
      {children}
    </div>
  );
}

export default Content;