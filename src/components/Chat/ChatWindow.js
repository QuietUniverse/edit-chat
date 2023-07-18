import { useSelector } from "react-redux";

import Conversation from "./Conversation";
import TypeMessage from "./TypeMessage";

import styles from "./ChatWindow.module.css";

function ChatWindow({ onCollapsePanel, sidePanelIsCollapsed }) {
  const chatOpen = useSelector((state) => state.activeChat.chatId);

  return (
    <div className={styles.layout}>
      <Conversation
        onCollapsePanel={onCollapsePanel}
        sidePanelIsCollapsed={sidePanelIsCollapsed}
      />
      {chatOpen && <TypeMessage />}
    </div>
  );
}

export default ChatWindow;
