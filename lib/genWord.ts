import * as wordsJson from "./english_1k.json";

export const generateWords = (length: number): string => {
  const result = [];
  for (let i = 0; i < length; i++) {
    const randomWord =
      wordsJson.words[Math.floor(Math.random() * wordsJson.words.length)];
    result.push(randomWord);
  }
  return result.join(" ");
};
