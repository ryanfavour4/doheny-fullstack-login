import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`${className} px-4 py-2 w-full rounded-md text-white font-semibold bg-primaryColor hover:bg-bgColor`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
