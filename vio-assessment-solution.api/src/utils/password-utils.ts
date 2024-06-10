import { customAlphabet } from 'nanoid';

export const generateId = function (): string {
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 16)();
};
