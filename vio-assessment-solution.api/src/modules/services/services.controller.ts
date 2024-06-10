import { BaseController } from 'cexpress-utils/lib';
import { IService } from 'vio-assessment-solution.contracts';
import { ServicesService } from '.';

export class ServicesController extends BaseController<IService> {
  public static readonly INSTANCE_NAME = 'channelsController';

  private readonly channelsService: ServicesService;

  constructor (servicesService: ServicesService) {
    super(servicesService);
    this.channelsService = servicesService;
  }
}
