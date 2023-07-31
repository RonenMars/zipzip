import React from 'react';
import buttonDesignTypes from './ButtonEnums';
import clsx from 'clsx';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {
  children: React.ReactNode;
  classes?: Array<string>;
  design?: buttonDesignTypes;
}

const Button = ({ design = buttonDesignTypes.Button, ...props }: ButtonProps) => {
  const { children, classes, ...rest } = props;

  const baseClass = ['w-full text-center'];

  const buttonClasses = [
    'h-12 text-white bg-gradient-to-b from-purple-100 to-purple-200 via-purple-500 rounded-full font-bold',
  ];
  const linkClasses = ['text-purple-300 underline text-lg'];

  const buttonClass = clsx(
    baseClass,
    design === buttonDesignTypes.Button && buttonClasses,
    design === buttonDesignTypes.Link && linkClasses,
    classes,
  );
  return (
    <button {...rest} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;
