<template>
  <LobbiesList :lobbies="data?.data" />
</template>
<script setup lang="ts">
import type { SingleResp } from "~/lib/types/api-types";
import type { Lobby } from "~/lib/types/lobby-types";

const { data, pending } = await useFatch<SingleResp<Lobby>>(`/lobbies/`);
console.log("data lobbies", data.value);
</script>
<style scoped></style>
