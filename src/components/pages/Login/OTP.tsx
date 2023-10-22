import React, { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppWrapper } from '@components/templates';
import OTPInput from '@components/atoms/OTPInput';
import { otpDigitsLength } from '@utils/constants/otp';
import API from '@api/index';
import axios from 'axios';
import { PersistentStorage } from '@utils/localStorage/localStorage';
import FormError from '@components/atoms/formError/FormError';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@redux/UserReducer';
import { useNavigate } from 'react-router-dom';
import { BackHeader } from '@components/molecules/backHeader/BackHeader.tsx';
import { RootState } from '@redux/index.ts';
import { setLoader } from '@redux/LoaderReducer.ts';

export const Otp: React.FC = (): ReactNode => {
  const { t } = useTranslation();
  const userPhone = PersistentStorage.getItem('userPhone');
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const loaderState = useSelector((state: RootState) => state.loader.loading);
  const onChange = async (value: string) => {
    setOtp(value);
    if (value.trim().length === otpDigitsLength) {
      dispatch(setLoader({ loading: true }));

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
        PersistentStorage.setItem('jwtToken', accessToken);
        if (isRegistration) {
          PersistentStorage.setItem('registrationState', false);
        }
        PersistentStorage.setItem('userPhone', undefined);
        dispatch(setLoader({ loading: false }));

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
        dispatch(setLoader({ loading: false }));
      }
    }
  };

  return (
    <AppWrapper>
      <div className="flex justify-center flex-col">
        <BackHeader title={t('enter')} />
        <FormError error={serverError} />
        <OTPInput
          disabled={loaderState}
          isError={!!serverError.length}
          onChange={onChange}
          value={otp}
          valueLength={otpDigitsLength}
        />
      </div>
    </AppWrapper>
  );
};
