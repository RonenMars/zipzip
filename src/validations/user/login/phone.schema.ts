import * as Joi from 'joi';

export const LoginPhoneSchema = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .length(10)
    .required()
    .messages({
      'string.length': 'user.validation.phone.length',
      'string.pattern.base': 'user.validation.phone.pattern',
      'any.required': 'user.validation.phone.required',
      'string.empty': 'user.validation.phone.required',
    }),
});
