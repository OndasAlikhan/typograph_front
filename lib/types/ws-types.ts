export const wsMessageTypes = {
  CONNECTION: "CONNECTION",
  ENTER_LOBBY: "ENTER_LOBBY",
  LEAVE_LOBBY: "LEAVE_LOBBY",
  BROADCAST_IN_ROOM: "BROADCAST_IN_ROOM",
};

export const wsReceiveMessageTypes = {
  room_update: "room_update",
};

export type Message = {
  type: string;
  data: any;
};
