<template>
  <div class="w-full">
    <h2 class="text-2xl font-bold tracking-tight">{{ data?.data.name }}</h2>

    <div>{{ data }}</div>
    <div>
      {{ message }}
    </div>
    <LobbiesParticipants
      :participants="data?.data?.users"
      :lobby="data?.data"
      @refresh="refresh"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import type { SingleResp } from "~/lib/types/api-types";
import type { Lobby } from "~/lib/types/lobby-types";
import { useWsStore } from "~/store/ws";
import type { User } from "~/lib/types/auth-types";

const { message } = storeToRefs(useWsStore());
const route = useRoute();
const lobbyId = ref(route.params.id);
const { data, pending, refresh } = await useFatch<SingleResp<Lobby>>(
  `/lobbies/${lobbyId.value}`,
);

const users = ref<User[]>([]);

watch(data, () => {
  users.value = data.value?.data.users || [];
});
watch(message, () => {
  if (message?.value?.type === "update_users") {
    users.value = message?.value?.data?.users;
  }
});

console.log("----data", data.value);
</script>

<style></style>
