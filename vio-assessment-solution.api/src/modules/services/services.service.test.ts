import { container, setup } from '../../di-config';
import { ServicesService } from '..';
import {
  mockCreateServicePayload,
  mockServiceData,
  mockUpdateServicePayload,
  mockUser
} from '../../test';

const mockServicesDaoGet = jest.fn();
const mockServicesDaoGetAll = jest.fn();
const mockServicesDaoCreate = jest.fn();
const mockServicesDaoUpdate = jest.fn();
const mockServicesDaoDelete = jest.fn();
jest.mock('./services.dao', () => ({
  ServicesDao: jest.fn().mockImplementation(() => ({
    get: (payload: any): void => mockServicesDaoGet(payload),
    getAll: (payload: any): void => mockServicesDaoGetAll(payload),
    create: (payload: any): void => mockServicesDaoCreate(payload),
    update: (payload: any): void => mockServicesDaoUpdate(payload),
    delete: (payload: any): void => mockServicesDaoDelete(payload)
  }))
}));

const mockUsersServiceGet = jest.fn();
jest.mock('../users/users.service', () => ({
  UsersService: jest.fn().mockImplementation(() => ({
    get: (payload: any): void => mockUsersServiceGet(payload)
  }))
}));

jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'),
  model: jest.fn().mockImplementation(() => ({}))
}));

describe('services-service', () => {
  mockUsersServiceGet.mockResolvedValue(mockUser);
  mockServicesDaoGet.mockResolvedValue(mockServiceData);
  mockServicesDaoGetAll.mockReturnValue(Promise.resolve([mockServiceData]));
  mockServicesDaoCreate.mockReturnValue(Promise.resolve(mockServiceData));
  mockServicesDaoUpdate.mockReturnValue(Promise.resolve(mockServiceData));
  mockServicesDaoDelete.mockImplementation((payload) => Promise.resolve(payload));

  let servicesService: ServicesService;

  beforeAll(() => {
    setup();
    servicesService = container.resolve(ServicesService.INSTANCE_NAME);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get getAll', () => {
    it('should successfully return services', async () => {
      expect(await servicesService.get(mockServiceData.id)).toEqual(mockServiceData);
      expect(await servicesService.getAll()).toEqual([mockServiceData]);
    });

    it('should return null when service not found', async () => {
      mockServicesDaoGet.mockReturnValueOnce(null);

      expect(await servicesService.get(mockServiceData.id)).toEqual(null);
    });
  });

  describe('create', () => {
    it('should successfully create a service', async () => {
      expect(await servicesService.create(mockCreateServicePayload)).toEqual(mockServiceData);
    });
  });

  describe('update', () => {
    it('should successfully update a service', async () => {
      expect(await servicesService.update(mockUpdateServicePayload)).toEqual(mockServiceData);
    });
  });
});
