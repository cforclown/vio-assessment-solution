import { asClass, asFunction, createContainer, InjectionMode } from 'awilix';
import {
  AUTH_ROUTER_INSTANCE_NAME,
  AuthController,
  AuthRouter,
  AuthService,
  SERVICES_ROUTER_INSTANCE_NAME,
  ServicesController,
  ServicesDao,
  servicesRouter,
  ServicesService,
  USERS_ROUTER_INSTANCE_NAME,
  UsersController,
  UsersDao,
  UsersRouter,
  UsersService
} from './modules';
import App from './app';
import Database from './database';
import { MainRouter } from './app/routers';
import { ApiRouter } from './app/routers/api';

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

export function setup (): void {
  container.register({
    app: asFunction(App).singleton(),
    mainRouter: asFunction(MainRouter),
    apiRouter: asFunction(ApiRouter),
    [Database.INSTANCE_NAME]: asClass(Database),
    [AUTH_ROUTER_INSTANCE_NAME]: asFunction(AuthRouter),
    [AuthController.INSTANCE_NAME]: asClass(AuthController),
    [AuthService.INSTANCE_NAME]: asClass(AuthService),
    [USERS_ROUTER_INSTANCE_NAME]: asFunction(UsersRouter),
    [UsersController.INSTANCE_NAME]: asClass(UsersController),
    usersService: asClass(UsersService),
    usersDao: asClass(UsersDao),
    [SERVICES_ROUTER_INSTANCE_NAME]: asFunction(servicesRouter),
    servicesController: asClass(ServicesController),
    servicesService: asClass(ServicesService),
    servicesDao: asClass(ServicesDao)
  });
}
