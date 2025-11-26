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

  //  FETCH EMAILS
  useEffect(() => {
    if (!authUser?.email) return;

    const q = query(collection(db, "emails"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      //  Only showing user related mails
      const userEmails = allEmails.filter(
        (email) =>
          email.to === authUser.email ||
          email.from === authUser.email
      );

      dispatch(setEmails(userEmails));
    });

    return () => unsubscribe();
  }, [dispatch, authUser]);

  //  FILTER EMAILS BASED ON SEARCH TEXT
  useEffect(() => {
    if (!emails) return;

    const lowerSearch = searchText.trim().toLowerCase();

    if (!lowerSearch) {
      setFilteredEmails(emails);
      return;
    }

    const filtered = emails.filter((email) => {
      const fromName = email.from?.toLowerCase() || "";
      const toName = email.to?.toLowerCase() || "";

      //  Check if the name starts with the search text
      return (
        fromName.startsWith(lowerSearch) ||
        toName.startsWith(lowerSearch)
      );
    });

    setFilteredEmails(filtered);
  }, [searchText, emails]);

  return (
    <div className="p-2">
      {filteredEmails.length > 0 ? (
        filteredEmails.map((email) => (
          <Message key={email.id} email={email} />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No matching users found.
        </p>
      )}
    </div>
  );
};

export default Messages;


