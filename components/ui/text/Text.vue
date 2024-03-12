<template>
  <p
    :class="{ link: props.type === 'link' }"
    @focus="(e) => emit('focus', e)"
    @blur="(e) => emit('blur', e)"
  >
    <slot />
  </p>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";

const props = defineProps({
  type: {
    type: String as PropType<"link" | "text">,
    default: "text",
  },
});
const emit = defineEmits(["focus", "blur"]);
</script>
<style lang="scss" scoped>
.link {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    @apply text-blue-600;
  }
}
</style>
