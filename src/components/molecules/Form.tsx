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

  const handleOnBlur = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await validationSchema.validate(formState, { abortEarly: false });
      const errors1 = omit(formErrors, event.target.name) as FormValidationError;
      setFormErrors(errors1);
      // form is valid, do your stuff
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        const errors1 = err.inner.reduce((errors, error) => {
          if (typeof error.path !== 'undefined') errors[error.path as keyof FormValidationError] = error.message;
          return errors;
        }, {} as FormValidationError);
        setFormErrors(errors1);
      }
    }
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const onChange = {
        onChange: handleInputChange,
        onBlur: handleOnBlur,
      };

      return React.cloneElement(child, onChange);
    }
    return child;
  });

  const submitForm = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState);

    // try {
    //   await validationSchema.validate(formState, { abortEarly: false });

    //   // form is valid, do your stuff
    // } catch (err) {
    //   const errors1 = err.inner.reduce((errors, error) => {
    //     errors[error.path] = error.message;
    //     return errors;
    //   }, {});

    //   console.log(errors1);

    //   setFormErrors(errors1);
    // }
  };

  return (
    <ThemeContext.Provider value={formErrors}>
      <form onSubmit={submitForm} className={classes}>
        {childrenWithProps}
      </form>
    </ThemeContext.Provider>
  );
};
