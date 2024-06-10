import { asClass, asFunction, createContainer, InjectionMode } from 'awilix';
import {
  AUTH_ROUTER_INSTANCE_NAME,
  AuthController,
  AuthRouter,
  AuthService,
  CHANNELS_ROUTER_INSTANCE_NAME,
  ChannelsDao,
  ChannelsRouter,
  MESSAGES_ROUTER_INSTANCE_NAME,
  MessagesController,
  MessagesRouter,
  MessagesService,
  ServicesController,
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
import SIOController from './socketio/sio.controller';
import SIOService from './socketio/sio.service';
import { AMQP, IAMQP } from './amqp';

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

export function setup (): void {
  container.register({
    app: asFunction(App).singleton(),
    mainRouter: asFunction(MainRouter),
    apiRouter: asFunction(ApiRouter),
    [Database.INSTANCE_NAME]: asClass(Database),
    [SIOController.INSTANCE_NAME]: asClass(SIOController).singleton(),
    [SIOService.INSTANCE_NAME]: asClass(SIOService),
    amqp: asClass<IAMQP>(AMQP),
    [AUTH_ROUTER_INSTANCE_NAME]: asFunction(AuthRouter),
    [AuthController.INSTANCE_NAME]: asClass(AuthController),
    [AuthService.INSTANCE_NAME]: asClass(AuthService),
    [USERS_ROUTER_INSTANCE_NAME]: asFunction(UsersRouter),
    [UsersController.INSTANCE_NAME]: asClass(UsersController),
    usersService: asClass(UsersService),
    usersDao: asClass(UsersDao),
    [CHANNELS_ROUTER_INSTANCE_NAME]: asFunction(ChannelsRouter),
    [ServicesController.INSTANCE_NAME]: asClass(ServicesController),
    channelsService: asClass(ServicesService),
    channelsDao: asClass(ChannelsDao),
    [MESSAGES_ROUTER_INSTANCE_NAME]: asFunction(MessagesRouter),
    [MessagesController.INSTANCE_NAME]: asClass(MessagesController),
    [MessagesService.INSTANCE_NAME]: asClass(MessagesService)
  });
}
