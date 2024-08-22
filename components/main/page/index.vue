<template>
  <div>
    <Typer :text="text" @finish="handleFinish" />
    <UICard class="mt-5 w-[300px]">
      <UICardContent class="p-4 d-flex flex-col">
        <p class="mb-2 text-xl">Create a lobby</p>
        <p class="mb-5 text-sm text-muted-foreground">
          Create a lobby and invite your friends to compete with you.
        </p>
        <UIButton class="w-full" @click="navigateTo('/lobbies')">
          Let's go
        </UIButton>
      </UICardContent>
    </UICard>
  </div>
</template>

<script lang="ts" setup>
import { generateWords } from "~/lib/genWord";
import { useTypeResultStore } from "~/store/typeResult";

const { saveResult } = useTypeResultStore();
const text = generateWords(20);

const handleFinish = async () => {
  await saveResult();
};
</script>

<style>

</style>