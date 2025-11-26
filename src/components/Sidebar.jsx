import React, { useState } from "react";
import {
  MdInbox,
  MdOutlineDrafts,
  MdOutlineWatchLater,
} from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import { TbSend2 } from "react-icons/tb";
import { FaRegTrashCan } from "react-icons/fa6";
import { AiOutlineStop } from "react-icons/ai";
import { LuPencil } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setSidebarOpen } from "../redux/appSlice";

const sidebarItems = [
  { icon: <MdInbox />, text: "Inbox" },
  { icon: <IoMdStar />, text: "Starred" },
  { icon: <MdOutlineWatchLater />, text: "Scheduled" },
  { icon: <TbSend2 />, text: "Sent" },
  { icon: <MdOutlineDrafts />, text: "Drafts" },
  { icon: <FaRegTrashCan />, text: "Trash" },
  { icon: <AiOutlineStop />, text: "Spam" },
];

const Sidebar = () => {
  const [selected, setSelected] = useState("Inbox");
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((store) => store.app);

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen w-[240px]
          bg-gradient-to-b from-sky-50 to-white
          border-r border-sky-100
          shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        {/* Mobile Header Close */}
        <div className="md:hidden flex justify-between items-center px-4 py-3 border-b">
          <span className="font-semibold text-sky-700">Menu</span>
          <IoClose size={22} onClick={() => dispatch(setSidebarOpen(false))} />
        </div>

        {/*  COMPOSE BUTTON AT TOP */}
        <div className="px-4 pt-6">
          <button
            onClick={() => dispatch(setOpen(true))}
            className="
              w-full flex items-center justify-center gap-3
              bg-gradient-to-r from-sky-500 to-sky-400
              text-white font-semibold
              py-3 rounded-xl
              shadow-lg
              hover:shadow-sky-300/60
              hover:scale-[1.02]
              transition-all
            "
          >
            <LuPencil size={20} />
            Compose
          </button>
        </div>

        {/*  NAV SECTIONS */}
        <div className="mt-8 px-3 space-y-2 flex-1">
          {sidebarItems.map((item) => (
            <div
              key={item.text}
              onClick={() => setSelected(item.text)}
              className={`
                flex items-center gap-4 px-4 py-2.5 rounded-xl
                cursor-pointer transition-all duration-200
                ${
                  selected === item.text
                    ? "bg-sky-100 text-sky-700 shadow-sm"
                    : "text-slate-600 hover:bg-sky-50 hover:text-sky-700"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
