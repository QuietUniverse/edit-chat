import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import GlobalUser from "./GlobalUser";

import styles from "./AllUsersList.module.css";

function AllUsersList({ setAddNewChatIsOpen, setIsLoading }) {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const requestUsers = async function () {
      setIsLoading(true);
      const q = query(
        collection(db, "users"),
        where("uid", "!=", currentUser.uid)
      );
      const querySnapShot = await getDocs(q);
      const usersArr = querySnapShot.docs.map((doc) => {
        return {
          displayName: doc.data().displayName,
          uid: doc.data().uid,
          photoURL: doc.data().photoURL,
        };
      });
      setAllUsers(usersArr);
      setIsLoading(false);
    };
    requestUsers();
  }, [currentUser.uid, setIsLoading]);

  return (
    <ul className={styles[`user-list`]}>
      {allUsers.map((user) => (
        <GlobalUser
          photoURL={user.photoURL}
          displayName={user.displayName}
          key={crypto.randomUUID()}
          uid={user.uid}
          setAddNewChatIsOpen={setAddNewChatIsOpen}
          setIsLoading={setIsLoading}
        />
      ))}
    </ul>
  );
}

export default AllUsersList;
