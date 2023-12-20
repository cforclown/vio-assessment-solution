// Dont change the order of the imports
import { config, Logger } from 'cexpress-utils/lib';
import { setup } from './di-config';
import Server from './server';

try {
  config();
  setup();
  new Server().start();
} catch (err: any) {
  Logger.exception(err);
}
