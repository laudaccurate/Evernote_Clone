import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app, database } from "../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

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

  const getNotes = () => {
    getDocs(db).then((data) => {
      console.log(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div className="">
        <button
          className="mt-10 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
          onClick={inputToggle}
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Add New Note
        </button>
      </div>
      {isInputVisible ? (
        <div className="my-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Note Title
          </label>
          <input
            type="title"
            id="title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="New notes from my thoughts"
            required
            onChange={(e) => setNoteTitle(e.target.value)}
            value={noteTitle}
          />
          <div className="my-4 rounded-sm">
            <ReactQuill onChange={addDesc} value={noteDesc} />
          </div>

          <button
            className="mt-2 text-white bg-[#771B1B] hover:bg-[#7E1B1B] focus:ring-4 focus:ring-[#611B1B] font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center"
            onClick={saveNote}
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              ></path>
            </svg>
            Save Note
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
