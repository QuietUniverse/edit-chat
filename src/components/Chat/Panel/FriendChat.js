import { useDispatch } from "react-redux";
import { activeChatActions } from "../../../store/slices/active-chat";
import { uiActions } from "../../../store/slices/ui";

import styles from "./FriendChat.module.css";

function FriendChat({ friendDetails, isActive, onSetActive }) {
  const dispatch = useDispatch();

  async function handleChatSelect() {
    onSetActive();
    await dispatch(activeChatActions.logoutChat());
    await dispatch(uiActions.resetInput());
    dispatch(
      activeChatActions.setChat({
        chatUser: friendDetails[1].userInfo,
        chatId: friendDetails[0],
      })
    );
  }

  const classNames = `${styles.layout} ${
    isActive === friendDetails[0] ? styles[`layout--active`] : ""
  }`;

  return (
    <li className={classNames} onClick={handleChatSelect}>
      <img
        src={friendDetails[1].userInfo.photoURL}
        alt={friendDetails[1].userInfo.displayName}
      />
      <div>
        <span>{friendDetails[1].userInfo.displayName}</span>
        <p className={styles[`message-preview`]}>
          {friendDetails[1].lastMessage?.text.slice(0, 30)}
        </p>
      </div>
    </li>
  );
}

export default FriendChat;
