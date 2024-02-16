import UrlLoader from "@/app/components/url_loader";
import FlaskCheck from "@/app/components/flask_check";
import Chat from "@/app/components/chat/chat";
import { Suspense } from "react";

export default async function Home() {
  const flaskLoadingFallback = () => {
    return (
      <div className="flex items-center mb-6">
        Checking Flask server...
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <h1 className="text-2xl">RAG demonstation</h1>
      <p className="m-5">
        Retrieval Augmented Generation - Enter a webpage and chat with it's
        content!
      </p>
      <Suspense fallback={flaskLoadingFallback()}>
        {/* @ts-expect-error Server Component */}
        <FlaskCheck />
      </Suspense>
      <UrlLoader />
      <Chat />
    </main>
  );
}
