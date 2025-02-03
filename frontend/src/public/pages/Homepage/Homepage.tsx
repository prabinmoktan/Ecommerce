import AppCard from "../../ui/AppCard/AppCard";
import AppCarousel from "../../ui/AppCarousel/AppCarousel";
import LogoCarousel from "../../ui/LogoCarousel/LogoCarousel";
import "./Homepage.css";
import { FaArrowRightLong } from "react-icons/fa6";


const images = [
  
  "/4.png",
  "/5.png",
  "/6.png",
  "/7.png",
];

const card= [
  {title: "T-shirt", image: "/4.png", price: "$1000"},
  {title: "T-shirt", image: "/5.png", price: "$1000"},
  {title: "T-shirt", image: "/6.png", price: "$1000"},
  {title: "T-shirt", image: "/7.png", price: "$1000"},
]

const Homepage = () => {
  return (
    <>
      <div className="w-screen h-1/3  flex justify-center items-start  absolute top-0 z-0">
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
      <div className="w-screen mt-[calc(100vh-20%)]">
        <h1>
          All Collections
        </h1>
        <div className="  flex flex-wrap justify-evenly">
        {
          card?.map((item, index)=> (

            <div key={index} >
              <AppCard title={item.title} price={item.price} image={item.image}/>
            </div>
          ))
        }
        </div>
       
      </div>
        <div className="w-screen ">
          <LogoCarousel  />
        </div>
        
      
    </>
  );
};

export default Homepage;
