import withCommonState, { IWithCommonStateProps } from '@/components/HOC/withCommonState';
import H1 from '@/components/typography/h1';
import H3 from '@/components/typography/h3';
import { Button } from '@/components/ui/button';

interface IWelcomePage extends IWithCommonStateProps {}

function WelcomePage({ navigate, t }: IWelcomePage) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <H1>Welcome!</H1>
      <H3>My name is Hafis Alrizal</H3>
      <p className="py-4">This app is solution for virtuals.io assessment.</p>
      <Button onClick={() => navigate('/services/form/add')}>{t('services.addService')}</Button>
    </div>
  );
}

export default withCommonState(WelcomePage);
