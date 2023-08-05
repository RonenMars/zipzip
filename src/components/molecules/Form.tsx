import React, { useState, createContext } from 'react';
import * as Yup from 'yup';
import { omit } from 'lodash';

interface FormProps {
  children: React.ReactNode;
  classes: string;
  validationSchema: Yup.AnyObjectSchema;
}

export interface FormValidationError {
  [key: string]: string;
}
export const ThemeContext = createContext({});

export const Form: React.FC<FormProps> = ({ children, classes, validationSchema }) => {
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState({} as FormValidationError);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleErrors = (error: unknown) => {
    if (error instanceof Yup.ValidationError) {
      const errorsObj = error.inner.reduce((errors, error) => {
        if (typeof error.path !== 'undefined') errors[error.path as keyof FormValidationError] = error.message;
        return errors;
      }, {} as FormValidationError);
      setFormErrors(errorsObj);
    }
  };

  const validate = async (event?: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const inputName: string = event?.target.name as string;
      await validationSchema.validate(formState, { abortEarly: false });
      const errorsObj = omit(formErrors, inputName) as FormValidationError;
      setFormErrors(errorsObj);
    } catch (error: unknown) {
      handleErrors(error);
    }
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const onChange = {
        onChange: handleInputChange,
        onBlur: validate,
      };

      return React.cloneElement(child, onChange);
    }
    return child;
  });

  const submitForm = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    validate();
  };

  return (
    <ThemeContext.Provider value={formErrors}>
      <form onSubmit={submitForm} className={classes}>
        {childrenWithProps}
      </form>
    </ThemeContext.Provider>
  );
};
