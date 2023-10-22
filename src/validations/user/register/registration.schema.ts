import * as Joi from 'joi';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const RegistrationSchema = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .length(10)
    .required()
    .custom((value, helper) => {
      if (!isValidPhoneNumber(value, 'IL')) {
        return helper.message('user.validation.phone.isLocalValid' as unknown as Joi.LanguageMessages);
      }

      return true;
    })
    .messages({
      'string.length': 'user.validation.phone.length',
      'string.pattern.base': 'user.validation.phone.pattern',
      'any.required': 'user.validation.phone.required',
      'string.empty': 'user.validation.phone.required',
    }),
  name: Joi.string().min(2).max(16).required().messages({
    'string.min': 'user.registration.validation.name.min',
    'string.max': 'user.registration.validation.name.max',
    'any.required': 'user.registration.validation.name.required',
    'string.empty': 'user.registration.validation.name.required',
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    'string.email': 'user.registration.validation.email.format',
    'any.required': 'user.registration.validation.email.required',
    'string.empty': 'user.registration.validation.email.required',
  }),
});
