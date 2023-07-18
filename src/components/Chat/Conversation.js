import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";

import Message from "./Message";
import RoundButton from "../UI/RoundButton";

import styles from "./Conversation.module.css";

function Conversation({ onCollapsePanel, sidePanelIsCollapsed }) {
  const [messages, setMessages] = useState([]);
  const activeChat = useSelector((state) => state.activeChat);

  useEffect(() => {
    if (!activeChat.chatId) return;

    const unsub = onSnapshot(
      doc(db, "chats", activeChat.chatId),
      (doc) => doc.exists() && setMessages(doc.data().messages)
    );

    return () => {
      unsub();
    };
  }, [activeChat.chatId]);

  function handleSidePanelCollapse() {
    onCollapsePanel((prev) => !prev);
  }

  return (
    <>
      <div className={styles.layout}>
        <RoundButton
          svgLink="/sprite.svg#chevron"
          viewBox="-5 0 24 24"
          classNames={`${styles.collapse} ${
            !sidePanelIsCollapsed ? styles[`not-collapsed`] : ""
          }`}
          onClick={handleSidePanelCollapse}
        />
        {activeChat.chatId &&
          messages &&
          messages.map((m) => <Message key={m.id} message={m} />)}
      </div>
    </>
  );
}

export default Conversation;
