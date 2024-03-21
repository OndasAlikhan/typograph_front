export const useFatch: typeof useFetch = (path, options) => {
  const runtimeConfig = useRuntimeConfig();

  return useFetch(path, {
    baseURL: runtimeConfig.public.apiBase,
    onRequest({ options }) {
      const token = useCookie("token");
      options.headers = { Authorization: `Bearer ${token.value}` };
    },
    onRequestError({ error }: any) {
      console.error(error);
    },
    ...options,
  });
};
