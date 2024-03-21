<template>
  <div class="w-full">
    <h2 class="text-2xl font-bold tracking-tight">History</h2>
    <p class="text-muted-foreground">Here you can see your past results</p>
    <UITable class="mt-4 w-[50%]">
      <UITableHeader>
        <UITableRow>
          <UITableHead class="">Date</UITableHead>
          <UITableHead class="w-[100px]"> WPM </UITableHead>
          <UITableHead>Accuracy</UITableHead>
          <UITableHead>Time</UITableHead>
          <UITableHead class="text-right">Race</UITableHead>
        </UITableRow>
      </UITableHeader>
      <UITableBody>
        <UITableRow v-for="item in typingResults?.data" :key="item.id">
          <UITableCell>{{ item.created_at }}</UITableCell>
          <UITableCell class="font-medium">
            {{ item.wpm }}
          </UITableCell>
          <UITableCell>{{ item.accuracy }}%</UITableCell>
          <UITableCell>{{ item.duration }}s</UITableCell>
          <UITableCell class="text-right">
            <p v-if="item.race_id">{{ item.race_id }}</p>
          </UITableCell>
        </UITableRow>
      </UITableBody>
    </UITable>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useApi } from "~/composables/api";
import { useAuthStore } from "~/store/auth";
import type { TypingResultResponse } from "~/lib/types/typing-result-types";
import type { ListResponse } from "~/lib/types/api-types";

const { me } = storeToRefs(useAuthStore());
const { data: typingResults, pending } = await useFatch<
  ListResponse<TypingResultResponse>
>(`/races/get_user_race_result/${me.value?.id}`);
</script>

<style></style>
