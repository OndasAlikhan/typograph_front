<template>
  <UICard class="font-mono text-xl" @click="handleFocus">
    <UICardContent class="mt-4">
      <span
        ref="caretRef"
        className="before:content-[''] w-[2px] h-[21px] hidden transition-all bg-black absolute"
      ></span>
      <CommonTextTyperRenderText ref="renderTextRef" :text="parsedText" />
      <input
        ref="inputRef"
        v-model="inputModel"
        class="border h-8 text-black w-full pointer-events-none"
        @blur="handleBlur"
      />
    </UICardContent>
  </UICard>
</template>

<script lang="ts" setup>
const text = ref(
  "When you meet someone better than yourself, turn your thoughts to becoming his equal. When you meet someone not as good as you are, look within and examine your own self.",
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
const isFocued = ref(false);
const inputRef = ref();
const caretRef = ref();
const renderTextRef = ref();
const currentWord = ref(0);
const currentChar = ref(0);

const handleFocus = () => {
  console.log("focus");
  isFocued.value = true;
  inputRef.value.focus();
};
const handleBlur = () => {
  isFocued.value = false;
};

const updateCaret = () => {
  console.log("renderTextRef.value.textRefs", renderTextRef.value.textRefs);
  caretRef.value.style.top = `${inputRef.value.offsetTop}px`;
  caretRef.value.style.left = `${inputRef.value.offsetTop}px`;
};

watch(
  () => inputModel.value,
  () => {
    const str = inputModel.value;

    /* if white space, go next word */
    if (
      str.length > parsedText.value[currentWord.value].length &&
      str.slice(-1) === " "
    ) {
      currentWord.value++;
      currentChar.value = 0;
      inputModel.value = "";
    }

    currentChar.value = str.length - 1;
    updateCaret();

    const strArr = str.split("");

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
  },
);
</script>

<style></style>
