import ofetch from "ofetch";
import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  globalThis.$fetch = $fetch.create({
    onRequest({ options }) {
      const token = useCookie("token");
      options.headers = { Authorization: `Bearer ${token.value}` };
    },
    onRequestError({ error }: any) {
      console.error(error);
    },
  });
});
