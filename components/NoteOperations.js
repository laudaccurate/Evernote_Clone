import React, { useState, useEffect } from "react";
import { app, database } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import dynamic from "next/dynamic";
import NoteList from "./NoteList";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const db = collection(database, "notes");

export default function NoteOperation({
  getSingleNote,
  notes,
  getNotes,
  load,
}) {
  const [isInputVisible, setInputVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");

  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };

  const addDesc = (value) => {
    setNoteDesc(value);
  };

  const saveNote = () => {
    setLoading(true);
    addDoc(db, { noteTitle, noteDesc }).then(() => {
      setNoteTitle("");
      setNoteDesc("");
      getNotes();
      setLoading(false);
    });
  };

  return (
    <>
      <div className="max-w-md">
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
            <QuillNoSSRWrapper
              onChange={addDesc}
              value={noteDesc}
              theme="snow"
            />
          </div>

          {loading ? (
            <button
              disabled
              type="button"
              class="py-2.5 px-5 mr-2 text-sm font-medium text-[#771B1B] bg-white rounded-sm border border-gray-200 hover:bg-gray-100 hover:text-[#771B1B] focus:z-10 focus:ring-2 focus:ring-[#771B1B] focus:text-[#771B1B] inline-flex items-center"
            >
              <svg
                role="status"
                className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#771B1B"
                />
              </svg>
              Loading...
            </button>
          ) : (
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
          )}
        </div>
      ) : (
        <></>
      )}

      <div>
        {load ? (
          <img src="/loader.gif" alt="loader" className="max-w-md" />
        ) : (
          <NoteList notesArray={notes} getSingleNote={getSingleNote} />
        )}
      </div>
    </>
  );
}
