/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { cartItems } from "./CartSlice";
import CartData from "../../Components/CartData/CartData";
import './cart.css';


const Cart = () => {
  const cartData = useSelector(cartItems);

  return (
    <>
      <div className=" w-screen max-w-screen min-w-screen min-h-[500px]">
        <div>
        <h1 className="text-2xl text-center">Shopping Cart</h1>

        </div>
        <div className="px-10 flex justify-between gap-24 w-screen parent" >
          <div className=" w-full">
            {cartData?.cart.length === 0 ? (
              <h1>No Item in Cart</h1>
            ) : (
              cartData && 
              cartData?.cart?.map((item: any) => (
                <CartData
                key={item._id}
                id={item._id}
                title={item.title}
                quantity={item.quantity}
                price={item.price}
                image={item.images}
                />
              ))
              
            )}
          </div>
          {
            cartData?.cart.length > 0 && 
            <div className="w-full">
            <h1 className="text-2xl">Summary</h1>
            
            <span className=" w-full flex justify-between">
              <h1>Subtotal</h1>
              <p>${cartData.totalPrice}</p>
              
              </span>
              <span className="flex justify-between">
              <h1>Estimated Shipping & Handling </h1>
              <p>Free</p>
              
              </span>
              <span className="flex justify-between border-b">
              <h1>Estimated Tax</h1>
              <p>-</p>
              
              </span>
              <span className="flex justify-between mt-2">
                <h1>Total</h1>
                <p>${cartData.totalPrice}</p>
              </span>
          </div>
          }
        </div>
      </div>
    </>
  );
};

export default Cart;
