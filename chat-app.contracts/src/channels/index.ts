import Joi from 'joi';

export interface ISchedule {
  _id: string;
  id: string;
  name: string;
  start: Date;
  end?: Date;
  desc?: string;
}

export const createScheduleReqSchema = Joi.object({
  name: Joi.string().required(),
  start: Joi.date().required(),
  end: Joi.date().allow('').default(null),
  desc: Joi.string().allow('').default(null)
});

export const updateScheduleReqSchema = Joi.object({
  id: Joi.string().required(),
  _id: Joi.string(),
  name: Joi.string(),
  start: Joi.date(),
  end: Joi.date().allow('').default(null),
  desc: Joi.string().allow('').default(null)
});

export const schedulesSwagger = {
  createSchedule: {
    type: 'object',
    properties: {
      name: { type: 'string', required: true },
      start: { type: 'date', required: true },
      end: { type: 'date' },
      desc: { type: 'string' }
    }
  },
  updateSchedule: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      id: { type: 'string' },
      name: { type: 'string' },
      start: { type: 'date' },
      end: { type: 'date' },
      desc: { type: 'string' }
    }
  }
};
