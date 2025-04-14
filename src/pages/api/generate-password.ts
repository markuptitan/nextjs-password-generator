// pages/api/generate-password.ts
import type { NextApiRequest, NextApiResponse } from "next";

const generatePassword = ({
  length,
  useSpecialChars = true,
  useNumbers = true,
  useUppercase = true,
}: {
  length: number;
  useSpecialChars?: boolean;
  useNumbers?: boolean;
  useUppercase?: boolean;
}) => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
  let characters = lowercaseChars;
  if (useUppercase) characters += uppercaseChars;
  if (useNumbers) characters += numberChars;
  if (useSpecialChars) characters += specialChars;
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};

const calculatePasswordStrength = (password: string) => {
  const lengthCriteria = password.length >= 8;
  const uppercaseCriteria = /[A-Z]/.test(password);
  const lowercaseCriteria = /[a-z]/.test(password);
  const numberCriteria = /\d/.test(password);
  const specialCharCriteria = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);
  const criteriaMet = [
    lengthCriteria,
    uppercaseCriteria,
    lowercaseCriteria,
    numberCriteria,
    specialCharCriteria,
  ].filter(Boolean).length;
  if (criteriaMet === 5) return "very strong";
  if (criteriaMet === 4) return "strong";
  if (criteriaMet === 3) return "medium";
  if (criteriaMet === 2) return "weak";
  return "very Weak";
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  if (method !== "POST" && method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = method === "GET" ? query : body;

  const length = Array.isArray(data.length) ? data.length[0] : data.length;

  const { useSpecialChars, useNumbers, useUppercase } = req.body;

  const parsedLength = parseInt(length, 10);

  if (isNaN(parsedLength) || parsedLength < 4 || parsedLength > 20) {
    return res
      .status(400)
      .json({ error: "Password length must be between 4 and 20 characters." });
  }

  const password = generatePassword({
    length: parsedLength,
    useSpecialChars,
    useNumbers,
    useUppercase,
  });
  const strength = calculatePasswordStrength(password);

  return res.status(200).json({ password, strength });
};

export default handler;
