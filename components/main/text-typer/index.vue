<template>
  <UICard class="font-mono text-xl" @click="handleFocus">
    <UICardContent class="mt-4" :class="{ 'blur-sm': !isFocused }">
      <MainTextTyperRenderText
        ref="renderTextRef"
        :text="parsedText"
        :input-model="inputModel"
        :word-index="currentWord"
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
import { useTypeResultStore } from "~/store/typeResult";

const { setResult } = useTypeResultStore();

const text = ref(
  // "When you meet someone better than yourself, turn your thoughts to becoming his equal. When you meet someone not as good as you are, look within and examine your own self.",
  generateWords(10),
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
  console.log("focus");
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

    checkSpaceAndSetCurrentChar(str);
    updateColorsOfChars(str);
    checkFinish();
  },
);

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
  console.log("--word", currentWord.value, parsedText.value.length - 1);
  console.log(
    "char",
    currentChar.value,
    parsedText.value[currentWord.value].length - 1,
  );
  if (
    currentWord.value === parsedText.value.length - 1 &&
    currentChar.value === parsedText.value[currentWord.value].length - 1
  ) {
    handleFinish();
  }
};
const handleFinish = () => {
  setResult({
    wpm: 100,
    accuracy: 100,
    time: 10,
  });
};
</script>

<style></style>
