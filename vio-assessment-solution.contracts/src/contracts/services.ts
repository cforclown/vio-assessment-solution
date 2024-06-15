import Joi from 'joi';
import { IUser } from './users';

export const serviceStatuses = ['building', 'running', 'stopped', 'pending', 'error'] as const;

export type ServiceStatus = typeof serviceStatuses[number];

export interface IService<CreatedBy = string | IUser> {
  id: string;
  name: string;
  repoUrl: string;
  status: ServiceStatus;
  containerId?: string;
  url?: string;
  desc?: string;
  createdBy: CreatedBy;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateServiceReq {
  name: string;
  repoUrl: string;
  desc?: string;
}

export const createServiceReqSchema = Joi.object<ICreateServiceReq>({
  name: Joi.string().required(),
  repoUrl: Joi.string().uri().required(),
  desc: Joi.string().optional().allow(null)
});

export interface IUpdateServiceReq extends Omit<ICreateServiceReq, 'repoUrl' | 'name'> {
  id: string;
  name?: string;
}

export const updateServiceReqSchema = Joi.object<IUpdateServiceReq>({
  id: Joi.string(),
  name: Joi.string(),
  desc: Joi.string().optional().allow(null)
});

export const servicesSwagger = {
  createService: {
    type: 'object',
    properties: {
      name: { type: 'string', required: true },
      repoUrl: { type: 'string', items: 'string', required: true },
      desc: { type: 'date' }
    }
  },
  updateService: {
    type: 'object',
    properties: {
      id: { type: 'string', required: true },
      name: { type: 'string' },
      desc: { type: 'string' }
    }
  }
};
