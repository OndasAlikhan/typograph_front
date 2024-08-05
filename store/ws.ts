import { wsOutMessageTypes, wsReceiveMessageTypes, type Message } from "~/lib/types/ws-types";
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
              type: wsOutMessageTypes.CONNECTION,
              user_id: me.id,
            }),
          );
        }
        console.log("success ws connection");
        this.connection = socket;
      };
      socket.onmessage = (event) => {
        console.log("event.data", event.data);
        console.log("typeof event.data", typeof event.data);

        let msg = JSON.parse(event.data);
        try {
          console.log("msg", msg);
          console.log("typeof msg", typeof msg);

          this.onSocketMessage(msg);
        } catch (error) {
          console.error("Failed to parse message:", error);
        }
      };
      socket.onerror = (event) => {
        console.error("WebSocket error:", event);
      };
    },
    onSocketMessage(message: Message) {
      this.message = message;
    },
  },
});
