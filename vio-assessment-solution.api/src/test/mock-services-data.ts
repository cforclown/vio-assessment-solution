import { ICreateServiceReq, IService, IUpdateServiceReq } from 'vio-assessment-solution.contracts';
import { Types } from 'mongoose';
import { mockUser } from './mock-users-data';

const mockId = new Types.ObjectId();

export const mockServiceData: IService = {
  id: mockId.toString(),
  name: 'service name',
  repoUrl: 'https://test.com/repo-name',
  status: 'pending',
  containerId: 'mock container id',
  url: 'https://test.com/url',
  desc: 'mock service desc',
  createdBy: mockUser.id
};

export const mockCreateServicePayload: ICreateServiceReq = {
  name: 'service name',
  repoUrl: 'https://test.com/repo-name',
  desc: 'mock service desc'
};

export const mockUpdateServicePayload: IUpdateServiceReq = {
  id: 'mock service id',
  name: 'mock service name',
  desc: 'mock service desc'
};
