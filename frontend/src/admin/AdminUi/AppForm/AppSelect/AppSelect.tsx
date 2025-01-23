import React, { forwardRef } from "react";

interface SelectTypes {
  id?: string;
  value?: string;
  display?: "flex gap-10" | "flex flex-col";
  name: string;
  title: string;
  options: { name: string; id: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const AppSelect = forwardRef<HTMLSelectElement, SelectTypes>(
  (
    {
      title,
      options = [],
      display = "flex flex-col",
      id,
      value,
      onChange,
      error,
      ...rest
    },
    ref
  ) => {
    const combinedOptions = [{ name: "none", id: "none" }, ...options];
    return (
      <>
        <div className={display}>
          <label className="dark:text-gray-200">{title}</label>
          <select
            id={id}
            key={id}
            value={value}
            onChange={onChange}
            ref={ref}
            {...rest}
            className="h-9 outline-none border focus:border-blue-500 text-slate-700 w-full hover:border-green-400 transition duration-300 ease-in-out rounded"
            
          >
            {combinedOptions.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
      </>
    );
  }
);

export default AppSelect;
