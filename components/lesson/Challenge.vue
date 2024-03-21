<script setup lang="ts">
import Card from "./Card.vue";

const emit = defineEmits(["onSelect"]);

import { cn } from "@/lib/utils";
import { challengeOptions, challenges } from "@/db/schema";

type Props = {
  options: (typeof challengeOptions.$inferSelect)[];
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

const { options, status, selectedOption, disabled, type } =
  defineProps<Props>();
</script>

<template>
  <div
    :class="
      cn(
        'grid gap-2',
        type === 'ASSIST' && 'grid-cols-1',
        type === 'SELECT' &&
          'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]'
      )
    "
  >
    <Card
      v-for="(option, i) in options"
      :key="option.id"
      :id="option.id"
      :text="option.text"
      :imageSrc="option.imageSrc"
      :shortcut="`${i + 1}`"
      :selected="selectedOption === option.id"
      @onClick="emit('onSelect', option.id)"
      :status="status"
      :audioSrc="option.audioSrc"
      :disabled="disabled"
      :type="type"
    />
  </div>
</template>
