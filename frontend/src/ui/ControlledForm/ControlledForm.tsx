import React from 'react';
import  { FieldError, useFormContext } from 'react-hook-form';
import AppText from '../AppForm/AppText/AppText';

interface ControlledFormTypes{
    title: string;
    placeholder: string;
    display: "flex" | "column";
    name: string;
}

const ControlledForm: React.FC<ControlledFormTypes> = ({title, placeholder, display='column', name}) => {

    const {register, formState:{errors}} = useFormContext();
    const error = errors[name] as FieldError | undefined;

  return (
    <>
    <div>
        <AppText  title={title} placeholder={placeholder} display={display} {...register(name)}/>
        {
            error && <span className='text-red-50'>{error.message}</span>
        }
    </div>
    
    </>
  )
}

export default ControlledForm