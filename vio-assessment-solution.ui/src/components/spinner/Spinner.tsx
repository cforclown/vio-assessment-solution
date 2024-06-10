import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { LoaderSizeMarginProps } from 'react-spinners/helpers/props';
import { selectThemeColors } from '@/store/reducers/layout/theme-selectors';

export interface ISpinner extends LoaderSizeMarginProps {
  className?: string
}

const Spinner = (props: ISpinner): JSX.Element => {
  const colors = useSelector(selectThemeColors());
  return <PulseLoader color={colors.primary} {...props} />;
};

export default Spinner;
