<template>
  <div class="w-full">
    <h2 class="text-2xl font-bold tracking-tight">{{ data?.data.name }}</h2>

    <LobbiesParticipants
      :participants="data?.data?.users"
      :lobby="data?.data"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import type { SingleResp } from "~/lib/types/api-types";
import type { Lobby } from "~/lib/types/lobby-types";

const route = useRoute();
const lobbyId = ref(route.params.id);
const { data, pending } = await useFatch<SingleResp<Lobby>>(
  `/lobbies/${lobbyId.value}`,
);
console.log("----data", data.value);
</script>

<style></style>
