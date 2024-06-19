<script setup lang="ts">
import { cn } from "@/lib/utils";
</script>

<template>
  <nav
    :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
    <a
      href="/leaderboard"
      class="text-sm font-medium transition-colors hover:text-primary"
    >
      Leaderboard
    </a>
    <a
      href="/lobbies"
      class="text-sm font-medium transition-colors hover:text-primary"
    >
      Lobbies
    </a>
    <!-- <a
      href="/examples/dashboard"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      Customers
    </a>
    <a
      href="/examples/dashboard"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      Products
    </a>
    <a
      href="/examples/dashboard"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      Settings
    </a> -->
  </nav>
</template>
