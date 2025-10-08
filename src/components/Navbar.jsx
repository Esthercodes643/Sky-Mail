import React, { useEffect, useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegQuestionCircle } from "react-icons/fa";
import { PiDotsNineBold } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";

import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setSearchText } from "../redux/appSlice";
import { auth } from "../firebase.js";
import { signOut } from 'firebase/auth';

import ProfileMenu from "./ProfileMenu";



const Navbar = () => {
  
  
  const [search, setSearch] = useState("");
  
  const dispatch = useDispatch();
  const { authUser } = useSelector(store => store.app);

  const signOutHandler = () => {
    signOut(auth).then(() => {
      dispatch(setAuthUser(null));
    }).catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    dispatch(setSearchText(search));
  }, [search, dispatch]);


  return (
    <div className='flex items-center justify-between mx-4 h-16'>
      <div className='flex items-center gap-10'>
        <div className='flex items-center gap-2'>
          <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
            <RxHamburgerMenu size={'20px'} />
          </div>
          <img className='w-8' src={"/src/images/io.png"} alt="" />
          <h1 className='text-2xl text-gray-500 font-medium'>Sky Mail</h1>
        </div>
      </div>
      <div className='md:block hidden w-[50%] mr-60'>
        <div className='flex items-center bg-[#EAF1FB] px-2 py-3  rounded-full'>
          <IoIosSearch size="24px" className='text-gray-700' />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search mail'
            className='rounded-full w-full bg-transparent outline-none px-1'
          />
        </div>
      </div>
      <div className='md:block hidden'>

        <div className='flex items-center gap-2'>
          <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
            <FaRegQuestionCircle size={"20px"} />
          </div>
          <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
            <IoSettingsOutline size={"20px"} />
          </div>
          <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
            <PiDotsNineBold size={"20px"} />
          </div>
  
          <div className='relative cursor-pointer'>
            <ProfileMenu 
            
      authUser={authUser} 
      signOutHandler={() => {
          signOutHandler(auth)
            .then(() => dispatch(setAuthUser(null)))
            .catch((err) => console.log(err));
      }}
          />
            
              
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar