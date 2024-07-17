import { ReactNode } from "react";
import React from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;

}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`relative text-black bg-white hover:bg-slate-300  font-medium rounded-2xl text-sm lg:text-xl px-2 py-2 lg:px-4 lg:py-3 md:px-5 md:py-3 overflow-hidden`}
    >
      {React.Children.map(children, (child, index) => (
        <span
          key={index}

        >
          {child}
        </span>
      ))}
    </button>
  );
};

export default Button;
