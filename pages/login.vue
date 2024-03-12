<template>
  <section class="self-center w-full flex justify-center">
    <UICard class="w-[450px] h-full">
      <UICardHeader>
        <UICardTitle>Sign in</UICardTitle>
        <UICardDescription
          >Enter your email and password to sign in</UICardDescription
        >
      </UICardHeader>
      <UICardContent>
        <form @submit.prevent="login">
          <div class="grid items-center w-full gap-4 mb-6">
            <div class="flex flex-col space-y-1.5">
              <UILabel for="email">Email</UILabel>
              <UIInput id="email" v-model="user.email" />
            </div>
            <div iv class="flex flex-col space-y-1.5">
              <UILabel for="password">Password</UILabel>
              <UIInput id="password" v-model="user.password" />
            </div>
          </div>
          <UIBox class="flex flex-col gap-3 items-center">
            <UIBox class="w-full">
              <UIButton class="w-full" :loading="signInLoading">
                Sign in
              </UIButton>
            </UIBox>
            <UIText class="text-sm font-light" type="link">
              <NuxtLink to="/register">or create an account</NuxtLink>
            </UIText>
          </UIBox>
        </form>
      </UICardContent>
    </UICard>
  </section>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/auth"; // import the auth store we just created

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { signInLoading } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  email: "",
  password: "",
});

const login = async () => {
  await authenticateUser(user.value); // call authenticateUser and pass the user object
};
</script>
