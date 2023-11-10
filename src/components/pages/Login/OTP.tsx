import React, { ReactNode, useEffect, useState } from 'react';
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
import { BackHeader } from '@components/molecules/backHeader/BackHeader';
import { RootState } from '@redux/index';
import { setLoader } from '@redux/LoaderReducer';

export const Otp: React.FC = (): ReactNode => {
  const { t } = useTranslation();
  const userPhone = PersistentStorage.getItem('userPhone');
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const loaderState = useSelector((state: RootState) => state.loader.loading);
  const isRegistration = PersistentStorage.getItem('registrationState');

  const localTimer = Number(PersistentStorage.getItem('otpLocalTimer'));
  const otpLocalTimer = localTimer > 0 ? localTimer : 5;
  const [timer, setTimer] = useState(otpLocalTimer);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
        }
        PersistentStorage.setItem('otpLocalTimer', prevTimer - 1);
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onChange = async (value: string) => {
    setOtp(value);
    if (value.trim().length === otpDigitsLength) {
      dispatch(setLoader({ loading: true }));

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
  const pageTitle = isRegistration ? t('registrationTitle') : t('enterTitle');
  const pageDescription = isRegistration ? t('registrationDescription') : '';

  const timerStr = timer > 0 && `00:${timer >= 10 ? timer : '0' + timer}`;

  return (
    <AppWrapper>
      <div className="flex justify-center flex-col">
        <BackHeader title={pageTitle} />
        <p className="text-center whitespace-pre-line">{pageDescription}</p>
        <FormError error={serverError} />
        <OTPInput
          disabled={loaderState}
          isError={!!serverError.length}
          onChange={onChange}
          value={otp}
          valueLength={otpDigitsLength}
        />
        <p className="text-center whitespace-pre-line">{timerStr}</p>
      </div>
    </AppWrapper>
  );
};
