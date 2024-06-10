import { TFunction } from 'i18next';
import { ComponentType, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export interface IWithCommonStateProps {
  t: TFunction<'translation', undefined>;
  loading: boolean;
  setLoading(loading: boolean): void;
  navigate: NavigateFunction;
}

function withCommonState<P extends IWithCommonStateProps>(
  Component: ComponentType<P>, 
  initialLoading?: boolean
) {
  return function WithCommonState(props: Omit<P, keyof IWithCommonStateProps>) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(initialLoading);
    const navigate = useNavigate();

    return (
      <Component 
        {...(props as P)} 
        t={t} 
        loading={loading}
        setLoading={setLoading}
        navigate={navigate}
      />
    );
  };
}

export default withCommonState;
