import { IPaginationPayload, IPaginationResponse } from './pagination';

export interface IExplorationPayload {
  query?: string;
  pagination: IPaginationPayload;
}

export interface IExplorationResConfig extends IExplorationPayload {
  pagination: IPaginationResponse
}

export interface IExplorationRes<T> {
  data: T[],
  exploration: IExplorationResConfig
}
