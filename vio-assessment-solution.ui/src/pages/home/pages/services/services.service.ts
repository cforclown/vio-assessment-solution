import { ICreateServiceReq, IService, IUpdateServiceReq } from 'vio-assessment-solution.contracts';
import { callProtectedMainAPI, getAPIEndpoint } from '@/utils/call-api';

export const addService = (payload: ICreateServiceReq): Promise<IService> => callProtectedMainAPI(
  getAPIEndpoint('/services', 'POST'),
  payload,
);

export const editService = (payload: IUpdateServiceReq): Promise<IService> => callProtectedMainAPI(
  getAPIEndpoint('/services', 'PUT'),
  payload,
);

export const startService = (serviceId: string): Promise<IService> => callProtectedMainAPI(
  getAPIEndpoint(`/services/${serviceId}/start`, 'PUT')
);

export const stopService = (serviceId: string): Promise<IService> => callProtectedMainAPI(
  getAPIEndpoint(`/services/${serviceId}/stop`, 'PUT')
);

export const deleteService = (serviceId: string): Promise<IService> => callProtectedMainAPI(
  getAPIEndpoint(`/services/${serviceId}`, 'DELETE')
);
