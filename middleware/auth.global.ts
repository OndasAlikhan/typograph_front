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
  const UNAUTH_PAGES = ["/login", "/register"]; // accessible for unauthenticated users
  const PRIVATE_PAGES = ["/dashboard"]; // accessible for authenticated users
  const PUBLIC_PAGES = ["/"]; // accessible for everyone

  // for authenticated users
  // if token exists and url is /login redirect to homepage
  if (token.value && to && UNAUTH_PAGES.includes(to.path as string)) {
    console.log("in if1");

    await getMe();
    console.log("me", me.value);
    return navigateTo("/");
  }

  // for unauthenticated users
  // if token doesn't exist redirect to log in
  if (
    !token.value &&
    ![...UNAUTH_PAGES, ...PUBLIC_PAGES].includes(to?.path as string)
  ) {
    console.log("in if2");
    abortNavigation();
    return navigateTo("/login");
  }
});
