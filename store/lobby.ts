import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useLobbyStore = defineStore({
  id: "myLobbyStore",
  state: () => ({}),
  actions: {
    async createLobby() {
      const { apiBase } = useApi();
      const { me } = useAuthStore();
      try {
        const { data }: any = await $fetch(`${apiBase.value}/lobbies`, {
          method: "post",
          body: {
            admin_user_id: me?.id,
            name: `${me?.name}'s lobby`,
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
  },
});
