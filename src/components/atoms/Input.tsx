import React, { useContext, useEffect } from 'react';
import { FormContext } from '@components/molecules';
import clsx from 'clsx';
import { FormValidationError } from '@components/molecules/form/Form';
import { useTranslation } from 'react-i18next';

interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  label: string;
  classes?: Array<string>;
}
const Input: React.FC<InputProps> = ({ name, placeholder, onChange, label, classes, ...props }: InputProps) => {
  const formErrors = useContext(FormContext);
  const currentFormErrors = formErrors as FormValidationError;
  const inputError = currentFormErrors[name as keyof FormValidationError];
  const [errorTextClass, setErrorTextClass] = React.useState('');
  const { t } = useTranslation();

  const baseClass = [
    'w-full h-12 border border-purple rounded-full placeholder:text-center placeholder:text-base mt-4',
  ];
  const ErrorClass = 'border-red text-red';
  const ErrorTextClass = 'text-red text-sm mt-1 text-center';

  const [inputClass, setInputClass] = React.useState(clsx(baseClass, classes));

  useEffect(() => {
    const currentErrors = formErrors as FormValidationError;
    const isError = Object.keys(formErrors).filter((key: string) => {
      const isFieldError = key === name && currentErrors[key as keyof FormValidationError];

      if (isFieldError) {
        setInputClass(clsx(baseClass, classes, ErrorClass));
        setErrorTextClass(ErrorTextClass);
      }
      return isFieldError;
    });

    if (!isError.length) {
      setInputClass(clsx(baseClass, classes));
      setErrorTextClass('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFormErrors[name as keyof FormValidationError]]);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input name={name} onChange={onChange} placeholder={placeholder} {...props} className={inputClass} />
      {inputError && <div className={errorTextClass}>{t(inputError)}</div>}
    </div>
  );
};

export default Input;
