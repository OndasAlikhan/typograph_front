<script lang="ts" setup>
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/auth"; // import the auth store we just created

const router = useRouter();

const { logUserOut, getMe } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated, me } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push("/login");
};
onMounted(async () => {
  console.log("calling me");
  await getMe();
  console.log("me", me.value);
});
</script>

<template>
  <header>
    <div class="border-b">
      <div class="flex h-16 items-center px-4 justify-between">
        <UIBox class="flex">
          <NuxtLink to="/">TYPOGRAPH</NuxtLink>
          <CommonMainNav class="mx-6" />
        </UIBox>
        <div v-if="authenticated" class="ml-auto flex items-center space-x-4">
          <CommonUserNav />
        </div>
        <div v-else>
          <UIButton>
            <NuxtLink to="/login">Sign in</NuxtLink>
          </UIButton>
        </div>
      </div>
    </div>
  </header>
</template>

<style></style>
