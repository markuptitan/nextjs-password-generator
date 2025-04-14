import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

type Props = {
  password: string;
  strength: string;
};

export default function PasswordOutput({ password, strength }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(password);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = password;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");
        if (!successful) throw new Error("Fallback copy failed");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Copy failed:", err);
      alert("Copying failed. Please try manually.");
    }
  };

  const strengthColor = {
    "very weak": "text-weak",
    weak: "text-weak",
    medium: "text-medium",
    strong: "text-strong",
    "very strong": "text-strong",
  }[strength];

  return (
    <div className="flex flex-col gap-5 bg-dark text-light p-6 rounded-2xl shadow-lg w-full max-w-md mt-4">
      <div className="flex justify-between items-center">
        <p className={`text-xl font-mono break-words ${strengthColor}`}>
          {password}
        </p>
        {password && (
          <Button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-accent text-white px-3 py-1 rounded hover:bg-accent-hover transition"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {!copied}
          </Button>
        )}
      </div>

      <div className="text-sm">
        <span className="font-medium">Strength:</span>{" "}
        <span className={`${strengthColor} capitalize`}>{strength}</span>
      </div>
    </div>
  );
}
