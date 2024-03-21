<template>
  <div>
    <h2 class="text-2xl font-bold tracking-tight">Leaderboard</h2>
    <UITable class="mt-4 w-[50%]">
      <UITableHeader>
        <UITableRow>
          <UITableHead class="">#</UITableHead>
          <UITableHead class="">Name</UITableHead>
          <UITableHead class="w-[100px]"> WPM </UITableHead>
          <UITableHead>Accuracy</UITableHead>
          <UITableHead>Time</UITableHead>
          <UITableHead class="text-right">Race</UITableHead>
        </UITableRow>
      </UITableHeader>
      <UITableBody>
        <UITableRow v-for="(item, index) in leaderboard?.data" :key="item.id">
          <UITableCell>{{ index + 1 }}</UITableCell>
          <UITableCell>{{ item.user_name }}</UITableCell>
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
import type { TypingResultResponse } from "~/lib/types/typing-result-types";
import type { ListResponse } from "~/lib/types/api-types";

const { data: leaderboard, pending } =
  await useFatch<ListResponse<TypingResultResponse>>("/races/leaderboard");
</script>

<style></style>
