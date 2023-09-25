import React, { useState } from 'react';
import axios from 'axios';
import { AppWrapper } from '@components/templates';
import { Form, FormFields } from '@components/molecules';
import { Button, Input } from '@components/atoms';
import { SingleError } from '@components/pages/login/phone/interface/PhoneInterface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/index';
import { useTranslation } from 'react-i18next';
import { RegistrationSchema } from '@validations/user/register/registration.schema';
import { setLoader } from '@redux/LoaderReducer';
import API from '@api/index';
import { PersistentStorage } from '@utils/localStorage/localStorage';
import { useNavigate } from 'react-router-dom';
import { BackHeader } from '@components/molecules/backHeader/BackHeader.tsx';

export const Registration = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Array<SingleError>>([]);
  const loaderState = useSelector((state: RootState) => state.loader.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = async (formFields: FormFields) => {
    const { phone: userPhone } = formFields;
    dispatch(setLoader({ loading: true }));

    // TODO: Handle form submission

    // try {
    //   await API.get(`/account/${userPhone}`);
    //   PersistentStorage.setItem('userPhone', userPhone);
    //   dispatch(setLoader({ loading: false }));
    //   navigate('/otp');
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     const serverErrors = error?.response?.data.message;
    //     if (serverErrors) {
    //       if (Array.isArray(serverErrors)) {
    //         setErrors(serverErrors);
    //       } else {
    //         setErrors([
    //           {
    //             name: 'global',
    //             message: serverErrors,
    //           },
    //         ]);
    //       }
    //     }
    //   } else {
    //     console.error(error);
    //   }
    //   dispatch(setLoader({ loading: false }));
    // }
    dispatch(setLoader({ loading: false }));
  };

  return (
    <AppWrapper>
      <div className="flex justify-center flex-col">
        <BackHeader title={t('registration')} />
        <Form classes="pt-4" onSubmit={handleFormSubmit} serverErrors={errors} validationSchema={RegistrationSchema}>
          <Input
            wrapperClasses="mt-4"
            classes={['text-center']}
            disabled={loaderState}
            label={t('fullName')}
            name="fullName"
            placeholder={t('enterFullName')}
          />
          <Input
            wrapperClasses="mt-3"
            classes={['text-center']}
            dir="ltr"
            disabled={loaderState}
            label={t('phoneNumber')}
            name="phone"
            placeholder={t('enterPhone')}
          />
          <Input
            wrapperClasses="mt-3"
            classes={['text-center']}
            dir="ltr"
            disabled={loaderState}
            label={t('email')}
            name="email"
            placeholder={t('enterEmail')}
          />
          <Button classes={['mt-4', 'w-full']} disabled={loaderState} type="submit">
            {t('registration')}
          </Button>
        </Form>
      </div>
    </AppWrapper>
  );
};
