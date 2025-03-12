import { useDispatch } from "react-redux";
import AppCard, { AppCardProps } from "../../ui/AppCard/AppCard";
import AppCarousel from "../../ui/AppCarousel/AppCarousel";
import LogoCarousel from "../../ui/LogoCarousel/LogoCarousel";
import "./Homepage.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { addToCart } from "../Cart/CartSlice";
import { useGetProductsQuery } from "../Products/products.api";
import CardSkeleton from "../../ui/CardSkeleton/CardSkeleton";

const images = [
  
  "/4.png",
  "/5.png",
  "/6.png",
  "/7.png",
];

const Homepage = () => {
    const { data, isLoading } = useGetProductsQuery({limit: 4,page: 1});
  
  const dispatch = useDispatch();
 
  return (
    <>
    <div className="w-screen px-5">

   
      <div className="w-screen h-1/3  flex justify-center items-start  ">
        <div className="w-full container grid grid-cols-2 gap-5 ">
          <div className=" px-3 ">
            <h1 className="shadows-into-light-regular text-center">TEMAR</h1>
            <p className="text-justify indent-10 " >
              WELCOME TO TEMAR, YOUR ULTIMATE DESTINATION
              FOR ALL THINGS- IMMERSE YOURSELF IN A WORLD WHERE
              CREATIVITY KNOWS NO LIMITS, _______ AND INNOVATION IS THE DRIVING
              FORCE BEHIND EVERY TREND.
            </p>
            <div className="flex items-center w-full justify-center mt-2 cursor-pointer ">
              <div className="w-40 flex justify-center items-center border px-3 py-1 rounded-3xl gap-1 border-black hover:bg-black hover:text-white">

              <p>Explore More</p>
              <span className="bg-black p-1 rounded-full text-white"><FaArrowRightLong/></span>
              </div>
            </div>
          </div>
          <div className="">
            <AppCarousel items={images} />
          </div>
        </div>
      </div>
      <div 
      className='relative'
     
      >
        <h1>
          All Collections
        </h1>
        <div className=" grid grid-cols-4 mx-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xs:grid-cols-2 xs:gap-3">
        {
          isLoading ? Array(4)
          .fill(0)
          .map((_, index) => <CardSkeleton key={index} />)
          :
          data &&
          data.products.map((item: AppCardProps)=> (

            <div key={item._id} className="flex-1">
              <AppCard title={item.title} price={item.price} image={item?.images?.[0] || ''} addToCart={()=>dispatch(addToCart(item))}/>
            </div>
          ))
        }
        </div>
       
      </div>
        <div className="w-screen ">
          <LogoCarousel  />
        </div>
        </div>
      
    </>
  );
};

export default Homepage;
