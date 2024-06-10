import { validateSchema, ValidationException } from 'cexpress-utils/lib';
import { createGroupReqSchema, updateGroupReqSchema } from '.';
import { mockCreateGroupPayload, mockUpdateGroupPayload } from '../../test';

describe('channels.schema', () => {
  describe('createGroupReqSchema', () => {
    it('should return value when schema is valid', () => {
      const result = validateSchema({
        schema: createGroupReqSchema,
        payload: mockCreateGroupPayload
      });
      expect(result).toEqual(mockCreateGroupPayload);
    });

    it('should throw validation exception when required field not provided', () => {
      expect(() => validateSchema({
        schema: createGroupReqSchema,
        payload: {
          ...mockCreateGroupPayload,
          name: undefined
        }
      })).toThrow(ValidationException);
    });
  });

  describe('updateGroupReqSchema', () => {
    it('should return value when schema is valid', () => {
      expect(validateSchema({
        schema: updateGroupReqSchema,
        payload: mockUpdateGroupPayload
      })).toEqual(mockUpdateGroupPayload);

      expect(validateSchema({
        schema: updateGroupReqSchema,
        payload: { name: 'new name' }
      })).toEqual({ name: 'new name' });
    });

    it('should throw validation exception when payload is not object', () => {
      expect(() => validateSchema({ schema: updateGroupReqSchema, payload: null })).toThrow(ValidationException);
    });
  });
});
