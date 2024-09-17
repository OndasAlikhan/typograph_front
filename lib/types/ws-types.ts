import type { Letter } from "./typing-result-types";
import type { User } from "~/lib/types/auth-types";

export const wsOutMessageTypes = {
  CONNECTION: "CONNECTION",
  ENTER_LOBBY: "ENTER_LOBBY",
  LEAVE_LOBBY: "LEAVE_LOBBY",
  UPDATE_TEXT: "UPDATE_TEXT",
  FINISH: "FINISH",
};

export const wsReceiveMessageTypes = {
  UPDATE_USERS: "update_users",
  UPDATE_STATUS: "update_status",
  UPDATE_TEXT: "update_text",
  FINISH: "finish",
};

export type MessageData = {
  status: string;
  texts: Record<number, Letter[][]>;
  users: User[];
  users_done: Record<number, boolean>;
};

export type Message = {
  type: string;
  data: MessageData;
};

export type TextMessageOut = {
  lobbyId: number;
  text: Letter[][];
};

export type FinishMessageOut = {
  lobbyId: number;
};
