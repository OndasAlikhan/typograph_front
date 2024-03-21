<script lang="ts" setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
</script>
<template>
  <div>
    <UIToaster />
    <CommonHeader />
    <main class="main-container p-8 pt-6">
      <slot />
    </main>
    <footer class="footer px-4">
      <h1>Made with 🍔</h1>
    </footer>
    <SpeedInsights />
  </div>
</template>
<style lang="scss" scoped>
.main-container {
  min-height: calc(100vh - 105px);
  display: flex;
}
.footer {
  height: 40px;
}
</style>
