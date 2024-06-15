import withCommonState, { IWithCommonStateProps } from '@/components/HOC/withCommonState';
import Content from '@/components/content';
import ContentBody from '@/components/content/content-body';
import ContentHeader from '@/components/content/content-header';
import { useAPI } from '@/hooks/useApi';
import { IService, IUser } from 'vio-assessment-solution.contracts';
import { getAPIEndpoint } from '@/utils/call-api';
import Loader from '@/components/loader/Loader.style';
import H3 from '@/components/typography/h3';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import ServiceDetailsContainer from './service-details-container';

interface IServiceDetailProps extends IWithCommonStateProps {}

function ServiceDetails({ navigate, t }: IServiceDetailProps) {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { data, loading } = useAPI<IService<IUser>>(getAPIEndpoint(`/services/${serviceId}`));

  return (
    <Content>
      <ContentHeader
        title={t('services.services')}
        actions={(
          <Button onClick={() => navigate(`'/services/form/${serviceId}`)}>
            {t('services.editService')}
          </Button>
        )}
      />
      <ContentBody>
        {loading && <Loader />}
        {!loading && !data && (
          <H3>{t('common.noData')}</H3>
        )}
        {data && (
          <ServiceDetailsContainer
            {...data}
          />
        )}
      </ContentBody>
    </Content>
  );
}

export default withCommonState(ServiceDetails);
