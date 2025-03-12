import { forwardRef } from "react";
interface TextTypes {
  title: string;
  display: "flex" | "column";
  placeholder?: string;
  error?: string;
  type?: "text" | "password";
  autoComplete?: string;
  backendError?: string;
}

const AppText = forwardRef<HTMLInputElement, TextTypes>(
  (
    {
      title,
      display = "column",
      placeholder,
      error,
      type = "text",
      autoComplete,
      backendError,
      ...rest
    },
    ref
  ) => {
    return (
      <>
        <div className={display}>
          <label className="dark:text-gray-200 ">{title}</label>
          <input
            type={type}
            {...rest}
            placeholder={placeholder || backendError}
            ref={ref}
            autoComplete={autoComplete}
            className={` placeholder:text-slate-400 bg-gray-100 dark:text-gray-600 text-slate-700 w-full hover:border-slate-400 transition duration-300 ease-in-out rounded h-9 outline-none border  focus:outline-none focus:border-blue-500 ${
              error || backendError
                ? "border-red-500 focus:border-red-500"
                : "focus:border-blue-500"
            }`}
          />
          {error && <span className="text-red-500 text-xs">{error }</span>}
          {backendError && <span className="text-red-500 text-xs">{backendError }</span>}
        </div>
      </>
    );
  }
);

export default AppText;
