<template>
  <UITable class="mt-4 w-[50%]">
    <UITableHeader>
      <UITableRow>
        <UITableHead class="">#</UITableHead>
        <UITableHead class="">Name</UITableHead>
        <UITableHead class="text-right"></UITableHead>
      </UITableRow>
    </UITableHeader>
    <UITableBody>
      <UITableRow v-if="!participants"> Invite </UITableRow>
      <UITableRow v-for="(item, index) in participants" v-else :key="item.id">
        <UITableCell>{{ index + 1 }}</UITableCell>
        <UITableCell>{{ item.name }}</UITableCell>
        <UITableCell class="text-right">
          <p v-if="item.id === adminId">Owner</p>
        </UITableCell>
      </UITableRow>
    </UITableBody>
  </UITable>
</template>
<script lang="ts" setup>
import type { User } from "~/lib/types/auth-types";

type Props = {
  adminId: number;
  participants?: User[];
};
defineProps<Props>();
</script>
<style lang="scss" scoped></style>
