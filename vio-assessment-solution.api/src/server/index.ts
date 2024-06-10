import { Express } from 'express';
import { Logger } from 'cexpress-utils/lib';
import Database from '../database';
import { container } from '../di-config';
import { Environment } from '../utils';
import SIOController from '../socketio/sio.controller';
import { IAMQP } from '../amqp';

export default class Server {
  public static readonly INSTANCE_NAME: string = 'server';

  private readonly db: Database;
  private readonly app: Express;
  private readonly sioController: SIOController;
  private readonly amqp: IAMQP;

  constructor () {
    this.db = container.resolve('database');
    this.app = container.resolve('app');
    this.sioController = container.resolve(SIOController.INSTANCE_NAME);
    this.amqp = container.resolve<IAMQP>('amqp');
  }

  async start (): Promise<void> {
    try {
      Logger.success('============================================================================');
      Logger.success(`| ${Environment.getNodeEnv().toUpperCase()} MODE`);
      await this.db.connect();
      Logger.success('| ✅ SUCCESSFULLY CONNECTED TO THE DATABASE');

      await this.amqp.init().catch(() => Logger.warn('| [warn] Cannot connect to AMQP server'));
      Logger.success('| ✅ SUCCESSFULLY CONNECTED TO THE AMQP');

      const port = Environment.getPort();
      await this.app.listen(port);
      Logger.success(`| ⚡ SERVER STARTED SUCCESSFULLY [${port}]`);
      Logger.success('============================================================================');
    } catch (err: any) {
      Logger.exception(err);
    }
  }
}
