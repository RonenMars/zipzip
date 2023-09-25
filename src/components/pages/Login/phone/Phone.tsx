import React, { ReactNode, useState } from 'react';
import { Button, Input } from '@components/atoms';
import { Form, FormFields } from '@components/molecules';
import { useTranslation } from 'react-i18next';
import { ButtonDesignTypes } from '@components/atoms/button/ButtonEnums.ts';
import API from '@api/index';
import { LoginPhoneSchema } from '@validations/user/login/phone.schema';
import { AppWrapper } from '@components/templates';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PersistentStorage } from '@utils/localStorage/localStorage';
import { SingleError } from '@components/pages/login/phone/interface/PhoneInterface.ts';
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

  return (
    <AppWrapper>
      <div className="flex justify-center flex-col">
        <h1 className="text-center">{t('enter')}</h1>
        <Form classes="pt-4" onSubmit={handleFormSubmit} serverErrors={errors} validationSchema={LoginPhoneSchema}>
          <Input
            classes={['text-center']}
            dir="ltr"
            disabled={loaderState}
            label={t('phoneNumber')}
            name="phone"
            placeholder={t('demoPhoneNumber')}
          />
          <Button classes={['mt-4', 'w-full']} disabled={loaderState} type="submit">
            {t('enter')}
          </Button>
        </Form>
        <div className="text-center">
          <h2 className="mt-4">{t('loginRegisterTitle')}</h2>
          <Button classes={['w-full']} design={ButtonDesignTypes.link}>
            {t('registerNow')}
          </Button>
        </div>
      </div>
    </AppWrapper>
  );
};
