<template>
  <div>
    <MainTypeResult v-if="result.wpm" />
    <MainTextTyper v-else />
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useTypeResultStore } from "~/store/typeResult";
const { result } = storeToRefs(useTypeResultStore());
</script>
