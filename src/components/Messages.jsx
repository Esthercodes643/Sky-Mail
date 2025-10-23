import React, { useEffect, useState } from "react";
import Message from "./Message";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../redux/appSlice";

const Messages = () => {
  const { searchText, emails, authUser } = useSelector((store) => store.app);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser?.email) return;

    const q = query(collection(db, "emails"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(
          (email) =>
            email.to === authUser.email || email.from === authUser.email
        );

      dispatch(setEmails(allEmails));
    });

    return () => unsubscribe();
  }, [dispatch, authUser]);

  useEffect(() => {
    if (!emails) return;

    const lowerSearch = searchText.toLowerCase();
    const filtered = emails.filter(
      (email) =>
        email.subject?.toLowerCase().includes(lowerSearch) ||
        email.to?.toLowerCase().includes(lowerSearch) ||
        email.from?.toLowerCase().includes(lowerSearch) ||
        email.message?.toLowerCase().includes(lowerSearch)
    );
    setFilteredEmails(filtered);
  }, [searchText, emails]);

  return (
    <div className="p-2">
      {filteredEmails && filteredEmails.length > 0 ? (
        filteredEmails.map((email) => <Message key={email.id} email={email} />)
      ) : (
        <p className="text-center text-gray-500 mt-10">No messages found.</p>
      )}
    </div>
  );
};

export default Messages;













