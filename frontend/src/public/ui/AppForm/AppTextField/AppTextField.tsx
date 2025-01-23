import React from 'react'


interface TextField{
    label?: string;
    type?: string;
}

const AppTextField: React.FC<TextField> = ({label, type}) => {
  return (
    <>
    <label >{label}</label>
    <input type={type} placeholder='search here' className='w-full outline outline-none  border-b  border-gray-500 py-1 bg-transparent focus:outline-none'/>
    </>
  )
}

export default AppTextField