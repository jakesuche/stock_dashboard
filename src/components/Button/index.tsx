import React, { forwardRef, ForwardedRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "outline" | "text" | "link";
}

const Button = forwardRef(
  (
    { variant = "default", className = "", ...rest }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    let buttonClass =
      "rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none";

    switch (variant) {
      case "primary":
        buttonClass +=
          " text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium";
        break;
      case "outline":
        buttonClass +=
          " text-blue-800 border border-blue-800 hover:bg-blue-50 focus:ring-4 focus:ring-blue-300 font-medium";
        break;
      case "text":
        buttonClass +=
          " text-blue-800 hover:bg-blue-50 focus:ring-4 focus:ring-blue-300 font-medium";
        break;
      case "link":
        buttonClass +=
          " text-blue-800 hover:underline focus:outline-none focus:underline";
        break;
      default:
        buttonClass +=
          " bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-400 font-medium";
    }

    return (
      <button {...rest} ref={ref} className={`${buttonClass} ${className}`}>
        {rest.children}
      </button>
    );
  }
);

export default Button;

Button.displayName = 'Button'
