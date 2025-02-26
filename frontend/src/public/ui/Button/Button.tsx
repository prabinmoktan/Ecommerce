import React from "react";

interface ButtonProps {
  title: string;
  icon?: React.ReactNode;
  bg?: 'bg-black' | 'text-gray-400' | 'bg-red-700';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, icon, bg='bg-black', onClick }) => {
  return (
    <>
      <div className={`${bg} rounded-xl text-white flex  items-center justify-evenly py-2 cursor-pointer` } onClick={onClick}>
        <button >{title}</button>
        <div className="text-white text-2xl">
            {icon}
        </div>
      </div>
    </>
  );
};

export default Button;
