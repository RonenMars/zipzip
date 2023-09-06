import React, { useState, createContext, useEffect } from 'react';
import { omit } from 'lodash';
import { AnySchema, ValidationResult } from 'joi';
import FormError from '@components/atoms/formError/FormError';
import { FormValidationError, ServerError } from '@components/molecules';

export const FormContext = createContext({});

/**
 * A reusable form component for handling form state, validation, and submission.
 *
 * @component
 * @param {Object} props - The component's properties.
 * @param {React.ReactNode} props.children - The content to render within the form.
 * @param {string} props.classes - Additional CSS classes to apply to the form.
 * @param {AnySchema} props.validationSchema - The Joi schema used for form validation.
 * @param {function} props.onSubmit - A callback function to execute when the form is submitted successfully.
 *
 * @example
 * import React from 'react';
 * import { Form } from './your-form-component';
 *
 * const MyForm = () => {
 *   const handleSubmit = async (formData) => {
 *     console.log('Form submitted with data:', formData);
 *   };
 *
 *   return (
 *     <Form validationSchema={validationSchema} onSubmit={handleSubmit} classes="my-form">
 *       <input type="text" name="name" placeholder="Name" />
 *       <input type="text" name="email" placeholder="Email" />
 *       <button type="submit">Submit</button>
 *     </Form>
 *   );
 * };
 *
 * export default MyForm;
 */
export const Form = ({
  children,
  classes,
  validationSchema,
  onSubmit,
  serverErrors,
}: {
  children: React.ReactNode;
  classes?: string;
  validationSchema: AnySchema;
  onSubmit: Function;
  serverErrors?: string | Array<ServerError>;
}) => {
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState({});
  const [globalError, setGlobalError] = useState('');

  useEffect(() => {
    if (Array.isArray(serverErrors)) {
      for (let i = 0; i < serverErrors.length; i++) {
        const serverError = serverErrors[i];
        if (serverError.name === 'global') {
          setGlobalError(serverError.message);
        } else {
          setFormErrors({
            ...formErrors,
            ...{ [serverError.name]: serverError.message },
          });
        }
      }
    }
  }, [formErrors, serverErrors]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | string) => {
    const { name, value } = (event as React.ChangeEvent<HTMLInputElement>).target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  function validationField(event: React.ChangeEvent<HTMLInputElement>) {
    setGlobalError('');
    const { name, value } = event.target;
    const validationResult = validationSchema.extract(name).validate(value);
    const errorsList: Record<string, string> = {};
    if (validationResult.error) {
      validationResult.error.details.forEach((error) => {
        errorsList[name] = error.message;
      });

      setFormErrors({
        ...formErrors,
        ...errorsList,
      });
    } else {
      const errorsObj = omit(formErrors, name) as FormValidationError;
      setFormErrors(errorsObj);
    }
  }

  const handleErrors = (error: ValidationResult) => {
    const errorsObj =
      error?.error?.details.reduce((errors, currentError) => {
        const fieldName = currentError.path.toString();
        if (typeof currentError.path !== 'undefined') errors[fieldName] = currentError.message;
        return errors;
      }, {} as FormValidationError) || ({} as FormValidationError);

    setFormErrors(errorsObj);
    return errorsObj;
  };

  const validate = async () => {
    const validationErrors = validationSchema.validate(formState, { abortEarly: false });
    const formErrors = handleErrors(validationErrors);
    return !!Object.keys(formErrors).length;
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.props.type !== 'submit') {
        const onChange = {
          onChange: handleInputChange,
          onBlur: validationField,
        };
        return React.cloneElement(child, onChange);
      }
    }
    return child;
  });

  const submitForm = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValidationErrors = await validate();
    if (!formValidationErrors) {
      onSubmit(formState);
    }
  };

  return (
    <FormContext.Provider value={formErrors}>
      <form onSubmit={submitForm} className={classes}>
        <FormError error={globalError} />
        {childrenWithProps}
      </form>
    </FormContext.Provider>
  );
};
