<template>
  <div class="w-full">
    <div class="mx-auto w-fit">
      <TyperResult v-if="result.wpm" />
      <MainPage v-else />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useTypeResultStore } from "~/store/typeResult";
const { result } = storeToRefs(useTypeResultStore());
</script>
