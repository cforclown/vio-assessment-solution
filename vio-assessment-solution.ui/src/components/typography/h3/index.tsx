import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ITypographyH1Props {
  className?: string;
}

export default function H3({ children, className } : PropsWithChildren<ITypographyH1Props>): JSX.Element {
  return (
    <h3 className={twMerge('scroll-m-20 text-2xl font-bold tracking-tight', className)}>
      {children}
    </h3>
  );
}
