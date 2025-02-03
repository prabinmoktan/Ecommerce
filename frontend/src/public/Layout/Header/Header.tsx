import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, user } from "../../../admin/Pages/(auth)/AuthSlice/Auth.slice";
import {  publicNavlink } from "../../../constant";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import "./Header.css";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import SearchComponent from "../../ui/SearchComponent";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useLogoutUserMutation } from "../../../admin/Pages/(auth)/AuthApi/user.api";
import { errorToast } from "../../../services/toastify.service";
import { Oval } from "react-loader-spinner";



const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [logoutUser, {isLoading}] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
  };
  const userdata = useSelector(user);
  console.log(userdata);

  //open or close account section
  const handleUser = () => {
    setOpenAccount(!openAccount);
  };
//logout function
  const handleLogout=async()=> {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (error) {
      errorToast(error as string)
    }

  }
  if(isLoading){
    return  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-screen h-screen">
              <Oval
                visible={true}
                height="80"
                width="80"
                color="white"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
  }
  return (
    <>
      <div className="w-screen flex  justify-between px-5 relative z-50 py-3 mediumNav">
        <div className="w-40 flex bg-green-700 items-center">
          <img src="/Temar.jpeg" alt="logo" />
        </div>
        <div className="flex items-center justify-center gap-10 px-5 bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl shadow-lg ">
          {publicNavlink &&
            publicNavlink.map((nav, index) => (
              <div key={index}>
                <Link to={nav.link}>{nav.name}</Link>
              </div>
            ))}
        </div>
        <div className="flex items-center justify-center gap-3 px-5 bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl shadow-lg ">
          <div className="flex items-center cursor-pointer relative ">
            <IoSearchOutline />
            <h1 onClick={handleOpenSearch}>Search</h1>
          </div>
          |
          <div className="flex items-center">
            <CiShoppingCart />
            <Link to={""}>Cart</Link>
          </div>
          |
          {userdata ? (
            <div onClick={handleUser} className="cursor-pointer relative">
              <p className="flex items-center">{userdata?.firstName} {openAccount? <FaChevronUp/>:<FaChevronDown/>}</p>
              {
            openAccount && 
            <div className="absolute bg-gray-200 border rounded-md  z-50 px-3 py-1 ">
             <p className="flex gap-3 items-center" onClick={handleLogout}>
              Logout
              <span><IoIosLogOut/></span>
             </p>
            </div>
          }
            </div>
          ) : (
            <Link to={'/auth/login'}>Login</Link>
          )}
        </div>
      </div>
      <div className="pl-5 w-screen">
        {openSearch && (
          <div
            className="w-full rounded-2xl  bg-gray-200 absolute z-50 px-5 py-3"
            style={{ maxWidth: "calc(100% - 40px)" }}
          >
            <SearchComponent />
          </div>
        )}
      </div>
      <MobileNavbar />
    </>
  );
};

export default Header;
