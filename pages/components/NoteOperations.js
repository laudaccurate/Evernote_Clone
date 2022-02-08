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
        <button
          className="mt-10 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
          onClick={inputToggle}
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Add Note
        </button>
      </div>
      {isInputVisible ? (
        <div class="my-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Note Title
          </label>
          <input
            type="title"
            id="title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="New notes from my thoughts"
            required
            onChange={(e) => setNoteTitle(e.target.value)}
            value={noteTitle}
          />
          <div className="my-4">
            <ReactQuill onChange={addDesc} value={noteDesc} />
          </div>

          <button className="" onClick={saveNote}>
            Save Note
          </button>
        </div>
      ) : (
        // <div className="">
        //   <input
        //     className=""
        //     placeholder="Enter the title"
        //     onChange={(e) => setNoteTitle(e.target.value)}
        //     value={noteTitle}
        //   />
        //   <div className="">
        //     <ReactQuill onChange={addDesc} value={noteDesc} />
        //   </div>
        //   <button className="" onClick={saveNote}>
        //     Save Note
        //   </button>
        // </div>
        <></>
      )}
    </>
  );
}
