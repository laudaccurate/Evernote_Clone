import React, { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const db = collection(database, "notes");
export default function NoteList() {
  const [notesArray, setNotesArray] = useState([]);

  const getNotes = () => {
    getDocs(db).then((data) => {
      setNotesArray(
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
      <div className="p-4 max-w-md bg-white rounded-sm border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Recent Notes
          </h3>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {notesArray.map((note, i) => {
              return (
                <li key={note?.noteTitle || i} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {note?.noteTitle}
                      </p>
                      <p
                        className="text-sm text-gray-500 truncate dark:text-gray-400"
                        dangerouslySetInnerHTML={{ __html: note.noteDesc }}
                      ></p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {i + 1}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
