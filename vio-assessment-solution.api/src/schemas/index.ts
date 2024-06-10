import Joi from 'joi';

export const idSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'id not found'
  })
});
