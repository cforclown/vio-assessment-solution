import { model } from 'mongoose';
import { BaseDataAccessObject } from 'cexpress-utils/lib';
import { IService } from 'vio-assessment-solution.contracts';

export class ServicesDao extends BaseDataAccessObject<IService> {
  public static readonly INSTANCE_NAME = 'servicesDao';
  public static readonly MODEL_NAME = 'services';

  constructor () {
    super(model<IService>(ServicesDao.MODEL_NAME));
  }
}
