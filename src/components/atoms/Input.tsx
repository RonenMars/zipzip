import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '@components/molecules';
import clsx from 'clsx';
import { FormValidationError } from '@components/molecules/Form';

interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  label: string;
  classes?: Array<string>;
}
const Input: React.FC<InputProps> = ({ name, placeholder, onChange, label, classes, ...props }: InputProps) => {
  const formErrors = useContext(ThemeContext);

  const baseClass = [
    'w-full h-12 border border-purple rounded-full placeholder:text-center placeholder:text-base mt-4',
  ];
  const [inputClass, setInputClass] = React.useState(clsx(baseClass, classes));
  const ErrorClass = 'border-red text-red';
  const ErrorTextClass = 'text-red text-sm mt-2 text-center';

  useEffect(() => {
    console.log('formErrors', formErrors);
    Object.keys(formErrors).map((key: string) => {
      console.log(key, formErrors[key as keyof FormValidationError]);
      console.log(key === name);

      if (key === name && formErrors[key as keyof FormValidationError]) {
        setInputClass(clsx(baseClass, classes, ErrorClass));
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors[name as keyof FormValidationError]]);
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input name={name} onChange={onChange} placeholder={placeholder} {...props} className={inputClass} />
      {formErrors[name as keyof FormValidationError] && (
        <div className={ErrorTextClass}>{formErrors[name as keyof FormValidationError]}</div>
      )}
    </div>
  );
};

export default Input;
