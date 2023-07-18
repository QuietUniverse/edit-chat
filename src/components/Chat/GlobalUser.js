import { useSelector } from "react-redux";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./../../firebase";

import styles from "./GlobalUser.module.css";

function GlobalUser({
  photoURL,
  displayName,
  uid,
  setAddNewChatIsOpen,
  setIsLoading,
}) {
  const currentUser = useSelector((state) => state.user.currentUser);

  async function handleSelect() {
    setIsLoading(true);

    // check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > uid ? currentUser.uid + uid : uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid,
            displayName,
            photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}

    setAddNewChatIsOpen(false);
    setIsLoading(false);
  }

  return (
    <li className={styles.user} onClick={handleSelect}>
      <img src={photoURL} alt="User avatar" />
      <span>{displayName}</span>
    </li>
  );
}

export default GlobalUser;
