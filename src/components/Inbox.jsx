import React, { useState } from "react";
import { MdCropSquare } from "react-icons/md";
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { IoMdRefresh, IoMdMore } from "react-icons/io";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdInbox,
} from "react-icons/md";
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
    <div className="flex-1 bg-white rounded-xl mx-2 sm:mx-5 shadow-sm overflow-hidden">
      {/* Top controls */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-2 text-gray-700 flex-wrap">
          <div className="flex items-center gap-1">
            <MdCropSquare size={20} />
            <FaCaretDown size={16} />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <IoMdRefresh size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <IoMdMore size={20} />
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0">
          <p className="text-xs sm:text-sm text-gray-500">
            1–50 of {emails?.length}
          </p>
          <button
            disabled={false}
            className="p-1 hover:rounded-full hover:bg-gray-100"
          >
            <MdKeyboardArrowLeft size={22} />
          </button>
          <button
            disabled={false}
            className="p-1 hover:rounded-full hover:bg-gray-100"
          >
            <MdKeyboardArrowRight size={22} />
          </button>
        </div>
      </div>

      {/* Mail categories */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200">
        {mailType.map((item, index) => (
          <button
            key={index}
            className={`flex items-center flex-shrink-0 gap-2 px-4 py-3 sm:py-4 text-sm sm:text-base ${
              mailTypeSelected === index
                ? "border-b-4 border-blue-600 text-blue-600 font-medium"
                : "border-b-4 border-transparent text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setMailTypeSelected(index)}
          >
            {item.icon}
            <span>{item.text}</span>
          </button>
        ))}
      </div>

      {/* Mail list */}
      <div className="h-[calc(100vh-180px)] sm:h-[90vh] overflow-y-auto">
        <Messages />
      </div>
    </div>
  );
};

export default Inbox;
