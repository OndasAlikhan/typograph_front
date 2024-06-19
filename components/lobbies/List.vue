<template>
  <div class="w-full">
    <UITable class="mt-4 w-[50%]">
      <UITableHeader>
        <UITableRow>
          <UITableHead class="">#</UITableHead>
          <UITableHead class="">Name</UITableHead>
          <UITableHead class="">Status</UITableHead>
          <UITableHead class="">Owner</UITableHead>
          <UITableHead class="">Players</UITableHead>
          <UITableHead class="text-right"></UITableHead>
        </UITableRow>
      </UITableHeader>
      <UITableBody>
        <UITableRow
          v-for="(item, index) in lobbies"
          :key="item.id"
          @click="goToLobby(item?.id)"
        >
          <UITableCell>{{ index + 1 }}</UITableCell>
          <UITableCell>{{ item?.name }}</UITableCell>
          <UITableCell>{{ item?.status }}</UITableCell>
          <UITableCell>{{ item?.admin_user_id }}</UITableCell>
          <UITableCell>{{ item?.users?.length || 0 }}</UITableCell>
        </UITableRow>
      </UITableBody>
    </UITable>
    <UIButton class="mt-5" @click="navigateTo('/lobbies/new')"
      >Create new lobby</UIButton
    >
  </div>
</template>
<script lang="ts" setup>
import type { Lobby } from "~/lib/types/lobby-types";

type Props = {
  lobbies?: Lobby[];
};
defineProps<Props>();

const goToLobby = (id: string) => {
  navigateTo("/lobbies/" + id);
};
</script>
<style lang="scss" scoped></style>
