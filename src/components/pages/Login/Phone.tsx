import React, { ReactNode } from 'react';
import { Button, Input } from '@components/atoms';
import { Form, FormFields } from '@components/molecules';
import { useTranslation } from 'react-i18next';
import buttonDesignTypes from '@components/atoms/Button/ButtonEnums';
import API from '@api/index';
import { LoginPhoneSchema } from '@validations/user/login/phone.schema';
import LoginWrapper from '@components/templates/LoginWrapper.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const Login: React.FC = (): ReactNode => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleFormSubmit = async (phoneNumber: FormFields) => {
    const { phone: userPhone } = phoneNumber;
    try {
      const response = await API.get(`/account/${userPhone}`);
      const { userId } = response.data;
      if (userId || userId === 0) {
        navigate('/otp');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        // Do something with this error...
      } else {
        console.error(error);
      }
    }
  };

  return (
    <LoginWrapper>
      <div className="flex justify-center flex-col">
        <h1 className="text-center">{t('enter')}</h1>
        <Form classes="pt-4" validationSchema={LoginPhoneSchema} onSubmit={handleFormSubmit}>
          <Input name="phone" placeholder={t('demoPhoneNumber')} label={t('phoneNumber')} classes={['text-center']} />{' '}
          <Button type="submit" classes={['mt-4']}>
            {t('enter')}
          </Button>
        </Form>
        <div className="text-center">
          <h2 className="mt-4">{t('loginRegisterTitle')}</h2>
          <Button design={buttonDesignTypes.Link}>{t('registerNow')}</Button>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default Login;
