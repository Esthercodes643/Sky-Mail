import React, { useEffect, useState } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegQuestionCircle } from "react-icons/fa";
import { PiDotsNineBold } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setSearchText, setSidebarOpen } from "../redux/appSlice";
import { auth } from "../firebase.js";
import { signOut } from 'firebase/auth';
import ProfileMenu from "./ProfileMenu";
import { IoClose } from "react-icons/io5";
import logo from '../images/io.png'

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const dispatch = useDispatch();
  const { authUser } = useSelector(store => store.app);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => dispatch(setAuthUser(null)))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    dispatch(setSearchText(search));
  }, [search, dispatch]);

  return (
    <div className='flex items-center justify-between px-4 h-16 bg-white shadow-sm sticky top-0 z-50'>
      
      {/* Left Section */}
      <div className='flex items-center gap-3'>
        {/* Hamburger menu */}
        <div
          className='p-3 rounded-full hover:bg-gray-100 cursor-pointer md:block'
          onClick={() => dispatch(setSidebarOpen(true))}
        >
          <RxHamburgerMenu size={'22px'} className='text-gray-700' />
        </div>

        <div className='flex items-center gap-2'>
          <img className='w-8' src={logo} alt="logo" />
          <h1 className='text-xl sm:text-2xl text-gray-700 font-medium'>Sky Mail</h1>
        </div>
      </div>

      {/* Search Bar - visible on both mobile and desktop */}
      <div className='hidden md:flex items-center w-[50%] bg-[#EAF1FB] px-3 py-2 rounded-full'>
        <IoIosSearch size="22px" className='text-gray-700' />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search mail'
          className='rounded-full w-full bg-transparent outline-none px-2 text-sm'
        />
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-2'>
        {/* Mobile Search Icon */}
        <button
          className='p-3 rounded-full hover:bg-gray-100 cursor-pointer md:hidden'
          onClick={() => setShowSearchMobile(true)}
        >
          <IoIosSearch size={'22px'} />
        </button>

        {/* Desktop-only Icons */}
        <div className='hidden md:flex items-center gap-2'>
          <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
            <FaRegQuestionCircle size={"20px"} />
          </div>
          <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
            <IoSettingsOutline size={"20px"} />
          </div>
          <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
            <PiDotsNineBold size={"20px"} />
          </div>
        </div>

        {/* Profile - always visible */}
        <div className='relative cursor-pointer'>
          <ProfileMenu authUser={authUser} signOutHandler={signOutHandler} />
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showSearchMobile && (
        <div className='absolute inset-0 bg-white flex items-center px-3 z-50'>
          <IoIosSearch size="22px" className='text-gray-700 mr-2' />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search mail'
            className='flex-1 bg-transparent outline-none text-gray-700'
          />
          <IoClose
            size={24}
            className='cursor-pointer text-gray-600'
            onClick={() => setShowSearchMobile(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;



