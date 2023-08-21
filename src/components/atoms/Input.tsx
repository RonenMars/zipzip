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

/**
 * A customizable input field component for use in React forms.
 *
 * @component
 * @param {Object} props - The component's properties.
 * @param {string} props.name - The name attribute for the input field.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.label - The label text associated with the input field.
 * @param {Array<string>} [props.classes] - Additional CSS classes to apply to the input field.
 * @param {function} [props.onChange] - A callback function to execute when the input value changes.
 * @returns {JSX.Element} The rendered input field component.
 *
 * @example
 * import React from 'react';
 * import Input from './InputComponent';
 *
 * const MyForm = () => {
 *   const handleChange = (event) => {
 *     ** Handle input change here, e.g., update form state. **
 *   };
 *
 *   return (
 *     <form>
 *       <Input
 *         name="username"
 *         placeholder="Enter your username"
 *         label="Username"
 *         onChange={handleChange}
 *         classes={['custom-class']}
 *       />
 *     </form>
 *   );
 * };
 *
 * export default MyForm;
 */

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
