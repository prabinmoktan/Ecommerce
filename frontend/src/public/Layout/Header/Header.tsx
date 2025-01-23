import React, { useState } from "react";
import { useSelector } from "react-redux";
import { user } from "../../../admin/Pages/(auth)/AuthSlice/Auth.slice";
import { publicNavlink } from "../../../constant";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import "./Header.css";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import SearchComponent from "../../ui/SearchComponent";

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
  };
  const userdata = useSelector(user);
  console.log(userdata);
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
