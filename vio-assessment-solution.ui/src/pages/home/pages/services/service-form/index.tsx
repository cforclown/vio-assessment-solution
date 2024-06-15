import Content from '@/components/content';
import ContentBody from '@/components/content/content-body';
import ContentHeader from '@/components/content/content-header';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EditForm from '@/components/create-edit-form/EditForm';
import { getAPIEndpoint } from '@/utils/call-api';
import { servicesFields } from '../services.metadata';
import { addService, editService } from '../services.service';
import { toast } from 'react-toastify';
import CreateForm from '@/components/create-edit-form/CreateForm';

function ServiceForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { serviceId } = useParams<{ serviceId: string }>();
  const isEditing = !!serviceId && serviceId !== 'add';
  
  const onSubmit = async (data: Record<string, any>) => {
    const payload = isEditing ? { id: serviceId, _id: serviceId, ...data } : data;
    await (isEditing ? editService : addService)(payload as any);

    toast.success(`Service ${data.name} ${isEditing ? 'updated' : 'created'} successfully!`);
    if (!isEditing) {
      navigate('/services');
    }
  };

  return (
    <Content>
      <ContentHeader
        title={isEditing ? t('services.editService') : t('services.addService')}
      />
      <ContentBody>
        {isEditing ? (
          <EditForm
            getInitialDataEndpoint={getAPIEndpoint(`/services/${serviceId}`)}
            fields={servicesFields}
            onSubmitData={onSubmit}
          />
        ) : (
          <CreateForm
            fields={servicesFields}
            onSubmitData={onSubmit}
          />
        )}
      </ContentBody>
    </Content>
  );
}

export default ServiceForm;
