import RoundButton from "../../UI/RoundButton";

import styles from "./NewChatButton.module.css";

function NewChatButton({ setAddNewChatIsOpen }) {
  return (
    <RoundButton
      svgLink="/sprite.svg#add"
      classNames={styles.layout}
      onClick={() => setAddNewChatIsOpen(true)}
    />
  );
}

export default NewChatButton;
