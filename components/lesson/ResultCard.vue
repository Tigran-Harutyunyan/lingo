<script setup lang="ts">
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  variant: "points" | "hearts";
};
const { value, variant } = defineProps<Props>();

const imageSrc = variant === "hearts" ? "/heart.svg" : "/points.svg";
</script>

<template>
  <div
    :class="
      cn(
        'rounded-2xl border-2 w-full',
        variant === 'points' && 'bg-orange-400 border-orange-400',
        variant === 'hearts' && 'bg-rose-500 border-rose-500'
      )
    "
  >
    <div
      :class="
        cn(
          'p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs',
          variant === 'hearts' && 'bg-rose-500',
          variant === 'points' && 'bg-orange-400'
        )
      "
    >
      {{ variant === "hearts" ? "Hearts Left" : "Total XP" }}
    </div>
    <div
      :class="
        cn(
          'rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg',
          variant === 'hearts' && 'text-rose-500',
          variant === 'points' && 'text-orange-400'
        )
      "
    >
      <NuxtImg
        alt="Icon"
        :src="imageSrc"
        :height="30"
        :width="30"
        class="mr-1.5"
      />
      {{ value }}
    </div>
  </div>
</template>
