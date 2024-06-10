import { validateSchema, ValidationException } from 'cexpress-utils/lib';
import { ILoginReq, LoginReqSchema, RefreshTokenReqSchema } from '.';

describe('auth-data-transfer-object', () => {
  const loginPayload: ILoginReq = {
    username: 'username',
    password: 'password'
  };

  describe('LoginPayloadSchema', () => {
    it('should return value when schema is valid', () => {
      const result = validateSchema({ schema: LoginReqSchema, payload: loginPayload });
      expect(result).toEqual(loginPayload);
    });

    it('should throw validation exception when password not provided', () => {
      expect(() => validateSchema({
        schema: LoginReqSchema,
        payload: {
          username: 'username'
        }
      })).toThrow(ValidationException);
    });

    it('should throw validation exception when password not provided', () => {
      expect(() => validateSchema({
        schema: LoginReqSchema,
        payload: {
          password: 'password'
        }
      })).toThrow(ValidationException);
    });
  });

  describe('RefreshTokenPayloadSchema', () => {
    it('should return value when schema is valid', () => {
      const result = validateSchema({ schema: RefreshTokenReqSchema, payload: { refreshToken: 'refreshToken' } });
      expect(result).toEqual({ refreshToken: 'refreshToken' });
    });

    it('should throw validation exception when refreshToken not provided', () => {
      expect(() => validateSchema({ schema: RefreshTokenReqSchema, payload: {} })).toThrow(ValidationException);
    });
  });
});
