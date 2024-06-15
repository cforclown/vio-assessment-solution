import { Request } from 'express';
import { BaseController } from 'cexpress-utils/lib';
import { IService, IUser } from 'vio-assessment-solution.contracts';
import { ServicesService } from '.';

export class ServicesController extends BaseController<IService> {
  public static readonly INSTANCE_NAME = 'servicesController';

  private readonly servicesService: ServicesService;

  constructor (servicesService: ServicesService) {
    super(servicesService);
    this.servicesService = servicesService;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  async create ({ user, body }: Request): Promise<IService> {
    const payload = {
      ...body,
      createdBy: (user as IUser).id
    };

    return this.servicesService.create(payload);
  }

  async start ({ params }: Request<{ id: string }>): Promise<string> {
    return this.servicesService.start(params.id);
  }

  async stop ({ params }: Request<{ id: string }>): Promise<string> {
    return this.servicesService.stop(params.id);
  }
}
