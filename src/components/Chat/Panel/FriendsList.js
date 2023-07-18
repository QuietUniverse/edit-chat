import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./../../../firebase";
import { useSelector } from "react-redux";

import FriendChat from "./FriendChat";

import styles from "./FriendsList.module.css";

function FriendsList() {
  const [chats, setChats] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  return (
    <ul className={styles.layout}>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <FriendChat
            key={chat[0]}
            friendDetails={chat}
            onSetActive={() => setIsActive(chat[0])}
            isActive={isActive}
          />
        ))}
    </ul>
  );
}

export default FriendsList;
