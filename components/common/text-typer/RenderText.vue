<template>
  <UIBox
    class="whitespace-pre-wrap text-xl w-full max-w-[800px] overflow-hidden"
  >
    <p
      v-for="row in props.text"
      :key="row[0].char"
      ref="textRefs"
      class="inline-block"
    >
      <span
        v-for="letter in row"
        :key="letter.char"
        :style="{ color: letter.color }"
        >{{ letter.char }}</span
      >{{ " " }}
    </p>
  </UIBox>
</template>
<script lang="ts" setup>
type Letter = {
  char: string;
  color: string;
};
type ParsedText = Letter[][];
type Props = {
  text: ParsedText;
};
const props = defineProps<Props>();

const textRefs = ref([]);
defineExpose({ textRefs });
</script>
