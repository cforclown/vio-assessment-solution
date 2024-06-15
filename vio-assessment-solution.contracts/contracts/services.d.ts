import Joi from 'joi';
import { IUser } from './users';
export declare const serviceStatuses: readonly ["building", "running", "stopped", "pending", "error"];
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
export declare const createServiceReqSchema: Joi.ObjectSchema<ICreateServiceReq>;
export interface IUpdateServiceReq extends Omit<ICreateServiceReq, 'repoUrl' | 'name'> {
    id: string;
    name?: string;
}
export declare const updateServiceReqSchema: Joi.ObjectSchema<IUpdateServiceReq>;
export declare const servicesSwagger: {
    createService: {
        type: string;
        properties: {
            name: {
                type: string;
                required: boolean;
            };
            repoUrl: {
                type: string;
                items: string;
                required: boolean;
            };
            desc: {
                type: string;
            };
        };
    };
    updateService: {
        type: string;
        properties: {
            id: {
                type: string;
                required: boolean;
            };
            name: {
                type: string;
            };
            desc: {
                type: string;
            };
        };
    };
};
