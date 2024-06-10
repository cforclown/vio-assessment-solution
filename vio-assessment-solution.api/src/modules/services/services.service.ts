import { BaseService } from 'cexpress-utils/lib';
import { IServiceDoc } from 'vio-assessment-solution.contracts';
import { UsersService } from '..';
import { ChannelsDao } from '.';

export class ServicesService extends BaseService<IServiceDoc> {
  public static readonly INSTANCE_NAME = 'servicesService';

  constructor (private readonly channelsDao: ChannelsDao, private readonly usersService: UsersService) {
    super(channelsDao);

    this.channelsDao = channelsDao;
    this.usersService = usersService;
  }
}
