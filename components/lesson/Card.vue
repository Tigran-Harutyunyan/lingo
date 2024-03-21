<script setup lang="ts">
import { cn } from "@/lib/utils";
import { challenges } from "@/db/schema";
import { onKeyStroke } from "@vueuse/core";
import { useSound } from "@/composables/useSound";

const emit = defineEmits(["onClick"]);

type Props = {
  id: number;
  imageSrc: string | null;
  audioSrc: string | null;
  text: string;
  shortcut: string;
  selected?: boolean;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none";
  type: (typeof challenges.$inferSelect)["type"];
};

const {
  id,
  imageSrc,
  audioSrc,
  text,
  shortcut,
  selected,
  disabled,
  status,
  type,
} = defineProps<Props>();

const { play } = useSound(audioSrc);

const handleClick = () => {
  if (disabled) return;
  play();
  emit("onClick", id);
};

onKeyStroke(shortcut, (e) => {
  if (e.key == shortcut) {
    handleClick();
  }
});
</script>

<template>
  <div
    @click="handleClick"
    :class="
      cn(
        'h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2',
        selected && 'border-sky-300 bg-sky-100 hover:bg-sky-100',
        selected &&
          status === 'correct' &&
          'border-green-300 bg-green-100 hover:bg-green-100',
        selected &&
          status === 'wrong' &&
          'border-rose-300 bg-rose-100 hover:bg-rose-100',
        disabled && 'pointer-events-none hover:bg-white',
        type === 'ASSIST' && 'lg:p-3 w-full'
      )
    "
  >
    <div
      v-if="imageSrc"
      class="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full"
    >
      <NuxtImg
        :src="imageSrc"
        fill
        :alt="text"
        class="absolute inset-0 h-full w-full text-transparent"
      />
    </div>

    <div
      :class="
        cn(
          'flex items-center justify-between',
          type === 'ASSIST' && 'flex-row-reverse'
        )
      "
    >
      <div v-if="type === 'ASSIST'"></div>
      <p
        :class="
          cn(
            'text-neutral-600 text-sm lg:text-base',
            selected && 'text-sky-500',
            selected && status === 'correct' && 'text-green-500',
            selected && status === 'wrong' && 'text-rose-500'
          )
        "
      >
        {{ text }}
      </p>
      <div
        :class="
          cn(
            'lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold',
            selected && 'border-sky-300 text-sky-500',
            selected &&
              status === 'correct' &&
              'border-green-500 text-green-500',
            selected && status === 'wrong' && 'border-rose-500 text-rose-500'
          )
        "
      >
        {{ shortcut }}
      </div>
    </div>
  </div>
</template>
