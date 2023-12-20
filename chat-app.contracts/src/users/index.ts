import Joi from 'joi';

export interface IUser {
  _id: string;
  id: string;
  username: string;
  email: string;
  fullname: string;
}

export const updateUserReqSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  fullname: Joi.string()
});

export const changePasswordReqSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,24}$/).required(),
  confirmNewPassword: Joi
    .string()
    .equal(Joi.ref('newPassword'))
    .required()
    .label('Confirm password')
    .options({ messages: { 'any.only': '{{#label}} does not match' } })
});

export const usersSwagger = {
  updateUser: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        default: null
      },
      email: {
        type: 'string',
        default: null
      },
      fullname: {
        type: 'string',
        default: null
      }
    }
  },
  changePassword: {
    type: 'object',
    properties: {
      currentPassword: { type: 'string', required: true },
      newPassword: { type: 'string', required: true },
      confirmNewPassword: { type: 'string', required: true }
    }
  }
};
