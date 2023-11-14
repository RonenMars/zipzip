import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppWrapper } from '@components/templates';
import { Form, FormFields } from '@components/molecules';
import { Button, Input } from '@components/atoms';
import { SingleError } from '@components/pages/Login/phone/interface/PhoneInterface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/index';
import { useTranslation } from 'react-i18next';
import { RegistrationSchema } from '@validations/user/register/registration.schema';
import { setLoader } from '@redux/LoaderReducer';
import API from '@api/index';
import { PersistentStorage } from '@utils/localStorage/localStorage';
import { BackHeader } from '@components/molecules/backHeader/BackHeader.tsx';
import { useNavigate } from 'react-router-dom';

export const Registration = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Array<SingleError>>([]);
  const loaderState = useSelector((state: RootState) => state.loader.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    PersistentStorage.setItem('registrationState', true);
  }, []);

  const handleFormSubmit = async (formFields: FormFields) => {
    dispatch(setLoader({ loading: true }));
    try {
      await API.post('/account/register', formFields);
      const { phone: userPhone } = formFields;
      PersistentStorage.setItem('userPhone', userPhone);
      navigate('/otp');

      dispatch(setLoader({ loading: false }));
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
    dispatch(setLoader({ loading: false }));
  };

  return (
    <AppWrapper>
      <div className="flex justify-center flex-col">
        <BackHeader title={t('registrationTitle')} fallbackRoute={'/'} />
        <Form classes="pt-4" onSubmit={handleFormSubmit} serverErrors={errors} validationSchema={RegistrationSchema}>
          <Input
            classes={['text-center']}
            disabled={loaderState}
            label={t('fullName')}
            name="name"
            placeholder={t('enterFullName')}
            wrapperClasses="mt-4"
          />
          <Input
            classes={['text-center']}
            dir="ltr"
            disabled={loaderState}
            label={t('phoneNumber')}
            name="phone"
            placeholder={t('enterPhone')}
            wrapperClasses="mt-3"
          />
          <Input
            classes={['text-center']}
            dir="ltr"
            disabled={loaderState}
            label={t('email')}
            name="email"
            placeholder={t('enterEmail')}
            wrapperClasses="mt-3"
          />
          <Button classes={['mt-4', 'w-full']} disabled={loaderState} type="submit">
            {t('registrationTitle')}
          </Button>
        </Form>
      </div>
    </AppWrapper>
  );
};
