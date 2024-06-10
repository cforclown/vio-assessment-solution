import { IAPIEndpoint } from '@/utils/call-api';
import { useFetchProtectedMainAPI } from './useFetchProtectedMainAPI';

export interface IUseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: any;
  refetch: () => void;
}

export function useAPI<T>(endpoint: IAPIEndpoint, body?: any): IUseApiResponse<T> {
  return useFetch<T>({
    fetchHandler: useFetchProtectedMainAPI,
    endpoint,
    body,
  });
}

export interface IUseFetchArgs {
  fetchHandler: any,
  endpoint: IAPIEndpoint;
  body?: any;
}

export function useFetch<T>({ fetchHandler, endpoint, body }: IUseFetchArgs): IUseApiResponse<T> {
  return fetchHandler(endpoint, body);
}
