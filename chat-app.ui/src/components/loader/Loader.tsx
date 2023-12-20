import StyledSpinner from '../spinner/Spinner.style';

export interface ILoaderProps {
  withOverlay?: boolean;
  overlayColor?: string;
  className?: string
}

export function LoaderBase({ className }: ILoaderProps): JSX.Element {
  return (
    <div className={className}>
      <StyledSpinner size={22} />
    </div>
  );
}
