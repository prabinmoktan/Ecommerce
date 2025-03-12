import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, user } from "../../../admin/Pages/(auth)/AuthSlice/Auth.slice";
import { publicNavlink } from "../../../constant";
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
import { cartTotal } from "../../pages/Cart/CartSlice";

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const totalItems = useSelector(cartTotal);

  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
  };
  const userdata = useSelector(user);

  //open or close account section
  const handleUser = () => {
    setOpenAccount(!openAccount);
  };
  //logout function
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (error) {
      errorToast(error as string);
    }
  };
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-screen h-screen">
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
    );
  }
  return (
    <>
      <div className="w-full flex  justify-between  relative z-50 py-3 mediumNav">
        <div className="w-[150px] min-w-[100px] flex items-center flex-shrink-1">
          <img src="/Temar.jpeg" alt="logo" />
        </div>
        <div className="flex items-center justify-center gap-5 px-5 bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl shadow-lg flex-shrink">
          {publicNavlink &&
            publicNavlink.map((nav, index) => (
              <div key={index}>
                <Link to={nav.link}>{nav.name}</Link>
              </div>
            ))}
        </div>
        <div className="flex items-center justify-center gap-1 px-5 bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl shadow-lg flex-shrink">
          <div className="flex items-center cursor-pointer relative ">
            <IoSearchOutline />
            <h1 onClick={handleOpenSearch} className="search">Search</h1>
          </div>
          |
          <div className="flex items-center">
            <CiShoppingCart />
            <div className="flex items-center">
              <Link to={"/cart"}>Cart</Link>
              {
                totalItems === 0 ? null : 

              <span className="text-xs bg-red-500 rounded-full  text-white px-2 py-1">
                {totalItems}
              </span>
              }
            </div>
          </div>
          |
          {userdata ? (
            <div onClick={handleUser} className="cursor-pointer relative">
              <p className="flex items-center">
                {userdata?.firstName}{" "}
                {openAccount ? <FaChevronUp /> : <FaChevronDown />}
              </p>
              {openAccount && (
                <div className="absolute bg-gray-200 border rounded-md  z-50 px-3 py-1 ">
                  <p className="flex gap-3 items-center" onClick={handleLogout}>
                    Logout
                    <span>
                      <IoIosLogOut />
                    </span>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/auth/login"}>Login</Link>
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
