import React, { useContext, useEffect, useMemo, ReactElement } from 'react';
import { FormContext, FormValidationError } from '@components/molecules';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { InputProps } from '@components/atoms/input/interface/InputInterface';

/**
 * A customizable input field component for use in React forms.
 *
 * @component
 * @param {Object} props - The component's properties.
 * @param {Array<string>} [props.classes] - Additional CSS classes to apply to the input field.
 * @param {string} [props.wrapperClasses] - Additional CSS classes to apply to the div of the input field.
 * @param {string} [props.name] - Input name.
 * @param {string} [props.label] - Input label.
 * @returns {React.ReactElement} The rendered input field component.
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
 *         dir="ltr"
 *       />
 *     </form>
 *   );
 * };
 *
 * export default MyForm;
 */

const Input: React.FC<InputProps> = ({ classes, wrapperClasses, ...props }: InputProps): ReactElement => {
  const { name, label } = props;
  const formErrors = useContext(FormContext);

  const currentFormErrors = formErrors as FormValidationError;
  const inputError = currentFormErrors[name as keyof FormValidationError];
  const [errorTextClass, setErrorTextClass] = React.useState('');
  const { t } = useTranslation();

  const baseClass = useMemo(
    () => [
      'w-full h-12 border border-purple rounded-full placeholder:text-center placeholder:text-base mt-1 dark:text-white',
    ],
    [],
  );
  const errorClass = 'border-red text-red';
  const errorTxtClass = 'text-red text-sm mt-1 text-center';

  const [inputClass, setInputClass] = React.useState(clsx(baseClass, classes));

  useEffect(() => {
    const currentErrors = formErrors as FormValidationError;
    const isError = Object.keys(formErrors).filter((key: string) => {
      const isFieldError = key === name && currentErrors[key as keyof FormValidationError];
      if (isFieldError) {
        setInputClass(clsx(baseClass, classes, errorClass));
        setErrorTextClass(errorTxtClass);
      }
      return isFieldError;
    });

    if (!isError.length) {
      setInputClass(clsx(baseClass, classes));
      setErrorTextClass('');
    }
  }, [baseClass, classes, formErrors, name]);

  return (
    <div className={wrapperClasses}>
      <label htmlFor={name}>{label}</label>
      <input className={inputClass} {...props} />
      {inputError ? <div className={errorTextClass}>{t(inputError)}</div> : null}
    </div>
  );
};

export default Input;
