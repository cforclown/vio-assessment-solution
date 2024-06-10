"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("./services");
describe('services.schema', () => {
    const mockCreateGroupPayload = {
        name: 'service name',
        repoUrl: 'https://github.com/cforclown/vio-assessment-solution',
        desc: 'mock service desc'
    };
    const mockUpdateGroupPayload = {
        id: 'mock-service-id',
        name: 'service name',
        desc: 'mock service desc'
    };
    describe('createServiceReqSchema', () => {
        it('should return value when schema is valid', () => {
            const { value } = services_1.createServiceReqSchema.validate(mockCreateGroupPayload);
            expect(value).toEqual(mockCreateGroupPayload);
        });
        it('should return value when only required fields provided', () => {
            const { value } = services_1.createServiceReqSchema.validate({
                name: 'service name',
                repoUrl: 'https://github.com/cforclown/vio-assessment-solution'
            });
            expect(value).toEqual({
                name: 'service name',
                repoUrl: 'https://github.com/cforclown/vio-assessment-solution'
            });
        });
        it('should throw validation exception when required field not provided', () => {
            const { error } = services_1.createServiceReqSchema.validate({
                ...mockCreateGroupPayload,
                name: undefined
            });
            expect(error).toBeTruthy();
        });
    });
    describe('updateServiceReqSchema', () => {
        it('should return value when schema is valid', () => {
            const { value } = services_1.updateServiceReqSchema.validate(mockUpdateGroupPayload);
            expect(value).toEqual(mockUpdateGroupPayload);
        });
        it('should return value when payload only contain some fields', () => {
            const { value } = services_1.updateServiceReqSchema.validate({ name: 'new name' });
            expect(value).toEqual({ name: 'new name' });
        });
        it('should throw validation exception when payload is not object', () => {
            const { error } = services_1.updateServiceReqSchema.validate(null);
            expect(error).toBeTruthy();
        });
    });
});
