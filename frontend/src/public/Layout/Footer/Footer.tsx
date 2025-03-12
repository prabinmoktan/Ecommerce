import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";



const Footer = () => {
  return (
    <>
    <footer className="w-screen pt-5  px-10 border-t border-black mt-5">

   
      <div className="w-screen grid grid-cols-2 px-10 gap-10  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        <div className="flex justify-center flex-col items-center">
          <img src="/Temar.jpeg" alt="..." className="w-36"/>
          <p>SHOP FASHIONLY...</p>
        </div>
        <div className=" flex flex-col gap-3 ">
          <h1 className="underline">
            LEGAL
          </h1>
          <Link to={''}>Terms of Service</Link>
          <Link to={''}>Privacy Policy</Link>
          <Link to={''}>Cookies Policy</Link>
          <Link to={''}>Data Processing</Link>
        </div>
        <div className=" flex flex-col gap-3 ">
          <h1 className="underline">
            COMPANY
          </h1>
          <Link to={''}>Blog</Link>
          <Link to={''}>Careers</Link>
          <Link to={''}>News</Link>
        </div>
        <div className=" flex flex-col gap-3 mt-5 ">
          <Link to={''}>About us</Link>
          <Link to={''}>Contact us</Link>
          <Link to={''}>Affiliates</Link>
          <Link to={''}>Resources</Link>
        </div>
      </div>

        <div className="w-full flex justify-between items-center  py-3 border-gray-200 border-t px-10 mt-5">
          <div>
            <p className="text-sm">© 2021 Temar. All rights reserved</p>
          </div>
          <div className="flex gap-3 text-lg">
            <Link to={''}><FaFacebook/></Link>
            <Link to={''}><FaInstagram/></Link>
            <Link to={''}><CiLinkedin/></Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
