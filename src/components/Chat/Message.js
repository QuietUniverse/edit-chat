import { useSelector } from "react-redux";
import { Interweave } from "interweave";
import { useEffect, useRef } from "react";

import styles from "./Message.module.css";
import RoundButton from "../UI/RoundButton";

function Message({ message }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const messageRef = useRef();

  async function handleFileDownload() {
    //File download here
    console.log("Code for file downloads yet to be implemented")
  }

  useEffect(() => {
    messageRef.current.scrollIntoView();
  }, [message]);

  return (
    <div
      className={`${styles.message} ${
        message.senderId === currentUser.uid ? styles.you : ""
      }`}
      ref={messageRef}
    >
      <Interweave content={message.text} />
      {message.file && (
        <div className={styles[`file-download`]}>
          <RoundButton
            svgLink="/sprite.svg#download"
            height="100%"
            width="100%"
            viewBox="-5 -5 24 24"
            onClick={handleFileDownload}
          />
        </div>
      )}
    </div>
  );
}

export default Message;
