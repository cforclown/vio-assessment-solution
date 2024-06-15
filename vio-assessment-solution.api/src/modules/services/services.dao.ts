import { model } from 'mongoose';
import { BaseDataAccessObject } from 'cexpress-utils/lib';
import { IService, IUser, ServiceStatus } from 'vio-assessment-solution.contracts';

export class ServicesDao extends BaseDataAccessObject<IService> {
  public static readonly INSTANCE_NAME = 'servicesDao';
  public static readonly MODEL_NAME = 'services';

  constructor () {
    super(model<IService>(ServicesDao.MODEL_NAME));
  }

  async get (id: string): Promise<IService<IUser> | null> {
    return this.model.findById<IService<IUser>>(id).populate('createdBy');
  }

  async start (
    id: string,
    containerId?: string,
    url?: string
  ): Promise<string> {
    const service = await this.model.findById(id);
    if (!service) {
      throw new Error('Service not found');
    }

    service.status = 'running';
    service.containerId = containerId ?? service.containerId;
    service.url = url ?? service.url;
    await service.save();

    return service.id;
  }

  async stop (id: string): Promise<string> {
    const service = await this.model.findOneAndUpdate({ _id: id }, { status: 'stopped' }, { new: true });
    if (!service) {
      throw new Error('Service not found');
    }

    return service.id;
  }

  async setStatus (id: string, status: ServiceStatus): Promise<string | null> {
    const service = await this.model.findOneAndUpdate({ _id: id }, { status: status }, { new: true });
    if (!service) {
      return null;
    }

    return service.id;
  }
}
