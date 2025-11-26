import React from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedMail } from "../redux/appSlice";
import { motion } from "framer-motion";

const formatTime = (timestamp) => {
  if (!timestamp?.seconds) return "";
  const date = new Date(timestamp.seconds * 1000);

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const Message = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openMail = () => {
    dispatch(setSelectedMail(email));
    navigate(`/mail/${email.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={openMail}
      className="
        flex items-center gap-3
        border-b border-gray-200 
        px-3 sm:px-4 py-2 sm:py-3 
        text-sm hover:cursor-pointer hover:bg-gray-50
      "
    >
      {/* Left icons */}
      <div className="flex items-center gap-2 flex-none text-gray-400">
        <MdCropSquare className="w-4 h-4" />
        <RiStarLine className="w-4 h-4" />
      </div>

      {/* Middle content (sender + message) */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 truncate">
          {email?.to}
        </p>
        <p className="text-gray-500 text-xs truncate">
          {email?.message}
        </p>
      </div>

      {/* Right time */}
      <div className="flex-none text-gray-400 text-xs">
        {formatTime(email?.createdAt)}
      </div>
    </motion.div>
  );
};

export default Message;


