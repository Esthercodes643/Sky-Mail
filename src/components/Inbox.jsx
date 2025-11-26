import React, { useState } from "react";
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { IoMdRefresh, IoMdMore } from "react-icons/io";
import { GoTag } from "react-icons/go";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const mailType = [
  { icon: <MdInbox size={20} />, text: "Primary" },
  { icon: <GoTag size={20} />, text: "Promotions" },
  { icon: <FaUserFriends size={20} />, text: "Social" },
];

const Inbox = () => {
  const [mailTypeSelected, setMailTypeSelected] = useState(0);
  const { emails } = useSelector((store) => store.app);

  return (
    <div className="flex-1 bg-white rounded-xl mx-2 md:mx-5 shadow-sm overflow-hidden">

      {/*  TOP BAR */}
      <div className="flex items-center justify-between px-3 md:px-4 py-2 border-b">
        <div className="flex items-center gap-2 text-gray-700">
          <div className="flex items-center gap-1">
            <MdCropSquare size={20} />
            <FaCaretDown size={16} />
          </div>

          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoMdRefresh size={20} />
          </div>

          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoMdMore size={20} />
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>1 – {emails?.length || 0}</span>
          <button className="hover:bg-gray-100 p-1 rounded">
            <MdKeyboardArrowLeft size={22} />
          </button>
          <button className="hover:bg-gray-100 p-1 rounded">
            <MdKeyboardArrowRight size={22} />
          </button>
        </div>
      </div>

      {/*  TAB LAYOUT */}
      <div className="flex w-full border-b overflow-x-auto no-scrollbar">
        {mailType.map((item, index) => (
          <button
            key={index}
            onClick={() => setMailTypeSelected(index)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm md:text-base transition-all
              ${
                mailTypeSelected === index
                  ? "border-b-4 border-sky-500 text-sky-600 font-medium bg-sky-50"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            {item.icon}
            <span className="whitespace-nowrap">{item.text}</span>
          </button>
        ))}
      </div>

      {/*  MESSAGE LIST WRAPPER  */}
      <div className="h-[calc(100vh-135px)] md:h-[calc(100vh-110px)] overflow-y-auto">
        <Messages />
      </div>
    </div>
  );
};

export default Inbox;
