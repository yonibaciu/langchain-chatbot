import Image from "next/image";
import UrlLoader from "@/app/components/url_loader";
import FlaskCheck from "@/app/components/flask_check";
import Chat from "@/app/components/chat/chat";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {/* @ts-expect-error Server Component */}
      <FlaskCheck />
      <UrlLoader />
      <Chat />
    </main>
  );
}
