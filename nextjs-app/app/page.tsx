import Image from "next/image";
import UrlLoader from "@/app/components/url_loader";
import FlaskCheck from "@/app/components/flask_check";
import Chat from "@/app/components/chat/chat";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <h1 className="text-2xl">RAG demonstation</h1>
      <p className="m-5">
        Retrieval Augmented Generation - Enter a webpage and chat with it's content!
      </p>
      {/* @ts-expect-error Server Component */}
      <FlaskCheck />
      <UrlLoader />
      <Chat />
    </main>
  );
}
