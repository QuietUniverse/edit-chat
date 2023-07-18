import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "./../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ContentEditable from "react-contenteditable";

import RoundButton from "../UI/RoundButton";
import Otherformatters from "./OtherFormatters";
import SelectedFormatter from "../Formatters/SelectedFormatter";

import { uiActions } from "../../store/slices/ui";

import styles from "./TypeMessage.module.css";

function TypeMessage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const activeChat = useSelector((state) => state.activeChat);
  const inputText = useSelector((state) => state.ui.inputText);
  const dispatch = useDispatch();
  const textAreaRef = useRef();

  const fileRef = useRef();

  async function handleSendMessage() {
    if (!activeChat.chatId) return;

    const file = fileRef.current.files[0];
    const stylizedText = textAreaRef.current.innerHTML;

    // Handle main Conversation
    if (file) {
      const storageRef = ref(storage, crypto.randomUUID());
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          //Set error here
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", activeChat.chatId), {
              messages: arrayUnion({
                id: crypto.randomUUID(),
                text: stylizedText,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                file: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", activeChat.chatId), {
        messages: arrayUnion({
          id: crypto.randomUUID(),
          text: stylizedText,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    // Handle SidePanel
    // Update for current user
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [activeChat.chatId + ".lastMessage"]: {
        text: inputText,
      },
      [activeChat.chatId + ".date"]: serverTimestamp(),
    });

    // Update for friend
    await updateDoc(doc(db, "userChats", activeChat.chatUser.uid), {
      [activeChat.chatId + ".lastMessage"]: {
        text: inputText,
      },
      [activeChat.chatId + ".date"]: serverTimestamp(),
    });

    dispatch(uiActions.setInput({ inputText: "" }));
    fileRef.current.value = "";
  }

  return (
    <div className={styles.layout}>
      <div className={styles[`type-container`]}>
        <div className={styles.container}>
          <Otherformatters />
          <ContentEditable
            className={styles[`message-input`]}
            onSelect={(e) =>
              dispatch(
                uiActions.setTextSelection({
                  selectionStart: e.target.selectionStart,
                  selectionEnd: e.target.selectionEnd,
                  isBackwards: e.target.isBackwards,
                })
              )
            }
            data-placeholder="Type your text here..."
            innerRef={textAreaRef}
            onChange={(e) => {
              dispatch(
                uiActions.setInput({
                  inputText: e.currentTarget.innerText,
                })
              );
            }}
            tagName="pre"
            disabled={false}
            html={SelectedFormatter(inputText)}
          />
          <div className={styles[`add-ons`]}>
            <div type="button" className={styles[`format-btn`]}>
              <input type="file" className={styles.file} ref={fileRef} />
              <svg height="80%" width="80%">
                <use href="/sprite.svg#add" />
              </svg>
            </div>

            <div className={styles[`extras-divider`]}></div>

            <div className={styles[`extras`]}>
              <div role="button">
                <svg height="100%" width="100%">
                  <use href="/sprite.svg#smiley" />
                </svg>
              </div>

              <div role="button">
                <svg height="100%" width="100%">
                  <use href="/sprite.svg#at" />
                </svg>
              </div>
            </div>

            <RoundButton
              classNames={styles.send}
              svgLink="/sprite.svg#send"
              viewBox="-2 0 26 24"
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypeMessage;
