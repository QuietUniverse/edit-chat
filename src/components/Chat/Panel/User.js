import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/slices/user";
import { signOut } from "firebase/auth";
import { auth } from "./../../../firebase";
import { activeChatActions } from "../../../store/slices/active-chat";

import styles from "./User.module.css";
import { uiActions } from "../../../store/slices/ui";

function User() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className={styles.layout}>
      <img src={currentUser.photoURL} alt="yourDisplayImage" />
      <span>{currentUser.displayName}</span>
      <button
        type="button"
        className={styles.logout}
        onClick={() => {
          signOut(auth);
          dispatch(userActions.setCurrentUser({ currentUser: null }));
          dispatch(uiActions.resetInput());
          dispatch(activeChatActions.logoutChat());
        }}
      >
        <svg height="60%" width="60%" viewBox="0 0 24 24">
          <use href="/sprite.svg#logout" />
        </svg>
      </button>
    </div>
  );
}

export default User;
