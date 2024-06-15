import { twMerge } from 'tailwind-merge';
import H3 from '../typography/h3';

export interface IContentHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

function ContentHeader({
  title,
  subtitle,
  className,
  actions
}: IContentHeaderProps) {
  return (
    <div className={twMerge('w-full flex flex-row justify-between items-center border border-b-1 p-4', className)}>
      <div className="w-full flex flex-col justify-center items-start">
        <H3>{title}</H3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}

export default ContentHeader;