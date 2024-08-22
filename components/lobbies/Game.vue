<template>
  <div>
    <h1>Game</h1>
    <Typer :text="props.lobby.text" @finish="handleFinish" />
    <TyperPlain 
      v-for="user in otherPlayers"
      :key="user.id"
      :text="props.lobby.text"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Lobby } from "~/lib/types/lobby-types";
import { wsReceiveMessageTypes } from '~/lib/types/ws-types';
import { useAuthStore } from '~/store/auth';
import { useWsStore } from '~/store/ws';

const props = defineProps<{
  lobby: Lobby,
}>();
const { me } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const { message } = storeToRefs(useWsStore());

const otherPlayers = computed(() => {
  return props.lobby.users.filter(u => u.id !== me.value?.id)
})

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

const handleFinish = () => {
  console.log("finish");
};
</script>
<style scoped>
</style>