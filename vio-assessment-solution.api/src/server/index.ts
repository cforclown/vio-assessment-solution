import { Express } from 'express';
import { Logger } from 'cexpress-utils/lib';
import Database from '../database';
import { container } from '../di-config';
import { Environment } from '../utils';

export default class Server {
  public static readonly INSTANCE_NAME: string = 'server';

  private readonly db: Database;
  private readonly app: Express;

  constructor () {
    this.db = container.resolve('database');
    this.app = container.resolve('app');
  }

  async start (): Promise<void> {
    try {
      Logger.success('============================================================================');
      Logger.success(`| ${Environment.getNodeEnv().toUpperCase()} MODE`);

      await this.connectToDB();
      Logger.success('| ✅ CONNECTED TO THE DATABASE');

      const port = Environment.getPort();
      await this.app.listen(port);
      Logger.success(`| ⚡ SERVER STARTED SUCCESSFULLY [${port}]`);
      Logger.success('============================================================================');
    } catch (err: any) {
      Logger.exception(err);
    }
  }

  async connectToDB (): Promise<void> {
    const { default: logUpdate } = await import('log-update');
    let loader;

    try {
      const frames = [
        '| Connecting to db',
        '| Connecting to db .',
        '| Connecting to db ..',
        '| Connecting to db ...',
        '| Connecting to db ....',
        '| Connecting to db .....'
      ];
      let index = 0;

      loader = setInterval(() => {
        const frame = frames[index = ++index % frames.length];
        logUpdate(frame);
      }, 100);

      await this.db.connect();

      clearInterval(loader);
      logUpdate.clear();
    } catch (err) {
      clearInterval(loader);
      logUpdate.clear();
      throw err;
    }
  }
}
