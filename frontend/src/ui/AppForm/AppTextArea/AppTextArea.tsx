import { forwardRef } from "react";

interface TextAreaTypes {
  title: string;
  display: "flex" | "column";
  placeholder?: string;
  rows?: number;
  cols?: number;
}

const AppTextArea =forwardRef<HTMLInputElement, TextAreaTypes> (({
  title,
  display = "column",
  placeholder,
  rows,
  cols,
  ...rest
}, ref) => {
  return (
    <>
      <div className={display}>
        <label>{title}</label>
        <textarea
          
          placeholder={placeholder}
            rows={rows}
            cols={cols}
            ref={ref}
          className="placeholder:text-slate-400 focus:outline-none focus:border-teal-900 text-slate-700 w-full hover:border-slate-400 transition duration-300 ease-in-out rounded "
            {...rest}
        />
      </div>
    </>
  );
}
);

export default AppTextArea;
