import React from 'react'

interface ButtonTypes{
    title: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    background?: 'primary' | 'danger';
    disabled?: boolean;
}

const AppButton:React.FC<ButtonTypes> = ({title, onClick,icon,type,background = 'primary',disabled, ...rest}) => {
  return (
    <>
    <div className={`${background === 'primary' && 'bg-green-600'} ${background === 'danger' && 'bg-red-600'} flex gap-4  text-white py-2 px-3 rounded items-center` } >
    <button onClick={onClick} {...rest} type={type} disabled={disabled}>{title}</button>
    {
      icon && 
      <span>
        {icon}
    </span>}

    </div>
    </>
  )
}

export default AppButton