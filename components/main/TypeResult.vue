<template>
  <div class="result">
    <UICard class="col-span-2">
      <UICardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <UICardTitle class="text-sm font-medium">
          Your typing result
        </UICardTitle>
        <CheckCircle2 color="hsl(var(--muted-foreground))" height="18px" />
      </UICardHeader>
      <UICardContent>
        <div class="text-4xl font-bold">
          {{ result.wpm }}
          <span class="text-xs text-muted-foreground">wpm</span>
        </div>
      </UICardContent>
    </UICard>
    <UICard>
      <UICardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <UICardTitle class="text-sm font-medium"> Typing accuracy </UICardTitle>
        <SpellCheck color="hsl(var(--muted-foreground))" height="18px" />
      </UICardHeader>
      <UICardContent>
        <div class="text-2xl font-bold">
          {{ result.accuracy }}
          <span class="text-xs text-muted-foreground">%</span>
        </div>
      </UICardContent>
    </UICard>
    <UICard>
      <UICardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <UICardTitle class="text-sm font-medium"> Seconds elapsed </UICardTitle>
        <Timer color="hsl(var(--muted-foreground))" height="20px" />
      </UICardHeader>
      <UICardContent>
        <div class="text-2xl font-bold">
          {{ result.time }}
          <span class="text-xs text-muted-foreground">s</span>
        </div>
      </UICardContent>
    </UICard>
    <div class="w-full col-span-2">
      <UIButton class="w-full" @click="again">Again</UIButton>
      <p class="text-xs text-muted-foreground text-center mt-4">
        or <span class="bg-slate-100 p-1 rounded">tab</span> +
        <span class="bg-slate-100 p-1 rounded">enter</span>
      </p>
      <p v-if="!me" class="text-sm mt-4 text-muted-foreground text-center">
        <NuxtLink to="/login">
          <span
            class="hover:text-foreground underline font-semibold cursor-pointer"
          >
            Sign in
          </span>
        </NuxtLink>
        to save your result
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTypeResultStore } from "~/store/typeResult";
import { Timer, SpellCheck, CheckCircle, CheckCircle2 } from "lucide-vue-next";
import { useAuthStore } from "~/store/auth";

const { me } = storeToRefs(useAuthStore());
const { result, setResult } = useTypeResultStore();

const again = () => {
  setResult({
    wpm: 0,
    accuracy: 0,
    time: 0,
  });
};
</script>
<style lang="scss" scoped>
.result {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  min-width: 400px;
}
</style>
