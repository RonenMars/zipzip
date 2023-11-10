import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Input } from '@components/atoms';
import { Form, FormFields } from '@components/molecules';
import { useTranslation } from 'react-i18next';
import { ButtonDesignTypes } from '@components/atoms/button/ButtonEnums';
import API from '@api/index';
import { LoginPhoneSchema } from '@validations/user/login/phone.schema';
import { AppWrapper } from '@components/templates';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PersistentStorage } from '@utils/localStorage/localStorage';
import { SingleError } from '@components/pages/Login/phone/interface/PhoneInterface';
import { setLoader } from '@redux/LoaderReducer.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/index.ts';

/**
 * A React component representing a login form.
 *
 * @component
 * @returns {JSX.Element} The rendered login form component.
 *
 * @example
 * import React from 'react';
 * import Login from './LoginComponent';
 *
 * const LoginPage = () => {
 *   return (
 *     <div>
 *       <Login />
 *     </div>
 *   );
 * };
 *
 * export default LoginPage;
 */

export const Phone: React.FC = (): ReactNode => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Array<SingleError>>([]);
  const dispatch = useDispatch();
  const loaderState = useSelector((state: RootState) => state.loader.loading);

  useEffect(() => {
    PersistentStorage.setItem('registrationState', false);
    dispatch(setLoader({ loading: false }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleFormSubmit = async (phoneNumber: FormFields) => {
    const { phone: userPhone } = phoneNumber;
    dispatch(setLoader({ loading: true }));

    try {
      await API.get(`/account/${userPhone}`);
      PersistentStorage.setItem('userPhone', userPhone);
      dispatch(setLoader({ loading: false }));
      navigate('/otp');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverErrors = error?.response?.data.message;
        if (serverErrors) {
          if (Array.isArray(serverErrors)) {
            setErrors(serverErrors);
          } else {
            setErrors([
              {
                name: 'global',
                message: serverErrors,
              },
            ]);
          }
        }
      } else {
        console.error(error);
      }
      dispatch(setLoader({ loading: false }));
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <AppWrapper>
      <div className="flex justify-center flex-col">
        <h1 className="text-center">{t('enterTitle')}</h1>
        <Form classes="pt-4" onSubmit={handleFormSubmit} serverErrors={errors} validationSchema={LoginPhoneSchema}>
          <Input
            classes={['text-center', 'my-4']}
            dir="ltr"
            disabled={loaderState}
            label={t('phoneNumber')}
            name="phone"
            placeholder={t('demoPhoneNumber')}
          />
          <Button classes={['mt-4', 'w-full']} disabled={loaderState} type="submit">
            {t('enterTitle')}
          </Button>
        </Form>
        <div className="text-center">
          <h2 className="mt-4">{t('loginRegisterTitle')}</h2>
          <Button classes={['w-full', 'p-4']} design={ButtonDesignTypes.link} onClick={goToRegister}>
            {t('registerNow')}
          </Button>
        </div>
      </div>
    </AppWrapper>
  );
};
