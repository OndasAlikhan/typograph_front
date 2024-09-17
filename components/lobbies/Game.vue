<template>
  <div>
    <p class="text-lg mt-2">The game started!</p>
    <Typer
      class="mt-5"
      :text="props.lobby.text"
      @update:parsed-text="handleUpdateParsedText"
      @finish="handleFinish"
    />
    <div class="grid grid-cols-2 gap-2">
      <UICard v-for="player in playersComputed" :key="player.id" class="mt-5">
        <UICardContent>
          <div class="flex mt-4 mb-5 gap-2 items-baseline">
            <p class="text-2xl">{{ player.name }}</p>
            <div
              v-if="isPlayerFinished(player.id)"
              class="text-muted-foreground"
            >
              done
            </div>
            <div v-else class="text-muted-foreground">typing...</div>
          </div>

          <TyperPlain :text="props.lobby.text" :player-text="player.text" />
        </UICardContent>
      </UICard>
    </div>
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

const playersDone = ref<Record<number, boolean>>({});

const playersComputed = computed(() => {
  return Object.values(players.value);
});

function isPlayerFinished(id: number) {
  return !!playersDone.value?.[id];
}

watch(
  () => message?.value,
  () => {
    switch (message?.value?.type) {
      case wsReceiveMessageTypes.UPDATE_TEXT:
        console.log("message from ws:", message.value.data);

        for (const userId in message.value.data.texts) {
          if (players.value?.[userId]) {
            players.value[userId].text = message.value.data.texts[userId];
          }
        }
        break;
      case wsReceiveMessageTypes.FINISH:
        playersDone.value = message.value.data.users_done;
        console.log("playersDone.value", playersDone.value);
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
  wsStore.sendFinishMessage({
    lobbyId: props.lobby.id,
  });
};
</script>
<style scoped></style>
