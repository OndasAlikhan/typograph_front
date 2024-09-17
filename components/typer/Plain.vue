<template>
  <div
    ref="parentRef"
    class="whitespace-pre-wrap text-xl w-full max-w-[800px] overflow relative font-mono"
  >
    <!-- <div v-if="props.isTimerStarted" class="absolute -top-7 text-base bg-white">
      {{ timer.secondsToHms(secondsElapsed) }}
    </div> -->
    <!-- <span
      ref="caretRef"
      class="before:content-[''] min-w-[2px] h-[21px] transition-all duration-[125ms] bg-black absolute"
    ></span> -->
    <template v-if="playerText">
      <p
        v-for="row in props.playerText"
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
    </template>
    <template v-else>
      <p
        v-for="row in parsedText"
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
    </template>
  </div>
</template>
<script lang="ts" setup>
import Timer from "~/lib/timer";
import type { Letter } from "~/lib/types/typing-result-types";

type ParsedText = Letter[][];
type Props = {
  text: string;
  playerText: ParsedText;
  // inputModel: string;
  // wordIndex: number;
  // isTimerStarted: boolean;
};
const props = defineProps<Props>();

const timer = new Timer();
const parentRef = ref<HTMLElement>();
const textRefs = ref<HTMLParagraphElement[]>([]);
const caretRef = ref<HTMLElement>();
const secondsElapsed = ref(0);

const parsedText = ref(
  props.text.split(" ").map((word) => {
    return word.split("").map((char) => {
      return {
        char,
        color: "black",
      };
    });
  }),
);

// watch(
//   () => props.isTimerStarted,
//   (val) => {
//     let interval;

//     if (val)
//       setInterval(() => {
//         secondsElapsed.value++;
//       }, 1000);
//     else clearInterval(interval);
//   },
// );

// const calculateOffsets = (charIndex: number) => {
//   const parentY = parentRef.value?.getBoundingClientRect?.()?.y;
//   const parentX = parentRef.value?.getBoundingClientRect?.()?.x;

//   const yOffset =
//     textRefs.value?.[props.wordIndex]?.children?.[
//       charIndex
//     ]?.getBoundingClientRect?.()?.y;

//   const xOffset =
//     textRefs.value?.[props.wordIndex]?.children?.[
//       charIndex
//     ]?.getBoundingClientRect?.()?.x || 0;

//   return [yOffset - (parentY || 0), xOffset - (parentX || 0)];
// };

// const updateCaret = () => {
//   if (!caretRef.value) return;

//   if (!props.inputModel.length) {
//     const charIndex = 0;
//     const [yOffset, xOffset] = calculateOffsets(charIndex);
//     caretRef.value.style.top = `${yOffset}px`;
//     caretRef.value.style.left = `${xOffset}px`;

//     return;
//   }
//   const charIndex =
//     props.inputModel.length - 1 >
//     textRefs.value?.[props.wordIndex]?.children.length - 1
//       ? textRefs.value?.[props.wordIndex]?.children.length - 1
//       : props.inputModel.length - 1;

//   const [yOffset, xOffset] = calculateOffsets(charIndex);
//   caretRef.value.style.top = `${yOffset}px`;
//   caretRef.value.style.left = `${xOffset + 12}px`;
// };

// watch(
//   () => props.inputModel,
//   () => updateCaret(),
// );
</script>
