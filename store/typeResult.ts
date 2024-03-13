import { defineStore } from "pinia";

export const useTypeResultStore = defineStore({
  id: "typeResultStore",
  state: () => ({
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
  },
});
