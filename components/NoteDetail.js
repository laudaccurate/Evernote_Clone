import React, { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// const db = collection(database, "notes");
export default function NoteDetail({ noteId }) {
  const [note, setNote] = useState({});

  const getNoteFromId = async () => {
    if (noteId) {
      const singleNote = doc(database, "notes", noteId);
      const data = await getDoc(singleNote);
      console.log({ ...data.data(), id: data.id });
      setNote(data);
    }
  };

  useEffect(() => {
    getNoteFromId();
  }, [noteId]);

  return <div className="note">{note.id}</div>;
}
