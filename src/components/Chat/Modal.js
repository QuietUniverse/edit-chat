import RoundButton from "../UI/RoundButton";
import AllUsersList from "./AllUsersList";
import styles from "./Modal.module.css";
import Loading from "../Loading";

import { useState } from "react";

function Modal({ setAddNewChatIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.backdrop}>
      <div className={styles.users}>
        <div className={styles[`scroll-div`]}>
          {isLoading && (
            <Loading
              inlineStyles={{
                height: "6.5rem",
                width: "6.5rem",
                top: "50%",
                left: "45%",
                transform: "translateY(-50%) translateX(-50%)",
                borderRadius: "0.4rem",
              }}
            />
          )}
          <AllUsersList
            setAddNewChatIsOpen={setAddNewChatIsOpen}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>
        <div className={styles.separator}></div>
        <div role="button" className={styles.group}>
          <svg height="100%" width="100%">
            <use href="/sprite.svg#group-chat" />
          </svg>
        </div>
      </div>
      <RoundButton
        svgLink="/sprite.svg#add"
        classNames={styles.close}
        onClick={() => setAddNewChatIsOpen(false)}
      />
    </div>
  );
}

export default Modal;
