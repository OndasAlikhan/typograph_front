export const useApi = () => {
  const runtimeConfig = useRuntimeConfig();
  const apiBase = ref(runtimeConfig.public.apiBase);
  return { apiBase };
};
