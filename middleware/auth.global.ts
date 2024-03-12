import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { getMe } = useAuthStore();
  const { authenticated, me } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie("token"); // get token from cookies

  if (token.value) {
    // check if value exists
    authenticated.value = true; // update the state to authenticated
  }

  // if token exists and url is /login redirect to homepage
  if (token.value && to && ["login", "register"].includes(to.name as string)) {
    await getMe();
    console.log("me", me.value);
    return navigateTo("/");
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== "login" && to?.name !== "register") {
    abortNavigation();
    return navigateTo("/login");
  }
});
