<script setup lang="ts">
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/auth"; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { me } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push("/login");
};
</script>

<template>
  <UIDropdownMenu v-if="me">
    <UIDropdownMenuTrigger as-child>
      <UIButton variant="ghost" class="relative h-8 w-8 rounded-full">
        <UIAvatar class="h-8 w-8">
          <UIAvatarImage alt="@" />
          <UIAvatarFallback>{{ me?.name?.[0] }}</UIAvatarFallback>
        </UIAvatar>
      </UIButton>
    </UIDropdownMenuTrigger>
    <UIDropdownMenuContent class="w-56" align="end">
      <UIDropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">{{ me?.name }}</p>
          <p class="text-xs leading-none text-muted-foreground">
            {{ me?.email }}
          </p>
        </div>
      </UIDropdownMenuLabel>
      <UIDropdownMenuSeparator />
      <UIDropdownMenuGroup>
        <UIDropdownMenuItem @click="navigateTo('/profile')">
          History
        </UIDropdownMenuItem>
        <UIDropdownMenuItem>
          Lobby&nbsp;<span class="text-muted-foreground">(coming soon)</span>
        </UIDropdownMenuItem>
        <!-- <UIDropdownMenuItem> Settings </UIDropdownMenuItem>
        <UIDropdownMenuItem>New Team</UIDropdownMenuItem> -->
      </UIDropdownMenuGroup>
      <UIDropdownMenuSeparator />
      <UIDropdownMenuItem @click="logout"> Log out </UIDropdownMenuItem>
    </UIDropdownMenuContent>
  </UIDropdownMenu>
</template>
