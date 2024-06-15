import Docker from 'dockerode';
import { v4 as uuidv4 } from 'uuid';
import { BaseService, Logger } from 'cexpress-utils/lib';
import { ICreateServiceReq, IService } from 'vio-assessment-solution.contracts';
import { ServicesDao } from '.';

const NODE_IMAGE = 'alpine:3.20';

export class ServicesService extends BaseService<IService> {
  public static readonly INSTANCE_NAME = 'servicesService';
  private readonly docker: Docker

  constructor (
    private readonly servicesDao: ServicesDao
  ) {
    super(servicesDao);

    this.servicesDao = servicesDao;
    this.docker = new Docker();
  }

  async create (payload: ICreateServiceReq): Promise<IService> {
    const service = await this.servicesDao.create(payload);

    this.createServiceContainer(service);

    return service;
  }

  async start (id: string): Promise<string> {
    const service = await this.servicesDao.get(id);

    if (!service) {
      throw new Error('Service not found');
    }

    if (service.status === 'building' || service.status === 'running') {
      return id;
    }

    if (!service.containerId) {
      this.createServiceContainer(service);
      return id;
    }

    this.restartContainer(service, service.containerId);

    return this.servicesDao.start(id);
  }

  async stop (id: string): Promise<string> {
    return this.servicesDao.stop(id);
  }

  private async pullDockerImage (image: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.docker.pull(image, (err: any, stream: any) => {
        if (err) {
          return reject(err);
        }
        this.docker.modem.followProgress(stream, (err, output) => {
          if (err) {
            return reject(err);
          }
          resolve(output as any);
        }, () => {
          Logger.info('Pulling image ...');
        });
      });
    });
  }

  private async createServiceContainer (service: IService): Promise<void> {
    try {
      await this.servicesDao.setStatus(service.id, 'building');

      const containerName = `service_${uuidv4()}`;
      const port = Math.floor(10000 + Math.random() * 1000);

      await this.pullDockerImage(NODE_IMAGE);
      const container = await this.docker.createContainer({
        Image: NODE_IMAGE,
        name: containerName,
        ExposedPorts: { '3000/tcp': {} },
        HostConfig: {
          PortBindings: { '3000/tcp': [{ HostPort: port.toString() }] }
        },
        Env: [`REPO_URL=${service.repoUrl}`],
        Cmd: [
          '/bin/sh',
          '-c',
          'git clone $REPO_URL app && cd app && npm install && cp .\\env-example .\\env && npm start'
        ]
      });

      await container.start();

      await this.servicesDao.start(
        service.id,
        container.id,
        `http://localhost:${port}`
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      await this.servicesDao.setStatus(service.id, 'error');
    }
  }

  private async restartContainer (service: IService, containerId: string): Promise<void> {
    try {
      await this.servicesDao.setStatus(service.id, 'building');

      const container = await this.docker.getContainer(containerId);
      await container.restart();

      await this.servicesDao.start(service.id);
    } catch (err) {
      await this.servicesDao.setStatus(service.id, 'error');
    }
  }

  private async removeServiceContainer (containerId: string): Promise<void> {
    const container = this.docker.getContainer(containerId);
    await container.stop();
    await container.remove();
  }
}
