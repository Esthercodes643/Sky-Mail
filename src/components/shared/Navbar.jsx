import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { GoQuestion } from "react-icons/go";
import { IoIosSearch } from 'react-icons/io';
import { IoMdSettings } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import Avatar from 'react-avatar';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between mx-3 h-16'>
      <div className='flex items-center gap-10'>
        <div className='flex items-center gap-2'>
          <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
            <RxHamburgerMenu size={"20px"} />
            </div>

            <img className="w-8"src="/src/images/io.png" alt="Email Logo" />
            <h1 className="text-2xl text-gray-500 font-medium">Sky Mail</h1>
        </div>
        <div className='md:block hidden w-{50%} mr-60'>
          <div className='flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full'>
            <IoIosSearch size={"24px"} className="text-gray-700" />
            <input type="text" placeholder='Search Mail' className='rounded-full w-full bg-transparent outline-none px-1' />
          </div>
        </div>
        <div className='md:block hidden'>
          <div className='flex items-center gap-2'>
            <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
              <GoQuestion size={"20px"} className="text-gray-700" />
              </div>

              <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
              <IoMdSettings size={"20px"} className="text-gray-700" />
              </div>

              <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
              <TbGridDots size={"20px"} className="text-gray-700" />
              </div>

              <div className='cursor-pointer'>
                <Avatar src ="https://th.bing.com/th/id/OIP.0bpu7Db_PoyVk1kdANVACQHaHa?w=145&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3" size="40" round={true} />
              </div>



            </div>

            
            

          </div>
        </div>

      </div>
    
  )
}

export default Navbar