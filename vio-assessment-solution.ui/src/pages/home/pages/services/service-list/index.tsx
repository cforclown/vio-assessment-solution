import withCommonState, { IWithCommonStateProps } from '@/components/HOC/withCommonState';
import Content from '@/components/content';
import ContentBody from '@/components/content/content-body';
import ContentHeader from '@/components/content/content-header';
import { servicesFields } from '../services.metadata';
import DataTable from '@/components/data-table';
import { useAPI } from '@/hooks/useApi';
import { IService } from 'vio-assessment-solution.contracts';
import { getAPIEndpoint } from '@/utils/call-api';
import Loader from '@/components/loader/Loader.style';
import H3 from '@/components/typography/h3';
import { Button } from '@/components/ui/button';
import { IDataTableActionColumn } from '@/components/data-table/DataTable.service';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';
import { openAlertDialog } from '@/store/reducers/alert-dialog';
import { deleteService, startService, stopService } from '../services.service';
import { toast } from 'react-toastify';
import { useCallback, useEffect } from 'react';

interface IServiceListProps extends IWithCommonStateProps {}

function ServiceList({ navigate, t }: IServiceListProps) {
  const { data: services, loading, refetch } = useAPI<IService<string>[]>(getAPIEndpoint('/services'));

  const dispatch = useDispatch();
  const onDeleteClick = async (id: string) => dispatch(openAlertDialog({
    onConfirm: async (): Promise<void> => {
      await toast.promise(deleteService(id), {
        pending: t('services.deletingService'),
        error: t('services.failedToDeleteService'),
        success: t('services.serviceDeleted')
      });
      refetch(false);
    }
  }));

  const onStartService = useCallback(async (id: string) => {
    await toast.promise(startService(id), {
      pending: t('services.startingService'),
      error: t('services.failedToStartService'),
      success: t('services.serviceStarted')
    });
    refetch(false);
  }, []);

  const onStopService = useCallback(async (id: string) => {
    await toast.promise(stopService(id), {
      pending: t('services.stoppingService'),
      error: t('services.failedToStopService'),
      success: t('services.serviceStopped')
    });
    refetch(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => refetch(false), 5000);
    return () => clearInterval(interval);
  }, []);

  const actionColumn: IDataTableActionColumn = {
    id: 'actions',
    label: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      const service = services?.find(s => s.id === row.original.id);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => navigate(`/services/details/${row.original.id}`)}
              disabled={!service}
            >
              {t('common.viewDetails')}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onStartService(row.original.id)}
              disabled={service?.status === 'running'}
            >
              {t('common.start')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStopService(row.original.id)}
              disabled={service?.status !== 'running'}
            >
              {t('common.stop')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/services/form/${row.original.id}`)}>
              {t('common.edit')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDeleteClick(row.original.id)}>
              {t('common.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  };

  return (
    <Content>
      <ContentHeader
        title={t('services.services')}
        actions={(
          <Button onClick={() => navigate('/services/form/add')}>
            {t('services.addService')}
          </Button>
        )}
      />
      <ContentBody>
        {loading && <Loader />}
        {!loading && !services && (
          <H3>{t('common.noData')}</H3>
        )}
        {services && (
          <DataTable
            columns={servicesFields} 
            data={services} 
            actionColumn={actionColumn}
          />
        )}
      </ContentBody>
    </Content>
  );
}

export default withCommonState(ServiceList);
