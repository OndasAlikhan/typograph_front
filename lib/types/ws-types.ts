import type { Letter } from "./typing-result-types";

export const wsOutMessageTypes = {
  CONNECTION: "CONNECTION",
  ENTER_LOBBY: "ENTER_LOBBY",
  LEAVE_LOBBY: "LEAVE_LOBBY",
  BROADCAST_IN_ROOM: "BROADCAST_IN_ROOM",
};

export const wsReceiveMessageTypes = {
  UPDATE_USERS: "update_users",
  UPDATE_STATUS: "update_status",
  UPDATE_TEXT: "update_text",
};

export type Message = {
  type: string;
  data: any;
};

export type TextMessageOut = {
  lobbyId: number;
  text: Letter[][];
};
