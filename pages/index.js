import Head from "next/head";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import NoteList from "../components/NoteList";
import NoteOperations from "../components/NoteOperations";
import { database } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import NoteDetail from "../components/NoteDetail";

const NoteOperation = dynamic(() => import(NoteOperation), { ssr: false });

const db = collection(database, "notes");

export default function Home() {
  const [notesList, setNotesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ID, setID] = useState("");

  const getNotes = () => {
    setLoading(true);
    getDocs(db).then((data) => {
      setNotesList(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
      setLoading(false);
    });
  };

  useEffect(() => {
    getNotes();
  }, []);

  const getSingleNote = (id) => {
    console.log(id);
    setID(id);
  };

  return (
    <div className="">
      <Head>
        <title>Evernote Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="lg:grid lg:grid-cols-2 lg:mx-6 py-6">
          <div className="mx-5 max-w-md">
            <NoteOperations
              notes={notesList}
              getSingleNote={getSingleNote}
              getNotes={getNotes}
              load={loading}
            />
          </div>
          <div className="mx-5 my-20">
            <NoteDetail noteId={ID} />
          </div>
        </div>
      </main>
    </div>
  );
}
