import { useState } from "react";
import PasswordForm from "../components/PasswordForm";

export default function Home() {
  const [result, setResult] = useState("");

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
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Password Generator</h1>
      <PasswordForm onGenerate={handleGenerate} />
    </main>
  );
}
