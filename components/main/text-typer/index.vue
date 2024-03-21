<template>
  <UICard class="font-mono text-xl" @click="handleFocus">
    <UICardContent class="mt-4" :class="{ 'blur-sm': !isFocused }">
      <MainTextTyperRenderText
        ref="renderTextRef"
        :text="parsedText"
        :input-model="inputModel"
        :word-index="currentWord"
        :is-timer-started="isTimerStarted"
      />
      <input
        ref="inputRef"
        v-model="inputModel"
        autofocus
        class="border h-8 text-black opacity-0 w-full pointer-events-none"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </UICardContent>
  </UICard>
</template>

<script lang="ts" setup>
import { generateWords } from "~/lib/genWord";
import Timer from "~/lib/timer";
import { useAuthStore } from "~/store/auth";
import { useTypeResultStore } from "~/store/typeResult";

const { me } = storeToRefs(useAuthStore());
const { isUnsavedResult } = storeToRefs(useTypeResultStore());
const { setResult, saveResult } = useTypeResultStore();
const DEFAULT_WORDS_AMOUNT = 20;

const text = ref(
  // "When you meet someone better than yourself, turn your thoughts to becoming his equal. When you meet someone not as good as you are, look within and examine your own self.",
  generateWords(DEFAULT_WORDS_AMOUNT),
  // "provide tenn learn",
);
const parsedText = ref(
  text.value.split(" ").map((word) => {
    return word.split("").map((char) => {
      return {
        char,
        color: "black",
      };
    });
  }),
);

const timer = new Timer();
const seconds = ref(0);
const isTimerStarted = ref(false);
const inputModel = ref("");
const isFocused = ref(false);
const inputRef = ref();
const renderTextRef = ref();
const currentWord = ref(0);
const currentChar = ref(0);

onMounted(() => {
  handleFocus();
});

const handleFocus = () => {
  inputRef.value.focus();
  isFocused.value = true;
};
const handleBlur = () => {
  isFocused.value = false;
};

watch(
  () => inputModel.value,
  () => {
    const str = inputModel.value;

    startTimer();
    checkSpaceAndSetCurrentChar(str);
    updateColorsOfChars(str);
    checkFinish();
  },
);
const startTimer = () => {
  if (isTimerStarted.value) return;
  timer.startTimer();
  isTimerStarted.value = true;
};

const checkSpaceAndSetCurrentChar = (str: string) => {
  /* if white space, go next word */
  if (
    str.length > parsedText.value[currentWord.value].length &&
    str.slice(-1) === " "
  ) {
    inputModel.value = "";
    currentWord.value++;
    currentChar.value = 0;
  } else {
    currentChar.value = str.length - 1;
  }
};

const updateColorsOfChars = (str: string) => {
  const strArr = str.split("");

  if (parsedText.value[currentWord.value])
    parsedText.value[currentWord.value] = parsedText.value[
      currentWord.value
    ].map((char, index) => {
      const newChar = strArr[index];

      let result = {
        char: parsedText.value[currentWord.value][index].char,
        color: "black",
      };

      if (newChar && newChar === char.char)
        result = {
          char: parsedText.value[currentWord.value][index].char,
          color: "green",
        };
      else if (newChar && newChar !== char.char)
        result = {
          char: parsedText.value[currentWord.value][index].char,
          color: "red",
        };

      return result;
    });
};
const checkFinish = () => {
  /* finish */
  if (
    currentWord.value === parsedText.value.length - 1 &&
    currentChar.value === parsedText.value[currentWord.value].length - 1
  ) {
    handleFinish();
  }
};
const countCorrectCharacters = () => {
  let correct = 0;
  parsedText.value.forEach((word, index) => {
    word.forEach((char, index) => {
      if (char.color === "green") correct++;
    });
  });
  return correct;
};
const roundToOne = (num: number) => {
  return Math.round(num * 10) / 10;
};
const handleFinish = async () => {
  const minutes = timer.stopTimer();
  setResult({
    wpm: roundToOne(DEFAULT_WORDS_AMOUNT / minutes),
    accuracy: roundToOne((countCorrectCharacters() / text.value.length) * 100),
    time: roundToOne(minutes * 60),
  });
  if (!me.value) {
    isUnsavedResult.value = true;
  } else {
    await saveResult();
  }
};
</script>

<style></style>
