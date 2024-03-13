<template>
  <div>
    <h1>Result</h1>
    <p>WPM: {{ result.wpm }}</p>
    <p>Accuracy: {{ result.accuracy }}%</p>
    <UIButton class="mt-3" @click="again">Again</UIButton>
  </div>
</template>
<script lang="ts" setup>
import { useTypeResultStore } from "~/store/typeResult";

const { result, setResult } = useTypeResultStore();

const again = () => {
  setResult({
    wpm: 0,
    accuracy: 0,
    time: 0,
  });
};
</script>
