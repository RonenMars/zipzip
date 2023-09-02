import React, { ReactNode, useState } from 'react';
import { Button, Input } from '@components/atoms';
import { Form, FormFields } from '@components/molecules';
import { useTranslation } from 'react-i18next';
import { ButtonDesignTypes } from '@components/atoms/button/ButtonEnums';
import API from '@api/index';
import { LoginPhoneSchema } from '@validations/user/login/phone.schema';
import LoginWrapper from '@components/templates/LoginWrapper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PersistentStorage } from '@utils/localStorage/localStorage';
import { singleError } from '@components/pages/login/phone/interface/PhoneInterface';

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

const Phone: React.FC = (): ReactNode => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Array<singleError>>([]);
  const handleFormSubmit = async (phoneNumber: FormFields) => {
    const { phone: userPhone } = phoneNumber;
    try {
      await API.get(`/account/${userPhone}`);
      PersistentStorage.setItem('userPhone', userPhone);
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
    }
  };

  return (
    <LoginWrapper>
      <div className="flex justify-center flex-col">
        <h1 className="text-center">{t('enter')}</h1>
        <Form classes="pt-4" validationSchema={LoginPhoneSchema} onSubmit={handleFormSubmit} serverErrors={errors}>
          <Input
            name="phone"
            placeholder={t('demoPhoneNumber')}
            label={t('phoneNumber')}
            classes={['text-center']}
            dir="ltr"
          />
          <Button type="submit" classes={['mt-4']}>
            {t('enter')}
          </Button>
        </Form>
        <div className="text-center">
          <h2 className="mt-4">{t('loginRegisterTitle')}</h2>
          <Button design={ButtonDesignTypes.Link}>{t('registerNow')}</Button>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default Phone;
