import React, { useState } from "react";
import styles from "../../styles/Evernote.module.scss";
import { app, database } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function NoteOperations() {
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");

  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };

  const db = collection(database, "notes");

  return (
    <>
      <div className={styles.btnContainer}>
        <button className={styles.button} onClick={inputToggle}>
          Add Note
        </button>
      </div>
      {isInputVisible ? (
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder="Enter the title"
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <button className={styles.saveBtn}>Save Note</button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
