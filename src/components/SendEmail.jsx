import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/appSlice";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

const SendEmail = () => {
  const dispatch = useDispatch();
  const { open, authUser } = useSelector((store) => store.app);

  const [formData, setFormData] = useState({
    recipients: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const changeEventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!authUser?.email) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "emails"), {
        from: authUser.email,
        to: formData.recipients,
        subject: formData.subject,
        message: formData.message,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setLoading(false);

      // ✅ Close instantly after success
      setTimeout(() => {
        dispatch(setOpen(false));
        setSuccess(false);
        setFormData({ recipients: "", subject: "", message: "" });
      }, 600);
    } catch (err) {
      console.error("Send mail error:", err);
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#dbeafe]/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Glass Compose Card */}
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            className="w-full max-w-xl rounded-2xl bg-white/70 backdrop-blur-xl shadow-2xl border border-white/40 p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sky-700 text-lg">
               SkyMail
              </h2>

              <button
                onClick={() => dispatch(setOpen(false))}
                className="p-2 rounded-full hover:bg-sky-100"
              >
                <RxCross2 size={18} />
              </button>
            </div>

            {/*  SUCCESS UI */}
            {success ? (
              <div className="text-center py-10">
                <p className="text-green-600 font-semibold text-lg">
                  ✅ Email Sent Successfully!
                </p>
              </div>
            ) : (
              <form onSubmit={submitHandler} className="flex flex-col gap-3">
                <input
                  name="recipients"
                  value={formData.recipients}
                  onChange={changeEventHandler}
                  type="email"
                  placeholder="To"
                  required
                  className="bg-transparent border-b border-sky-200 py-2 text-sm outline-none focus:border-sky-500"
                />

                <input
                  name="subject"
                  value={formData.subject}
                  onChange={changeEventHandler}
                  type="text"
                  placeholder="Subject"
                  className="bg-transparent border-b border-sky-200 py-2 text-sm outline-none focus:border-sky-500"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={changeEventHandler}
                  rows="7"
                  placeholder="Write your message..."
                  className="bg-transparent border-b border-sky-200 py-2 text-sm outline-none resize-none focus:border-sky-500"
                />

                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-sm shadow-md transition-all disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send ✈️"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SendEmail;









