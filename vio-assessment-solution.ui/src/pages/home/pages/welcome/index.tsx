import withCommonState, { IWithCommonStateProps } from '@/components/HOC/withCommonState';
import H1 from '@/components/typography/h1';
import { Button } from '@/components/ui/button';

interface IWelcomePage extends IWithCommonStateProps {}

function WelcomePage({ navigate, t }: IWelcomePage) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <H1>Welcome to Chat App</H1>
      <Button onClick={() => navigate('/find-users')}>{t('common.startChattingWithSomeone')}</Button>
    </div>
  );
}

export default withCommonState(WelcomePage);
