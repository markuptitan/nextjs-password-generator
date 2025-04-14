import { useState } from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordOutput from "../components/PasswordOutput";
import Head from "next/head";

export default function Home() {
  const [result, setResult] = useState("");
  const [strength, setStrength] = useState("");

  const handleGenerate = async (options: {
    length: number;
    useUppercase: boolean;
    useNumbers: boolean;
    useSpecialChars: boolean;
  }) => {
    const res = await fetch("/api/generate-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });

    const data = await res.json();
    setResult(data.password);
    setStrength(data.strength);
  };

  return (
    <>
      <Head>
        <title>Password Generator</title>
        <meta
          name="description"
          content="Generate strong, secure passwords with customizable options. Built using Next.js."
        />
        <meta
          name="keywords"
          content="password generator, secure password, Next.js app, JavaScript projects"
        />
        <meta name="author" content="Siyabonga Samson Lukhele" />
        <meta property="og:title" content="Password Generator" />
        <meta
          property="og:description"
          content="Generate strong, secure passwords instantly. Built with Next.js."
        />
        <meta property="og:image" content="/public/favicon-16x16.png" />
        <meta
          property="og:url"
          content="https://password-generator.markuptitan.site/"
        />
        <meta property="og:type" content="website" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Password Generator</h1>
        <PasswordForm onGenerate={handleGenerate} />
        <PasswordOutput password={result} strength={strength} />
      </main>
    </>
  );
}
