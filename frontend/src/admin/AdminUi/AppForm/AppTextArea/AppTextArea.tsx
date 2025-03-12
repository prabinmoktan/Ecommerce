import { forwardRef } from "react";

interface TextAreaTypes {
  title: string;
  display: "flex" | "column";
  placeholder?: string;
  rows?: number;
  cols?: number;
  error?: string;
}

const AppTextArea = forwardRef<HTMLTextAreaElement, TextAreaTypes>(
  (
    { title, display = "column", placeholder, rows, cols, error, ...rest },
    ref
  ) => {
    return (
      <>
        <div className={display}>
          <label className="dark:text-gray-200">{title}</label>
          <textarea
            placeholder={placeholder}
            rows={rows}
            cols={cols}
            ref={ref}
            className="placeholder:text-slate-400 bg-gray-100 dark:text-gray-700 text-slate-700 w-full hover:border-slate-400 transition duration-300 ease-in-out rounded  outline-none border focus:outline-none focus:border-blue-500 "
            {...rest}
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
      </>
    );
  }
);

export default AppTextArea;
