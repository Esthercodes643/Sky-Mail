import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/appSlice";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

const SendEmail = () => {
  const [formData, setFormData] = useState({
    recipients: "",
    subject: "",
    message: "",
  });

  const { open, authUser } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!authUser?.email) {
      alert("Please log in to send an email.");
      return;
    }

    await addDoc(collection(db, "emails"), {
      from: authUser.email,
      to: formData.recipients,
      subject: formData.subject,
      message: formData.message,
      createdAt: serverTimestamp(),
    });

    setFormData({ recipients: "", subject: "", message: "" });
    dispatch(setOpen(false));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-center items-end sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 20,
            }}
            className="bg-white w-full sm:max-w-3xl sm:rounded-t-md sm:shadow-xl sm:shadow-slate-600 
              sm:mx-0 mx-2 sm:mb-0 mb-0 rounded-t-2xl flex flex-col max-h-[90vh] sm:max-h-none overflow-hidden"
          >
            {/* Header */}
            <div className="flex px-3 py-2 bg-[#F2F6FC] items-center justify-between rounded-t-md">
              <h1 className="font-medium">New Message</h1>
              <div
                onClick={() => dispatch(setOpen(false))}
                className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
              >
                <RxCross2 />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submitHandler} className="flex flex-col p-3 gap-2">
              <input
                onChange={changeEventHandler}
                name="recipients"
                value={formData.recipients}
                type="email"
                placeholder="Recipient"
                className="outline-none py-1 border-b border-gray-200 text-sm"
                required
              />
              <input
                onChange={changeEventHandler}
                name="subject"
                value={formData.subject}
                type="text"
                placeholder="Subject"
                className="outline-none py-1 border-b border-gray-200 text-sm"
              />
              <textarea
                onChange={changeEventHandler}
                name="message"
                value={formData.message}
                rows="10"
                placeholder="Write your message..."
                className="outline-none py-1 resize-none border-b border-gray-200 text-sm"
              ></textarea>

              <div className="flex justify-between items-center mt-2">
                <button
                  type="submit"
                  className="bg-[#0B57D0] rounded-full px-6 py-2 text-white font-medium hover:bg-[#084ab1] transition-all"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SendEmail;

