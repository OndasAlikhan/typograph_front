import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useTypeResultStore = defineStore({
  id: "typeResultStore",
  state: () => ({
    isUnsavedResult: false,
    result: {
      wpm: 0,
      accuracy: 0,
      time: 0,
    },
  }),
  actions: {
    setResult(newResult: { wpm: number; accuracy: number; time: number }) {
      this.result = newResult;
    },
    async saveResult() {
      const { apiBase } = useApi();
      const { me } = useAuthStore();

      try {
        const { data }: any = await $fetch(
          `${apiBase.value}/races/add_user_race_result`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: {
              accuracy: this.result.accuracy,
              duration: this.result.time,
              wpm: this.result.wpm,
              user_id: me?.id,
            },
          },
        );
      } catch (err) {
        console.error("Could not save the result", err);
      }
    },
  },
});
