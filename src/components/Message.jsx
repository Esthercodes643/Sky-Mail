import React, { useState } from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarLine, RiStarFill } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedMail } from "../redux/appSlice";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Message = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [starred, setStarred] = useState(email?.starred || false);
  const [showMenu, setShowMenu] = useState(false);

  const openMail = () => {
    dispatch(setSelectedMail(email));
    navigate(`/mail/${email.id}`);
  };

  const toggleStar = async (e) => {
    e.stopPropagation(); // prevent opening mail
    try {
      const emailRef = doc(db, "emails", email.id);
      await updateDoc(emailRef, { starred: !starred });
      setStarred(!starred);
    } catch (err) {
      console.error("Error updating star:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={openMail}
      className="flex items-start justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md relative"
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="flex-none text-gray-300">
          <MdCropSquare className="w-5 h-5" />
        </div>

        {/* Star toggle */}
        <div
          onClick={toggleStar}
          className="flex-none text-yellow-400 hover:scale-110 transition-transform"
        >
          {starred ? (
            <RiStarFill className="w-5 h-5" />
          ) : (
            <RiStarLine className="w-5 h-5 text-gray-400" />
          )}
        </div>

        <div>
          <h1 className="font-semibold text-gray-800">{email?.to}</h1>
        </div>
      </div>

      {/* Middle section (Message preview) */}
      <div className="flex-1 ml-4 text-gray-600 truncate">
        {email.message?.length > 130
          ? `${email.message.substring(0, 130)}...`
          : email.message}
      </div>

      {/* Right section (time + more menu) */}
      <div
        className="flex-none flex flex-col items-end text-gray-400 text-xs relative"
        onClick={(e) => e.stopPropagation()}
      >
        <p>{new Date(email?.createdAt?.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>

        {/* More options */}
        <BiDotsVerticalRounded
          className="w-5 h-5 mt-1 cursor-pointer hover:text-gray-600"
          onClick={() => setShowMenu(!showMenu)}
        />

        {showMenu && (
          <div className="absolute top-6 right-0 bg-white border shadow-md rounded-md text-sm text-gray-700 z-10">
            <button
              onClick={() => alert("Move to Trash (coming soon)")}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              Move to Trash
            </button>
            <button
              onClick={() => alert("Mark as Read (coming soon)")}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              Mark as Read
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Message;





