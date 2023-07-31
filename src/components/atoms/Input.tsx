import React from 'react';

interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  label: string;
}
const Input: React.FC<InputProps> = ({ name, placeholder, onChange, label, ...props }: InputProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <br />
      <input name={name} onChange={onChange} placeholder={placeholder} {...props} />
    </div>
  );
};

export default Input;
