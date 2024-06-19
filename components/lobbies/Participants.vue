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
          <p v-if="item.id === lobby.admin_user_id">Owner</p>
        </UITableCell>
      </UITableRow>
    </UITableBody>
  </UITable>
  <UIButton v-if="alreadyJoined" class="mt-5" disabled aria-disabled>
    You joined
  </UIButton>
  <UIButton v-else class="mt-5" @click="enterLobby(lobby.id)">Join</UIButton>
  <UIButton v-if="isAdmin" class="ml-3" @click="startLobby"> Start </UIButton>
</template>
<script lang="ts" setup>
import type { User } from "~/lib/types/auth-types";
import { useAuthStore } from "~/store/auth";
import { useLobbyStore } from "~/store/lobby";
import type { Lobby } from "~/lib/types/lobby-types";

type Props = {
  lobby: Lobby;
  participants?: User[];
};
const props = defineProps<Props>();

const { me } = useAuthStore();
const { enterLobby, startLobby } = useLobbyStore();

const alreadyJoined = computed(() =>
  props.participants?.find((item) => item.id === me.id),
);
const isAdmin = computed(() => props.lobby.admin_user_id === me?.id);
</script>
<style lang="scss" scoped></style>
