"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesSwagger = exports.updateServiceReqSchema = exports.createServiceReqSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createServiceReqSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    repoUrl: joi_1.default.string().uri().required(),
    desc: joi_1.default.string().optional()
});
exports.updateServiceReqSchema = joi_1.default.object({
    id: joi_1.default.string(),
    name: joi_1.default.string(),
    desc: joi_1.default.string()
});
exports.servicesSwagger = {
    createService: {
        type: 'object',
        properties: {
            name: { type: 'string', required: true },
            repoUrl: { type: 'string', items: 'string', required: true },
            desc: { type: 'date' }
        }
    },
    updateService: {
        type: 'object',
        properties: {
            id: { type: 'string', required: true },
            name: { type: 'string' },
            desc: { type: 'string' }
        }
    }
};
