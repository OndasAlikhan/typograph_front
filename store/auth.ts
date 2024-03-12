import { defineStore } from "pinia";
import { useToast } from "~/components/ui/toast";
import { useApi } from "~/composables/api";

type RegisterPayload = {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
};
type SignInPayload = {
  email: string;
  password: string;
};

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const toast = useToast();

  const authenticated = ref(false);
  const signInLoading = ref(false);
  const registerLoading = ref(false);
  const me = ref();

  const registerUser = async (payload: RegisterPayload) => {
    const { apiBase } = useApi();

    registerLoading.value = true;
    const { data, pending }: any = await $fetch(`${apiBase.value}/register`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });
    registerLoading.value = pending;

    if (data.value) {
      const token = useCookie("token");
      token.value = data?.value?.data.token;
      authenticated.value = true;
      console.log("token.value", token.value);
    }
    registerLoading.value = false;
  };

  const authenticateUser = async ({ email, password }: SignInPayload) => {
    const { apiBase } = useApi();
    try {
      signInLoading.value = true;
      console.log("apiBase", apiBase);
      const { data }: any = await $fetch(`${apiBase.value}/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: {
          email,
          password,
        },
      });
      console.log("data", data);

      if (data?.token) {
        const token = useCookie("token");
        token.value = data.token;
        authenticated.value = true;

        toast.toast({
          variant: "default",
          description: "You have successfully logged in",
        });
        router.push("/");
      } else throw new Error("error getting token");
    } catch (err: any) {
      if (err.response._data.message === "invalid login")
        toast.toast({
          variant: "destructive",
          description: "Invalid email or password",
        });
      else
        toast.toast({
          variant: "destructive",
          description: "Error on login, please try again later",
        });
    } finally {
      signInLoading.value = false;
    }
  };

  const getMe = async () => {
    const { apiBase } = useApi();
    const token = useCookie("token");
    try {
      const { data }: any = await $fetch(`${apiBase.value}/me`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      console.log("data", data);
      me.value = data;
      authenticated.value = true;
    } catch (err: any) {
      console.log("err", err);
      authenticated.value = false;
    }
  };

  const logUserOut = () => {
    const token = useCookie("token");
    authenticated.value = false;
    me.value = undefined;
    token.value = undefined;
  };

  return {
    toast,
    me,
    authenticated,
    signInLoading,
    registerLoading,
    registerUser,
    authenticateUser,
    logUserOut,
    getMe,
  };
});
