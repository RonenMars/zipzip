import React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {
  children: React.ReactNode;
  classes: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, classes, ...rest } = props;

  return (
    <button
      {...rest}
      className={`w-full h-12 text-center text-white bg-gradient-to-b from-purple-100 to-purple-200 via-purple-500 rounded-full font-bold ${classes}`}
    >
      {children}
    </button>
  );
};

export default Button;
