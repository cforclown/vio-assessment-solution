import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ITypographyH1Props {
  className?: string;
}

export default function H1({ children, className } : PropsWithChildren<ITypographyH1Props>): JSX.Element {
  return (
    <h1 
      className={twMerge('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
    >
      {children}
    </h1>
  );
}
