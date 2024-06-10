import mongoose from 'mongoose';
import { Environment } from '../utils';
import {
  SERVICES_COLLECTION_NAME,
  servicesModelSchema,
  USERS_COLLECTION_NAME,
  usersSchema
} from '../modules';

mongoose.Schema.ObjectId.get(v => v != null ? v.toString() : v);

class Database {
  public static readonly INSTANCE_NAME = 'database';

  constructor () {
    this.connect = this.connect.bind(this);
    this.registerModels();
  }

  async connect (): Promise<void> {
    await mongoose.connect(Environment.getDBConnectionString(), {
      dbName: Environment.getDbName()
    });
  }

  close (): void {
    mongoose.disconnect();
  }

  registerModels (): void {
    mongoose.model(USERS_COLLECTION_NAME, usersSchema);
    mongoose.model(SERVICES_COLLECTION_NAME, servicesModelSchema);
  }
}

export default Database;
