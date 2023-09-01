import { OTP_LENGTH } from '@utils/constants/otp';
import * as Joi from 'joi';

const buildSchema = () => {
  const otpSchema: { [key: number]: object } = {};
  for (let i = 0; i < OTP_LENGTH; i++) {
    otpSchema[i] = Joi.string();
  }
  return otpSchema;
};

export const OTPInputSchema = Joi.object().keys(buildSchema()).unknown(true);
