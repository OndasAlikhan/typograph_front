<template>
  <UIBox
    class="whitespace-pre-wrap text-xl w-full max-w-[800px] overflow-hidden"
  >
    <span
      ref="caretRef"
      class="before:content-[''] min-w-[2px] h-[21px] transition-all bg-black absolute"
    ></span>
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
  inputModel: string;
  wordIndex: number;
};
const props = defineProps<Props>();

const textRefs = ref<HTMLParagraphElement[]>([]);
const caretRef = ref<HTMLElement>();

const calculateOffsets = (charIndex: number) => {
  const yOffset =
    textRefs.value?.[props.wordIndex]?.children?.[
      charIndex
    ]?.getBoundingClientRect?.()?.y;

  const xOffset =
    textRefs.value?.[props.wordIndex]?.children?.[
      charIndex
    ]?.getBoundingClientRect?.()?.x || 0;

  return [yOffset, xOffset];
};

const updateCaret = () => {
  if (!caretRef.value) return;

  if (!props.inputModel.length) {
    const charIndex = 0;
    const [yOffset, xOffset] = calculateOffsets(charIndex);
    caretRef.value.style.top = `${yOffset}px`;
    caretRef.value.style.left = `${xOffset}px`;

    return;
  }
  const charIndex =
    props.inputModel.length - 1 >
    textRefs.value?.[props.wordIndex]?.children.length - 1
      ? textRefs.value?.[props.wordIndex]?.children.length - 1
      : props.inputModel.length - 1;

  const [yOffset, xOffset] = calculateOffsets(charIndex);
  caretRef.value.style.top = `${yOffset}px`;
  caretRef.value.style.left = `${xOffset + 12}px`;
};

watch(
  () => props.inputModel,
  () => updateCaret(),
);
</script>
