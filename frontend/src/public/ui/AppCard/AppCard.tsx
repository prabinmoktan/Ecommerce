import React from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { MdFavoriteBorder } from "react-icons/md";
import { useSelector } from 'react-redux';
import { isLogged} from '../../../admin/Pages/(auth)/AuthSlice/Auth.slice';


interface AppCardProps {
    title: string,
    description?: string,
    image: string;
    price?: string;
    onClick?: () => void;
}

const AppCard: React.FC<AppCardProps> = ({title,  image, price, onClick}) => {
    const isAuthenticated = useSelector(isLogged);
  return (
    <>
    <div className='w-72 h-96 cursor-pointer overflow-hidden shadow-lg flex flex-col'>
    <div onClick={onClick} className='flex-1 relative overflow-hidden '>
            <img src={image} alt="..." loading='lazy' className=''/>
        </div>
        <div className='flex justify-between items-center w-full px-2 my-5'>
            <div>
            <h1>{title}</h1>
            <h1 className='text-gray-400'>
                {price}
            </h1>
            </div>
            <div className='flex gap-3 '>
              { isAuthenticated && <MdFavoriteBorder className='bg-gray-200 rounded-full text-black text-2xl p-1'/>}
                 <CiShoppingCart className='bg-gray-200 rounded-full text-black text-2xl p-1'/>
            </div>
        </div>
       
    </div>
    </>
  )
}

export default AppCard