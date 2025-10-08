import React, { useState } from "react";
import Avatar from "react-avatar";
import { IoLogOutOutline } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const ProfileMenu = ({ authUser, signOutHandler }) => {


    const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  // Fallback values if authUser is null
  const userName = authUser?.displayName || "Esther D";
  const userEmail = authUser?.email || "e7711708@gmail.com";
  const userPic = authUser?.photoURL || "/src/images/manual-pic.png"; // manual pic

  return (
    <div className="relative">
      {/* Avatar */}
      <div onClick={toggleMenu} className="cursor-pointer">
        <Avatar
          name={userName}
          size="40"
          round={true}
          src={userPic}
        />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-2xl border border-gray-200 p-4 z-50">
          <div className="flex flex-col items-center">
            <Avatar
              name={userName}
              size="60"
              round={true}
              src={userPic}
            />
            <h3 className="font-semibold mt-2">{userName}</h3>
            <p className="text-sm text-gray-600">{userEmail}</p>
            <button className="mt-3 text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
              <MdManageAccounts /> Manage your Google Account
            </button>
          </div>

          <hr className="my-3" />

          <button className="w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
            <FaPlus /> Add another account
          </button>

          <button
            onClick={signOutHandler}
            className="w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-red-600"
          >
            <IoLogOutOutline /> Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

