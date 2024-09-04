<template>
  <div>
    <h1>Game</h1>
    <Typer
      :text="props.lobby.text"
      @update:parsed-text="handleUpdateParsedText"
      @finish="handleFinish"
    />
    <TyperPlain
      v-for="player in playersComputed"
      :key="player.id"
      :text="props.lobby.text"
      :player-text="player.text"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Lobby } from "~/lib/types/lobby-types";
import type { Letter } from "~/lib/types/typing-result-types";
import { wsReceiveMessageTypes } from "~/lib/types/ws-types";
import { useAuthStore } from "~/store/auth";
import { useWsStore } from "~/store/ws";

const props = defineProps<{
  lobby: Lobby;
}>();
const { me } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const { message } = storeToRefs(useWsStore());
const wsStore = useWsStore();

const players = ref(
  props.lobby.users
    .filter((u) => u.id !== me.value?.id)
    .reduce((acc, u) => {
      acc[u.id] = u;
      return acc;
    }, {} as any),
);

const playersComputed = computed(() => {
  return Object.values(players.value);
});

watch(
  () => message?.value,
  async () => {
    switch (message?.value?.type) {
      case wsReceiveMessageTypes.UPDATE_TEXT:
        console.log("message from ws:", message.value.data.texts);

        for (const userId in message.value.data.texts) {
          if (players.value?.[userId]) {
            players.value[userId].text = message.value.data.texts[userId];
          }
        }
        break;
    }
  },
);

const handleUpdateParsedText = (parsedText: Letter[][]) => {
  wsStore.sendTextMessage({
    lobbyId: props.lobby.id,
    text: parsedText,
  });
};

const handleFinish = () => {
  console.log("finish");
};
</script>
<style scoped></style>
