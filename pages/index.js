import Head from "next/head";
import Image from "next/image";
import NoteOperations from "./components/NoteOperations";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Evernote Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="">
          <div className="">
            <NoteOperations />
          </div>
          <div className="">Right</div>
        </div>
      </main>
    </div>
  );
}
