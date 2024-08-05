<template>
  <div class="w-full">
    <h2 class="text-2xl font-bold tracking-tight">{{ data?.data.name }}</h2>

    <div v-if="data?.data.status === 'running'">
      <h2>Game started!</h2>
        <div>
            <MainTextTyper />
        </div>
    </div>
    <LobbiesParticipants
      v-else
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
import { wsReceiveMessageTypes } from "~/lib/types/ws-types";

const { message } = storeToRefs(useWsStore());
const route = useRoute();
const lobbyId = ref(route.params.id);
const { data, pending, refresh } = await useFatch<SingleResp<Lobby>>(
  `/lobbies/${lobbyId.value}`,
);

watch(() => message?.value, async() => {
  switch (message?.value?.type) {
    case wsReceiveMessageTypes.UPDATE_USERS:
      await refresh();
      break;
    case wsReceiveMessageTypes.UPDATE_STATUS:
      await refresh();
      //todo redirect to game
      break;

  }
});

console.log("----data", data.value);
</script>

<style></style>
