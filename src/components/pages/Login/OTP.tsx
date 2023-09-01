import React, { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginWrapper from '@components/templates/LoginWrapper';
import OTPInput from '@components/atoms/OTPInput';
import { OTP_LENGTH } from '@utils/constants/otp';
import API from '@api/index';
import axios from 'axios';
import { PersistentStorage } from '@utils/localStorage/localStorage';
import FormError from '@components/atoms/formError/FormError';

const OTP: React.FC = (): ReactNode => {
  const { t } = useTranslation();
  const userPhone = PersistentStorage.getItem('userPhone');
  const [serverError, setServerError] = useState('');

  const [otp, setOtp] = useState('');
  const onChange = async (value: string) => {
    setOtp(value);
    if (value.trim().length === OTP_LENGTH) {
      try {
        const response = await API.post('/auth/login', {
          phone: userPhone,
          validationCode: value,
        });
        const { data } = response.data;
        console.log('data', data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            setServerError(t('generalServerError'));
          } else {
            const { data } = error.response!;
            setServerError(data.message);
          }
        }
      }
    }
  };

  return (
    <LoginWrapper>
      <div className="flex justify-center flex-col">
        <h1 className="text-center">{t('enter')}</h1>
        <FormError error={serverError} />
        <OTPInput value={otp} valueLength={OTP_LENGTH} onChange={onChange} isError={!!serverError.length} />
      </div>
    </LoginWrapper>
  );
};

export default OTP;
