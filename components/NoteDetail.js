import React, { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

// const db = collection(database, "notes");
export default function NoteDetail({ noteId }) {
  const [note, setNote] = useState({ id: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");

  const getNoteFromId = async () => {
    console.log(noteId);
    if (noteId) {
      const singleNote = doc(database, "notes", noteId);
      const data = await getDoc(singleNote);
      setNote({ ...data.data(), id: data.id });
    }
  };

  useEffect(() => {
    getNoteFromId();
  }, [noteId]);

  const editNote = (id) => {
    setLoading(true);
    const collectionById = doc(database, "notes", id);

    updateDoc(collectionById, {
      noteTitle,
      noteDesc,
    }).then(() => {
      setLoading(false);
      window.location.reload();
      getNoteFromId();
    });
  };

  const getEditData = () => {
    setIsEditing(true);
    setNoteTitle(note.noteTitle);
    setNoteDesc(note.noteDesc);
  };

  const deleteNote = () => {};

  return (
    <>
      {noteId ? (
        <div>
          <div className="inline-flex items-center my-6">
            <button
              className="mr-4 border border-gray-200 text-gray-900 bg-white hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center"
              onClick={getEditData}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit
            </button>
            <button
              className="mx-4 text-white bg-[#771B1B] hover:bg-[#7E1B1B] focus:ring-4 focus:ring-[#611B1B] font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center"
              onClick={deleteNote}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mx-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>

          {isEditing ? (
            <div className="">
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
                  onChange={setNoteDesc}
                  value={noteDesc}
                  theme="snow"
                />
              </div>
              {loading ? (
                <button
                  disabled
                  type="button"
                  class="py-2.5 px-5 mt-1 w-full text-sm font-medium text-[#771B1B] bg-white rounded-sm border border-gray-200 hover:bg-gray-100 hover:text-[#771B1B] focus:z-10 focus:ring-2 focus:ring-[#771B1B] focus:text-[#771B1B] inline-flex items-center justify-center"
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
                  className="mt-1 w-full text-white bg-[#771B1B] hover:bg-[#7E1B1B] focus:ring-4 focus:ring-[#611B1B] font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center justify-center"
                  onClick={() => editNote(note.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Update Note
                </button>
              )}
            </div>
          ) : (
            <>
              <h2 className="text-md font-semibold text-gray-800 truncate dark:text-gray-300">
                {note.noteTitle}
              </h2>
              <div
                className="my-4 text-sm font-extralight text-gray-500 truncate dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: note.noteDesc }}
              ></div>
            </>
          )}
        </div>
      ) : (
        <img src="/nodata.gif" alt="nodata" className="max-w-md" />
      )}
    </>
  );
}
