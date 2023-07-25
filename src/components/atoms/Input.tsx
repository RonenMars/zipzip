import React from 'react';

interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
}
const Input: React.FC<InputProps> = ({ name, placeholder, onChange, ...props }: InputProps) => {
  return <input name={name} onChange={onChange} placeholder={placeholder} {...props} />;
};

export default Input;
