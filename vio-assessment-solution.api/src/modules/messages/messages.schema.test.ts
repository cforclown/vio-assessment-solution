import { validateSchema, ValidationException } from 'cexpress-utils/lib';
import { editMsgPayloadSchema, sendMsgReqSchema, startConversationReqSchema } from '.';

describe('channels.schema', () => {
  describe('startConversationReqSchema', () => {
    it('should return value when schema is valid', () => {
      const result = validateSchema({
        schema: startConversationReqSchema,
        payload: {
          receiver: 'mock-user-id',
          text: 'yo wassap!'
        }
      });
      expect(result).toEqual({
        receiver: 'mock-user-id',
        text: 'yo wassap!'
      });
    });

    it('should throw validation exception when required field not provided', () => {
      expect(() => validateSchema({
        schema: startConversationReqSchema,
        payload: { text: 'text' }
      })).toThrow(ValidationException);
    });
  });

  describe('sendMsgReqSchema', () => {
    it('should return value when schema is valid', () => {
      const result = validateSchema({
        schema: sendMsgReqSchema,
        payload: { text: 'yo wassap!' }
      });
      expect(result).toEqual({ text: 'yo wassap!' });
    });

    it('should throw validation exception when required field not provided', () => {
      expect(() => validateSchema({
        schema: sendMsgReqSchema,
        payload: {}
      })).toThrow(ValidationException);
    });
  });

  describe('editMsgPayloadSchema', () => {
    it('should return value when schema is valid', () => {
      expect(validateSchema({
        schema: editMsgPayloadSchema,
        payload: { text: 'mock new text' }
      })).toEqual({ text: 'mock new text' });

      expect(validateSchema({
        schema: editMsgPayloadSchema,
        payload: { text: 'mock new text' }
      })).toEqual({ text: 'mock new text' });
    });

    it('should throw validation exception when payload is not object', () => {
      expect(() => validateSchema({ schema: editMsgPayloadSchema, payload: null })).toThrow(ValidationException);
    });
  });
});
