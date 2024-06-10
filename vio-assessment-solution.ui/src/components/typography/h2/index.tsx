import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ITypographyH1Props {
  className?: string;
}

export default function H2({ children, className } : PropsWithChildren<ITypographyH1Props>): JSX.Element {
  return (
    <h2 
      className={twMerge('scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl', className)}
    >
      {children}
    </h2>
  );
}
