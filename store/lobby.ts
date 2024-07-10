import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useLobbyStore = defineStore({
  id: "myLobbyStore",
  state: () => ({}),
  actions: {
    async createLobby(name: string) {
      const { apiBase } = useApi();
      const { me } = useAuthStore();
      try {
        const { data }: any = await $fetch(`${apiBase.value}/lobbies`, {
          method: "post",
          body: {
            admin_user_id: me?.id,
            name: name,
            users: [me?.id],
          },
        });
        console.log("data", data);
        navigateTo(`/lobbies/${data.id}`);
        data.id;
      } catch (err) {
        console.error("Error creating lobby", err);
      }
    },
    async enterLobby(lobby_id: number) {
      const { apiBase } = useApi();
      const { me } = useAuthStore();
      try {
        const resp = await $fetch(`${apiBase.value}/lobbies/enter`, {
          method: "post",
          body: {
            lobby_id,
            user_id: me?.id,
          },
        });
        console.log("resp", resp);
      } catch (err) {
        console.error("Error entering lobby", err);
      }
    },
    async leaveLobby(lobby_id: number) {
      const { apiBase } = useApi();
      const { me } = useAuthStore();
      try {
        const resp = await $fetch(`${apiBase.value}/lobbies/leave`, {
          method: "post",
          body: {
            lobby_id,
            user_id: me?.id,
          },
        });
        console.log("resp", resp);
      } catch (err) {
        console.error("Error leaving lobby", err);
      }
    },
    async startLobby() {
      console.log("starting");
    },
  },
});
