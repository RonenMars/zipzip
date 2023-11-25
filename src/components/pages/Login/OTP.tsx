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
import { Button } from '@components/atoms';
import { ButtonDesignTypes } from '@components/atoms/button/ButtonEnums.ts';

export const Otp: React.FC = (): ReactNode => {
  const { t } = useTranslation();
  const userPhone = PersistentStorage.getItem('userPhone');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const loaderState = useSelector((state: RootState) => state.loader.loading);
  const isRegistration = PersistentStorage.getItem('registrationState');

  const localTimer = Number(PersistentStorage.getItem('otpLocalTimer'));
  const otpLocalTimer = localTimer > 0 ? localTimer : 30;
  const [timer, setTimer] = useState(otpLocalTimer);
  const [otpResent, setOtpResent] = useState(false);

  let timerInterval: ReturnType<typeof setInterval>;

  const createTimerInterval = () => {
    return setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerInterval);
        }
        PersistentStorage.setItem('otpLocalTimer', prevTimer - 1);
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleError = (error: any): void => {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        setError(t('generalServerError'));
      } else {
        const { data } = error.response!;
        setError(data.message);
      }
    }
  };

  useEffect(() => {
    timerInterval = createTimerInterval();
    return () => clearInterval(timerInterval);
  }, []);

  const onChange = (value: string) => {
    setOtp(value);
    setError('');
  };

  const loginWithOTP = async () => {
    if (otp.trim().length === otpDigitsLength) {
      dispatch(setLoader({ loading: true }));

      const OTPVerificationURL = isRegistration ? '/account/register/validate' : '/auth/login';
      try {
        const response = await API.post(OTPVerificationURL, {
          phone: userPhone,
          validationCode: otp,
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
        PersistentStorage.setItem('otpLocalTimer', undefined);

        navigate('/app');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            setError(t('generalServerError'));
          } else {
            const { data } = error.response!;
            setError(data.message);
          }
        }
        setOtpResent(false);
        dispatch(setLoader({ loading: false }));
      }
    }
  };

  const pageTitle = isRegistration ? t('registrationTitle') : t('enterTitle');
  const pageDescription = isRegistration ? t('registrationDescription') : '';

  const resetTimer = () => {
    timerInterval = createTimerInterval();
    setTimer(30);
  };

  const resendOTP = async () => {
    try {
      await API.post('/account/otp/resend', {
        phone: userPhone,
      });
      resetTimer();
      setOtpResent(true);
      setError('');
    } catch (error) {
      handleError(error);
      dispatch(setLoader({ loading: false }));
      setOtpResent(false);
    }
  };

  return (
    <AppWrapper>
      <div className="flex justify-center flex-col">
        <BackHeader title={pageTitle} />
        <p className="text-center whitespace-pre-line">{pageDescription}</p>
        <FormError error={error} />
        <OTPInput
          disabled={loaderState}
          isError={!!error.length}
          onChange={onChange}
          value={otp}
          valueLength={otpDigitsLength}
        />
        <div className="mt-4">
          {otpResent && <div className="text-sm text-green-600">{t('codeResentSuccess')}</div>}
          <div className="text-sm">{t('didntReceivedTheCode')}</div>
          {timer > 0 ? (
            <div className="text-sm">
              {t('askToResendOTP')}
              <p className="text-center whitespace-pre-line inline">
                {' '}
                {`00:${timer >= 10 ? timer : '0' + timer} ${t('seconds')}`}
              </p>
            </div>
          ) : (
            <Button design={ButtonDesignTypes.link} onClick={resendOTP}>
              {t('resendOTP')}
            </Button>
          )}
        </div>

        <Button onClick={loginWithOTP} classes={['mt-4']}>
          {t('enterTitle')}
        </Button>
      </div>
    </AppWrapper>
  );
};
