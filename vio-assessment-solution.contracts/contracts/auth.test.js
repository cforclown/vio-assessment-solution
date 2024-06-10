"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
describe('users-data-transfer-object', () => {
    const mockLoginReq = {
        username: 'mock-username',
        password: 'mock-password'
    };
    const mockRegisterReq = {
        username: 'mock-username',
        email: 'mock-email',
        fullname: 'mock-fullname',
        password: 'mock-password',
        confirmPassword: 'mock-password'
    };
    describe('registerReqSchema', () => {
        it('should return value when payload is valid', () => {
            const { value } = auth_1.registerReqSchema.validate(mockRegisterReq);
            expect(value).toEqual(mockRegisterReq);
        });
        it('should throw validation exception when some field is missing', () => {
            const { error } = auth_1.registerReqSchema.validate({
                ...mockRegisterReq,
                username: undefined
            });
            expect(error).toBeTruthy();
        });
        it('should throw validation exception when payload contain unallowed field', () => {
            const { error } = auth_1.registerReqSchema.validate({
                ...mockRegisterReq,
                invalidField: 'value'
            });
            expect(error).toBeTruthy();
        });
    });
    describe('loginReqSchema', () => {
        it('should return value when payload is valid', () => {
            const { value } = auth_1.loginReqSchema.validate(mockLoginReq);
            expect(value).toEqual(mockLoginReq);
        });
        it('should throw validation exception when payload is not valid', () => {
            const { error } = auth_1.loginReqSchema.validate({
                username: 'mock-username'
            });
            expect(error).toBeTruthy();
        });
    });
    describe('refreshTokenReqSchema', () => {
        it('should return value payload schema is valid', () => {
            const { value } = auth_1.refreshTokenReqSchema.validate({ refreshToken: 'mock-refresh-token' });
            expect(value).toEqual({ refreshToken: 'mock-refresh-token' });
        });
        it('should throw validation exception when payload is not valid', () => {
            const { error } = auth_1.refreshTokenReqSchema.validate({
                invlaidField: 'value'
            });
            expect(error).toBeTruthy();
        });
    });
});
