type PasswordOptions = {
  length: number;
  useUppercase: boolean;
  useNumbers: boolean;
  useSpecialChars: boolean;
};

type PasswordFormProps = {
  onGenerate: (options: PasswordOptions) => void;
};

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function PasswordForm({ onGenerate }: PasswordFormProps) {
  const [length, setLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecialChars, setUseSpecialChars] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ length, useUppercase, useNumbers, useSpecialChars });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-dark text-light p-6 rounded-2xl shadow-lg w-full max-w-md"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="length" className="text-light">
          Password Length
        </Label>
        <input
          id="length"
          type="number"
          value={length}
          min={4}
          max={32}
          onChange={(e) => setLength(Number(e.target.value))}
          className="bg-dark-soft text-light border border-accent rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="flex items-center space-x-3">
        <Checkbox
          id="uppercase"
          checked={useUppercase}
          onCheckedChange={(checked) => setUseUppercase(!!checked)}
          className="border border-accent rounded-md
    data-[state=checked]:bg-accent data-[state=checked]:text-white
    transition-all duration-150 ease-out
    data-[state=checked]:scale-100 data-[state=unchecked]:scale-95
    data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-80
    focus:ring-2 focus:ring-accent"
        />
        <Label htmlFor="uppercase" className="text-light">
          Use Uppercase
        </Label>
      </div>

      <div className="flex items-center space-x-3">
        <Checkbox
          id="numbers"
          checked={useNumbers}
          onCheckedChange={(checked) => setUseNumbers(!!checked)}
          className="border border-accent rounded-md
    data-[state=checked]:bg-accent data-[state=checked]:text-white
    transition-all duration-150 ease-out
    data-[state=checked]:scale-100 data-[state=unchecked]:scale-95
    data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-80
    focus:ring-2 focus:ring-accent"
        />
        <Label htmlFor="numbers" className="text-light">
          Use Numbers
        </Label>
      </div>

      <div className="flex items-center space-x-3">
        <Checkbox
          id="specialChars"
          checked={useSpecialChars}
          onCheckedChange={(checked) => setUseSpecialChars(!!checked)}
          className="border border-accent rounded-md
    data-[state=checked]:bg-accent data-[state=checked]:text-white
    transition-all duration-150 ease-out
    data-[state=checked]:scale-100 data-[state=unchecked]:scale-95
    data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-80
    focus:ring-2 focus:ring-accent"
        />
        <Label htmlFor="specialChars" className="text-light">
          Use Special Characters
        </Label>
      </div>

      <button
        type="submit"
        className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-hover transition-colors"
      >
        Generate Password
      </button>
    </form>
  );
}
