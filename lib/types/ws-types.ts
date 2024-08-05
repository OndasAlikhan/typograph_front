export const wsOutMessageTypes = {
  CONNECTION: "CONNECTION",
  ENTER_LOBBY: "ENTER_LOBBY",
  LEAVE_LOBBY: "LEAVE_LOBBY",
  BROADCAST_IN_ROOM: "BROADCAST_IN_ROOM",
};

export const wsReceiveMessageTypes = {
  UPDATE_USERS: "update_users",
  UPDATE_STATUS: "update_status",
};

export type Message = {
  type: string;
  data: any;
};
