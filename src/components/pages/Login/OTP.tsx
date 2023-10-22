import React, { ReactNode, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppWrapper } from '@components/templates';
import OTPInput from '@components/atoms/OTPInput';
import { otpDigitsLength } from '@utils/constants/otp';
import API from '@api/index';
import axios from 'axios';
import { PersistentStorage } from '@utils/localStorage/localStorage';
import FormError from '@components/atoms/formError/FormError';
import { useDispatch } from 'react-redux';
import { setUser } from '@redux/UserReducer';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@routing/Protected/hooks/useAuth.tsx';
import { BackHeader } from '@components/molecules/backHeader/BackHeader.tsx';

export const Otp: React.FC = (): ReactNode => {
  const { t } = useTranslation();
  const userPhone = PersistentStorage.getItem('userPhone');
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const { setJwtToken } = useContext(AuthContext);

  const onChange = async (value: string) => {
    setOtp(value);
    if (value.trim().length === otpDigitsLength) {
      const isRegistration = PersistentStorage.getItem('registrationState');

      const OTPVerificationURL = isRegistration ? '/account/register/validate' : '/auth/login';
      try {
        const response = await API.post(OTPVerificationURL, {
          phone: userPhone,
          validationCode: value,
        });

        const {
          data: { name, email, phone, access_token: accessToken },
        } = response;

        dispatch(setUser({ name, email, phone, isLoggedIn: true }));
        setJwtToken(accessToken);
        if (isRegistration) {
          PersistentStorage.setItem('registrationState', false);
        }
        navigate('/app');
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
    <AppWrapper>
      <div className="flex justify-center flex-col">
        <BackHeader title={t('enter')} />
        <FormError error={serverError} />
        <OTPInput isError={!!serverError.length} onChange={onChange} value={otp} valueLength={otpDigitsLength} />
      </div>
    </AppWrapper>
  );
};
