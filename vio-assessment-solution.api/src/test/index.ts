import { IExplorationReq } from 'cexpress-utils/lib';

export * from './mock-channels-data';
export * from './mock-db';
export * from './mock-mongoose-model';
export * from './mock-users-data';
export * from './test-utils';

export const mockExplorationPayload: IExplorationReq = {
  query: 'query',
  pagination: {
    page: 1,
    limit: 10,
    sort: {
      by: 'name',
      order: 1
    }
  }
};
