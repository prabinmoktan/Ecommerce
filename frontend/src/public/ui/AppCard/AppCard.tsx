import { CiShoppingCart } from 'react-icons/ci';
import { MdFavoriteBorder } from "react-icons/md";
import { useSelector } from 'react-redux';
import { isLogged} from '../../../admin/Pages/(auth)/AuthSlice/Auth.slice';
import './AppCard.css'


export interface AppCardProps {
  _id?: string;
    title: string,
    description?: string,
    image?: string;
    price?: string;
    onClick?: () => void;
    addToCart?: () => void;
    images?: string[]
}

const AppCard: React.FC<AppCardProps> = ({title,  image, price, onClick, addToCart}) => {
    const isAuthenticated = useSelector(isLogged);
  return (
    <>
    <div className='w-[250px] h-[350px] cursor-pointer overflow-hidden shadow-lg flex flex-col max-w-[100%] min-w-[140px] min-h-[250px] rounded-xl card'>
    <div onClick={onClick} className='flex-1 relative overflow-hidden '>
            <img src={image} alt="..." loading='lazy' className='max-h-[300px] w-full object-cover'/>
        </div>
        <div className='flex justify-between items-center w-full px-2 my-5'>
            <div>
            <h1>{title}</h1>
            <h1 className='text-gray-400'>
                ${price}
            </h1>
            </div>
            <div className='flex gap-3 '>
              { isAuthenticated && <MdFavoriteBorder className='bg-gray-200 rounded-full text-black text-2xl p-1'/>}
                 <CiShoppingCart className='bg-gray-200 rounded-full text-black text-2xl p-1' onClick={addToCart}/>
            </div>
        </div>
       
    </div>
    </>
  )
}

export default AppCard