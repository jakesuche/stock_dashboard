import React, { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextInput = forwardRef(
  ({ label, ...rest }: TextInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div>
    <label className="block mb-2 text-sm font-medium text-gray-900 ">
          {label}
        </label>
        <input
          {...rest}
          ref={ref}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        />
      </div>
    );
  }
);

export default TextInput;

TextInput.displayName = 'TextInput'
