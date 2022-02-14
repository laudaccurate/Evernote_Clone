import React, { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// const db = collection(database, "notes");
export default function NoteDetail({ noteId }) {
  const [note, setNote] = useState({ id: "" });

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

  return (
    <>
      {noteId ? (
        <div>
          <h2 className="text-md font-semibold text-gray-800 truncate dark:text-gray-300">
            {note.noteTitle}
          </h2>
          <div
            className="text-sm font-extralight text-gray-500 truncate dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: note.noteDesc }}
          ></div>
        </div>
      ) : (
        <img src="/nodata.gif" alt="nodata" className="max-w-md" />
      )}
    </>
  );
}
