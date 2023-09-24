import React, { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppWrapper } from '@components/templates';
import OTPInput from '@components/atoms/OTPInput';
import { OTP_LENGTH } from '@utils/constants/otp';
import API from '@api/index';
import axios from 'axios';
import { PersistentStorage } from '@utils/localStorage/localStorage';
import FormError from '@components/atoms/formError/FormError';
import { useDispatch } from 'react-redux';
import { setUser } from '@redux/UserReducer';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';

export const Otp: React.FC = (): ReactNode => {
  const { t } = useTranslation();
  const userPhone = PersistentStorage.getItem('userPhone');
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const onChange = async (value: string) => {
    setOtp(value);
    if (value.trim().length === OTP_LENGTH) {
      try {
        const response = await API.post('/auth/login', {
          phone: userPhone,
          validationCode: value,
        });

        const {
          data: { name, email, phone, access_token },
        } = response;

        dispatch(setUser({ name, email, phone, isLoggedIn: true }));

        PersistentStorage.setItem('userPhone', undefined);
        PersistentStorage.setItem('userJWT', access_token);

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
        <div className="flex justify-center items-center">
          <div className="flex-1 justify-self-start">
            <FontAwesomeIcon icon={faChevronRight} onClick={() => navigate(-1)} className="cursor-pointer" />
          </div>
          <h1 className="flex-1 text-center">{t('enter')}</h1>
          <div className="flex-1" />
        </div>
        <FormError error={serverError} />
        <OTPInput isError={!!serverError.length} onChange={onChange} value={otp} valueLength={OTP_LENGTH} />
      </div>
    </AppWrapper>
  );
};
