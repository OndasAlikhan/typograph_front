export type TypingResultResponse = {
  id: number;
  duration: number;
  accuracy: number;
  wpm: number;
  user_name: string;
  race_id: number;
  created_at: string;
};

export type Letter = {
  char: string;
  color: string;
};