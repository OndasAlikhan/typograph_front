<template>
  <section>
    <UICard class="w-[450px]">
      <UICardHeader>
        <UICardTitle>New lobby</UICardTitle>
        <UICardDescription>Fill your lobby information</UICardDescription>
      </UICardHeader>
      <UICardContent>
        <form @submit.prevent="submit">
          <div class="grid items-center w-full gap-4 mb-6">
            <div class="flex flex-col space-y-1.5">
              <UILabel for="name">Name</UILabel>
              <UIInput id="name" v-model="lobby.name" />
            </div>
          </div>
          <UIBox class="flex flex-col gap-3 items-center">
            <UIBox class="w-full">
              <UIButton class="w-full" :loading="loading"> Submit </UIButton>
            </UIBox>
          </UIBox>
        </form>
      </UICardContent>
    </UICard>
  </section>
</template>
<script lang="ts" setup>
import { useLobbyStore } from "~/store/lobby";

const { createLobby } = useLobbyStore();
const lobby = ref({});
const loading = ref(false);

const submit = async () => {
  loading.value = true;
  await createLobby(lobby.value.name);
  loading.value = false;
};
</script>
