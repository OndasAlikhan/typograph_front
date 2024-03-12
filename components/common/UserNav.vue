<script setup lang="ts">
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/auth"; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push("/login");
};
</script>

<template>
  <UIDropdownMenu>
    <UIDropdownMenuTrigger as-child>
      <UIButton variant="ghost" class="relative h-8 w-8 rounded-full">
        <UIAvatar class="h-8 w-8">
          <UIAvatarImage src="/avatars/01.png" alt="@shadcn" />
          <UIAvatarFallback>SC</UIAvatarFallback>
        </UIAvatar>
      </UIButton>
    </UIDropdownMenuTrigger>
    <UIDropdownMenuContent class="w-56" align="end">
      <UIDropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">shadcn</p>
          <p class="text-xs leading-none text-muted-foreground">
            m@example.com
          </p>
        </div>
      </UIDropdownMenuLabel>
      <UIDropdownMenuSeparator />
      <UIDropdownMenuGroup>
        <UIDropdownMenuItem> Profile </UIDropdownMenuItem>
        <UIDropdownMenuItem> Billing </UIDropdownMenuItem>
        <UIDropdownMenuItem> Settings </UIDropdownMenuItem>
        <UIDropdownMenuItem>New Team</UIDropdownMenuItem>
      </UIDropdownMenuGroup>
      <UIDropdownMenuSeparator />
      <UIDropdownMenuItem @click="logout"> Log out </UIDropdownMenuItem>
    </UIDropdownMenuContent>
  </UIDropdownMenu>
</template>
