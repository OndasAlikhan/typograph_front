import { wsMessageTypes, type Message } from "~/lib/types/ws-types";
import { useAuthStore } from "~/store/auth";

export const useWsStore = defineStore({
  id: "wsStore",
  state: (): { connection?: WebSocket; message?: Message } => ({
    connection: undefined,
    message: undefined,
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
        this.onSocketMessage(JSON.parse(event.data));
      };
      socket.onerror = (event) => {
        console.error("WebSocket error:", event);
      };
    },
    onSocketMessage(message: Message) {
      console.log("Message from server:", message);
      this.message = message;
    },
  },
});
