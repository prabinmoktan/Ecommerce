import React from "react";

interface ButtonProps {
  title: string;
  icon: React.ReactNode;
  bg: 'bg-black' | 'text-gray-400';
}

const Button: React.FC<ButtonProps> = ({ title, icon, bg }) => {
  return (
    <>
      <div className={`${bg} rounded-xl text-white flex  items-center justify-evenly py-2`}>
        <button >{title}</button>
        <div className="text-white text-2xl">
            {icon}
        </div>
      </div>
    </>
  );
};

export default Button;
