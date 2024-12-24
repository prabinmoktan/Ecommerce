import { forwardRef } from "react";
interface TextTypes {
  title: string;
  display: "flex" | "column";
  placeholder?: string;
  error?: string;
}

const AppText = forwardRef<HTMLInputElement, TextTypes>(
  ({ title, display = "column", placeholder, error, ...rest }, ref) => {
    return (
      <>
        <div className={display}>
          <label className="dark:text-gray-200 ">{title}</label>
          <input
            type="text"
            {...rest}
            placeholder={placeholder}
            ref={ref}
            className="placeholder:text-slate-400 bg-transparent dark:text-gray-200 text-slate-700 w-full hover:border-slate-400 transition duration-300 ease-in-out rounded h-9 outline-none border border-gray-600 focus:outline-none focus:border-blue-500 "
          />
          {error && <span className="text-red-500">{error}</span>}
        </div>
      </>
    );
  }
);

export default AppText;
