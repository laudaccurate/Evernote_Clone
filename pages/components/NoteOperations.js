import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app, database } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const db = collection(database, "notes");
export default function NoteOperations() {
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");

  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };

  const addDesc = (value) => {
    setNoteDesc(value);
  };

  const saveNote = () => {
    addDoc(db, { noteTitle, noteDesc }).then(() => {
      setNoteTitle("");
      setNoteDesc("");
    });
  };

  return (
    <>
      <div className="">
        <button className="" onClick={inputToggle}>
          Add Note
        </button>
      </div>
      {isInputVisible ? (
        <div className="">
          <input
            className=""
            placeholder="Enter the title"
            onChange={(e) => setNoteTitle(e.target.value)}
            value={noteTitle}
          />
          <div className="">
            <ReactQuill onChange={addDesc} value={noteDesc} />
          </div>
          <button className="" onClick={saveNote}>
            Save Note
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
