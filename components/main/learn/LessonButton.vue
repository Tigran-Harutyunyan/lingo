<script setup lang="ts">
import { Check, Crown, Star } from "lucide-vue-next";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

const { id, index, totalCount, locked, current, percentage } =
  defineProps<Props>();

const cycleLength = 8;
const cycleIndex = index % cycleLength;

let indentationLevel;

if (cycleIndex <= 2) {
  indentationLevel = cycleIndex;
} else if (cycleIndex <= 4) {
  indentationLevel = 4 - cycleIndex;
} else if (cycleIndex <= 6) {
  indentationLevel = 4 - cycleIndex;
} else {
  indentationLevel = cycleIndex - 8;
}

const rightPosition = indentationLevel * 40;

const isFirst = index === 0;
const isLast = index === totalCount;
const isCompleted = !current && !locked;

const Icon = isCompleted ? Check : isLast ? Crown : Star;

const href = isCompleted ? `/lessons/${id}` : "/lesson";

const buttonStyle = {
  right: `${rightPosition}px`,
  marginTop: isFirst && !isCompleted ? `60px` : `24px`,
};
</script>

<template>
  <NuxtLink
    :to="href"
    :aria-disabled="locked"
    :style="{ pointerEvents: locked ? 'none' : 'auto' }"
  >
    <div class="relative" :style="buttonStyle">
      <div v-if="current" class="h-[102px] w-[102px] relative">
        <div
          class="absolute -top-11 -left-1.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10"
        >
          Start
          <div
            class="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2"
          />
        </div>

        <CircleProgress
          :percentage="Number.isNaN(percentage) ? 0 : percentage"
          className="absolute -left-[17px] -top-[17px]"
        />

        <Button
          size="rounded"
          :variant="locked ? 'locked' : 'secondary'"
          class="h-[70px] w-[70px] border-b-8"
        >
          <component
            :is="Icon"
            :class="
              cn(
                'h-10 w-10',
                locked
                  ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                  : 'fill-primary-foreground text-primary-foreground',
                isCompleted && 'fill-none stroke-[4]'
              )
            "
          />
        </Button>
      </div>

      <Button
        v-else
        size="rounded"
        :variant="locked ? 'locked' : 'secondary'"
        class="h-[70px] w-[70px] border-b-8"
      >
        <component
          :is="Icon"
          :class="
            cn(
              'h-10 w-10',
              locked
                ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                : 'fill-primary-foreground text-primary-foreground',
              isCompleted && 'fill-none stroke-[4]'
            )
          "
        />
      </Button>
    </div>
  </NuxtLink>
</template>
