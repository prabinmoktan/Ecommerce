import React from 'react'

interface ButtonTypes{
    title: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
}

const AppButton:React.FC<ButtonTypes> = ({title, onClick,icon,type, ...rest}) => {
  return (
    <>
    <div className='flex gap-4 bg-blue-800 text-white py-2 px-3 rounded items-center'>
    <button onClick={onClick} {...rest} type={type}>{title}</button>
    <span>
        {icon}
    </span>

    </div>
    </>
  )
}

export default AppButton