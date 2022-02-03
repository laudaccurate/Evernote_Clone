import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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

  const saveNote = () => {
    addDoc(db, { noteTitle, noteDesc }).then(() => {
      setNoteTitle("");
      setNoteDesc("");
    });

    console.log("=====");
  };

  const [noteDesc, setNoteDesc] = useState("");

  const addDesc = (value) => {
    setNoteDesc(value);
  };

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
            value={noteTitle}
          />
          <div className={styles.ReactQuill}>
            <ReactQuill onChange={addDesc} value={noteDesc} />
          </div>
          <button className={styles.saveBtn} onClick={saveNote}>
            Save Note
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
