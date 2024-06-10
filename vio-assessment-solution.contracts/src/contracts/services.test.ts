import { createServiceReqSchema, ICreateServiceReq, IUpdateServiceReq, updateServiceReqSchema } from './services';

describe('services.schema', () => {
  const mockCreateGroupPayload: ICreateServiceReq = {
    name: 'service name',
    repoUrl: 'https://github.com/cforclown/vio-assessment-solution',
    desc: 'mock service desc'
  };
  const mockUpdateGroupPayload: IUpdateServiceReq = {
    id: 'mock-service-id',
    name: 'service name',
    desc: 'mock service desc'
  };

  describe('createServiceReqSchema', () => {
    it('should return value when schema is valid', () => {
      const { value } = createServiceReqSchema.validate(mockCreateGroupPayload);
      expect(value).toEqual(mockCreateGroupPayload);
    });

    it('should return value when only required fields provided', () => {
      const { value } = createServiceReqSchema.validate({
        name: 'service name',
        repoUrl: 'https://github.com/cforclown/vio-assessment-solution'
      });
      expect(value).toEqual({
        name: 'service name',
        repoUrl: 'https://github.com/cforclown/vio-assessment-solution'
      });
    });

    it('should throw validation exception when required field not provided', () => {
      const { error } = createServiceReqSchema.validate({
        ...mockCreateGroupPayload,
        name: undefined
      });
      expect(error).toBeTruthy();
    });
  });

  describe('updateServiceReqSchema', () => {
    it('should return value when schema is valid', () => {
      const { value } = updateServiceReqSchema.validate(mockUpdateGroupPayload);
      expect(value).toEqual(mockUpdateGroupPayload);
    });

    it('should return value when payload only contain some fields', () => {
      const { value } = updateServiceReqSchema.validate({ name: 'new name' });
      expect(value).toEqual({ name: 'new name' });
    });

    it('should throw validation exception when payload is not object', () => {
      const { error } = updateServiceReqSchema.validate(null);
      expect(error).toBeTruthy();
    });
  });
});
