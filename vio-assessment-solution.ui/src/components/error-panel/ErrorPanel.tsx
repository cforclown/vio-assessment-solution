interface ErrorPanelProps {
  message?: string;
  className?: string;
}

export function ErrorPanelBase({ message, className }: ErrorPanelProps): JSX.Element {
  return (
    <div className={className}>
      {message ?? 'UNEXPECTED ERROR OCCURED'}
    </div>
  );
}
