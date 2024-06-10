import { ILoginReq, IRegisterUserReq, loginReqSchema, refreshTokenReqSchema, registerReqSchema } from './auth';

describe('users-data-transfer-object', () => {
  const mockLoginReq: ILoginReq = {
    username: 'mock-username',
    password: 'mock-password'
  };

  const mockRegisterReq: IRegisterUserReq = {
    username: 'mock-username',
    email: 'mock-email',
    fullname: 'mock-fullname',
    password: 'mock-password',
    confirmPassword: 'mock-password'
  };

  describe('registerReqSchema', () => {
    it('should return value when payload is valid', () => {
      const { value } = registerReqSchema.validate(mockRegisterReq);
      expect(value).toEqual(mockRegisterReq);
    });

    it('should throw validation exception when some field is missing', () => {
      const { error } = registerReqSchema.validate({
        ...mockRegisterReq,
        username: undefined
      });
      expect(error).toBeTruthy();
    });

    it('should throw validation exception when payload contain unallowed field', () => {
      const { error } = registerReqSchema.validate({
        ...mockRegisterReq,
        invalidField: 'value'
      });
      expect(error).toBeTruthy();
    });
  });

  describe('loginReqSchema', () => {
    it('should return value when payload is valid', () => {
      const { value } = loginReqSchema.validate(mockLoginReq);
      expect(value).toEqual(mockLoginReq);
    });

    it('should throw validation exception when payload is not valid', () => {
      const { error } = loginReqSchema.validate({
        username: 'mock-username'
      });
      expect(error).toBeTruthy();
    });
  });

  describe('refreshTokenReqSchema', () => {
    it('should return value payload schema is valid', () => {
      const { value } = refreshTokenReqSchema.validate({ refreshToken: 'mock-refresh-token' });
      expect(value).toEqual({ refreshToken: 'mock-refresh-token' });
    });

    it('should throw validation exception when payload is not valid', () => {
      const { error } = refreshTokenReqSchema.validate({
        invlaidField: 'value'
      });
      expect(error).toBeTruthy();
    });
  });
});
