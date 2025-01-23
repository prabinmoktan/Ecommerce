import AppCarousel from "../../ui/AppCarousel/AppCarousel";
import "./Homepage.css";
import { FaArrowRightLong } from "react-icons/fa6";


const images = [
  // "/3.png",
  "/4.png",
  "/5.png",
  "/6.png",
  "/7.png",
];

const Homepage = () => {
  return (
    <>
      <div className="w-screen  flex justify-center items-start absolute top-0 z-0">
        <div className=" w-screen flex items-center">
          <div className="w-1/2 h-full">
            <h1 className="shadows-into-light-regular">TEMAR</h1>
            <p className="text-justify indent-10" >
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
          <div className="w-1/2">
            <AppCarousel items={images} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
