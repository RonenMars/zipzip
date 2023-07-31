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
      <input
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
        className="h-12 border border-purple rounded-full placeholder:text-center placeholder:text-base mt-4"
      />
    </div>
  );
};

export default Input;
