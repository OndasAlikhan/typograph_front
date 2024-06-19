import { wsMessageTypes } from "~/lib/types/ws-types";
import { useAuthStore } from "~/store/auth";

export const useWsStore = defineStore({
  id: "wsStore",
  state: (): { connection: WebSocket; message: any } => ({
    connection: null,
    message: null,
  }),
  actions: {
    async connect() {
      const { me } = useAuthStore();
      const socket = new WebSocket("ws://localhost:8080/api/v1/ws");
      socket.onopen = () => {
        if (me) {
          socket.send(
            JSON.stringify({
              type: wsMessageTypes.CONNECTION,
              user_id: me.id,
            }),
          );
        }
        console.log("success ws connection");
        this.connection = socket;
      };
      socket.onmessage = (event) => {
        console.log("Message from server:", event.data);
        this.onSocketMessage(event.data);
      };
      socket.onerror = (event) => {
        console.error("WebSocket error:", event);
      };
    },
    onSocketMessage(message: any) {
      this.message = message;
    },
    enterRoom(lobbyId: number) {
      this.connection.send(
        JSON.stringify({
          type: wsMessageTypes.ENTER_LOBBY,
          user_id: me.id,
          lobby_id: lobbyId,
        }),
      );
    },
    leaveRoom(lobbyId: number) {
      this.connection.send(
        JSON.stringify({
          type: wsMessageTypes.LEAVE_LOBBY,
          user_id: me.id,
          lobby_id: lobbyId,
        }),
      );
    },
  },
});
