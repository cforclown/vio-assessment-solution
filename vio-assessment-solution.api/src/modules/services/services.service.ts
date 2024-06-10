import { BaseService } from 'cexpress-utils/lib';
import { IService } from 'vio-assessment-solution.contracts';
import { UsersService } from '..';
import { ServicesDao } from '.';

export class ServicesService extends BaseService<IService> {
  public static readonly INSTANCE_NAME = 'servicesService';

  constructor (private readonly servicesDao: ServicesDao, private readonly usersService: UsersService) {
    super(servicesDao);

    this.servicesDao = servicesDao;
    this.usersService = usersService;
  }
}
