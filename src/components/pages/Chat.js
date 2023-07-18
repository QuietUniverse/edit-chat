import Card from "../UI/Card";
import SidePanel from "../Chat/Panel/SidePanel";
import User from "../Chat/Panel/User";
import { useState } from "react";

import FriendsList from "./../Chat/Panel/FriendsList";
import NewChatButton from "../Chat/Panel/NewChatButton";
import ChatWindow from "../Chat/ChatWindow";
import Modal from "../Chat/Modal";

import styles from "./Chat.module.css";

function Chat() {
  const [sidePanelIsCollapsed, setSidePanelIsCollapsed] = useState(true);
  const [addNewChatIsOpen, setAddNewChatIsOpen] = useState(false);
  const mainIsCentered = sidePanelIsCollapsed ? true : false;

  return (
    <div className={styles.layout}>
      <SidePanel sidePanelIsCollapsed={sidePanelIsCollapsed}>
        <User />
        <FriendsList />
        <NewChatButton setAddNewChatIsOpen={setAddNewChatIsOpen} />
      </SidePanel>
      <main className={mainIsCentered ? styles[`centre-main`] : ""}>
        <Card className={styles.container}>
          <ChatWindow
            onCollapsePanel={setSidePanelIsCollapsed}
            sidePanelIsCollapsed={sidePanelIsCollapsed}
          />
        </Card>
      </main>
      {addNewChatIsOpen && <Modal setAddNewChatIsOpen={setAddNewChatIsOpen} />}
    </div>
  );
}

export default Chat;
