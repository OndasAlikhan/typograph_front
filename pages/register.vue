<template>
  <section class="self-center w-full flex justify-center">
    <UICard class="w-[450px] h-full">
      <UICardHeader>
        <UICardTitle>Create account</UICardTitle>
        <UICardDescription
          >Enter your email and password to create a new
          account</UICardDescription
        >
      </UICardHeader>
      <UICardContent>
        <form @submit.prevent="register">
          <div class="grid items-center w-full gap-4 mb-6">
            <div class="flex flex-col space-y-1.5">
              <UILabel for="email">Email</UILabel>
              <UIInput id="email" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <UILabel for="name">Name</UILabel>
              <UIInput id="name" />
            </div>
            <div iv class="flex flex-col space-y-1.5">
              <UILabel for="password">Password</UILabel>
              <UIInput id="password" />
            </div>
            <div iv class="flex flex-col space-y-1.5">
              <UILabel for="repeat_password">Repeat password</UILabel>
              <UIInput id="repeat_password" />
            </div>
          </div>
          <UIBox class="flex flex-col gap-3 items-center">
            <UIBox class="w-full">
              <UIButton class="w-full">Sign up</UIButton>
            </UIBox>
            <UIText class="text-sm font-light" type="link">
              <NuxtLink to="/login">or sign in to existing account</NuxtLink>
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

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  email: "alihan@gmail.com",
  name: "",
  password: "qweqweqwe",
  repeatPassword: "qweqweqwe",
});

const register = async () => {
  await authenticateUser(user.value); // call authenticateUser and pass the user object
};
</script>
