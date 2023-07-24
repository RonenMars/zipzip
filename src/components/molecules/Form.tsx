import React, { useState } from 'react';

interface FormProps {
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ children }) => {
  const [formState, setFormState] = useState<Record<string, string>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const onChange = {
        onChange: handleInputChange,
      };

      return React.cloneElement(child, onChange);
    }
    return child;
  });

  const submitForm = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <form onSubmit={submitForm}>
      {childrenWithProps}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
