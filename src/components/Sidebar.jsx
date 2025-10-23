import React, { useState } from 'react';
import { LuPencil } from "react-icons/lu";
import { IoMdStar } from "react-icons/io";
import { MdOutlineWatchLater, MdOutlineKeyboardArrowDown, MdOutlineDrafts, MdInbox } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { FaRegTrashCan } from "react-icons/fa6";
import { AiOutlineStop } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setOpen, setSidebarOpen } from '../redux/appSlice';

const sidebarItems = [
  { icon: <MdInbox size={"20px"} />, text: "Inbox" },
  { icon: <IoMdStar size={"20px"} />, text: "Starred" },
  { icon: <MdOutlineWatchLater size={"20px"} />, text: "Snoozed" },
  { icon: <TbSend2 size={"20px"} />, text: "Sent" },
  { icon: <MdOutlineDrafts size={"20px"} />, text: "Drafts" },
  { icon: <FaRegTrashCan size={"20px"} />, text: "Trash" },
  { icon: <AiOutlineStop size={"20px"} />, text: "Spam" },
];

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((store) => store.app);

  const handleCompose = () => {
    dispatch(setOpen(true)); // open compose modal
    dispatch(setSidebarOpen(false)); // close sidebar (especially for mobile)
  };

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full bg-white z-50 md:z-auto w-64 transform 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-300 ease-in-out shadow-md md:shadow-none`}
      >
        {/* Header for mobile */}
        <div className="flex justify-between items-center p-3 md:hidden border-b">
          <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
          <IoClose
            size={24}
            className="cursor-pointer"
            onClick={() => dispatch(setSidebarOpen(false))}
          />
        </div>

        {/* Compose Button */}
        <div className="p-3">
                  <button
                  onClick={handleCompose}
                       className="flex items-center gap-3 bg-[#C2E7FF] text-black px-5 py-3 rounded-2xl 
                          hover:shadow-md hover:bg-[#B9E1FF] transition-all w-full font-medium justify-center md:justify-start"
                               >
                          <LuPencil size={22} />
                           <span>Compose</span>
                        </button>
                   </div>
 

        {/* Sidebar Items */}
        <div className="text-gray-500">
          {sidebarItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelected(idx)}
              className={`${
                selected === idx
                  ? 'bg-[#C2E7FF] text-black'
                  : 'hover:bg-gray-200 hover:text-black'
              } flex pl-6 py-2 rounded-r-full items-center gap-4 my-2 cursor-pointer`}
            >
              {item.icon}
              <p>{item.text}</p>
            </div>
          ))}

          {/* More Section */}
          <div className="flex items-center pl-6 gap-4 cursor-pointer hover:bg-gray-200 rounded-r-full py-2">
            <MdOutlineKeyboardArrowDown size={"20px"} />
            <span>More</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
