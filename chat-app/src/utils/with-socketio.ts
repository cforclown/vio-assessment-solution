import { Server } from 'socket.io';
import { container } from '../di-config';
import { IO_INSTANCE_NAME } from '../socketio';

export abstract class WithSocketIO {
  protected io?: Server;

  protected getSio (): Server {
    if (!this.io) {
      this.io = container.resolve(IO_INSTANCE_NAME);
    }

    if (!this.io) {
      throw new Error('SocketIO instance not found');
    }

    return this.io;
  }
}
