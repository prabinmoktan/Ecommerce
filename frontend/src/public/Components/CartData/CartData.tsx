import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { decreaseCart, increaseCart } from "../../pages/Cart/CartSlice";
import { MdDeleteOutline } from "react-icons/md";


export interface CartDataProps {
  id: string;
  title: string;
  price: number;
  image: string[];
  quantity: number;
}

const CartData: React.FC<CartDataProps> = ({
  id,
  title,
  quantity,
  image,
  price,
}) => {
  const dispatch = useDispatch();
  const handleIncrease = (id : string) => {
    dispatch(increaseCart({ _id: id }));
    console.log(' increase clicked')
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseCart({ _id: id }));
    console.log(' decrease clicked')

  }
  return (
    <>
      <div className="flex justify-between items-center  border-b border-black ">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-xl font-semibold">${price}</p>
          <div className="flex items-center justify-between px-3 py-1 my-7 border rounded-2xl w-20 ">
            <button onClick={()=> handleDecrease (id)}>
                {quantity === 1 ? <MdDeleteOutline className="text-xl text-red-600"/>
                :
              <FiMinus />
                } 
            </button>
            {quantity}
            <button onClick={() => handleIncrease(id)} >
              <FaPlus />
            </button>
          </div>
         
        </div>
        <div className="py-2">
          <img src={image?.[0]} alt="..." loading="lazy" className="w-40 max-h-48" />
        </div>
      </div>
    </>
  );
};

export default CartData;
