<script setup lang="ts">
import { quests } from "@/constants";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Props = {
  points: number;
};

const { points } = defineProps<Props>();

const getProgress = (quest: number) => {
  return (points / quest) * 100;
};

const maxValue = Math.max(...quests.map((item) => item.value));
</script>

<template>
  <div class="border-2 rounded-xl p-4 space-y-4">
    <div class="flex items-center justify-between w-full space-y-2">
      <h3 class="font-bold text-lg">Quests</h3>
      <NuxtLink to="/quests">
        <Button size="sm" variant="primaryOutline"> View all </Button>
      </NuxtLink>
    </div>
    <ul class="w-full space-y-4">
      <div
        v-for="quest in quests"
        class="flex items-center w-full pb-4 gap-x-3"
        :key="quest.title"
      >
        <NuxtImg src="/points.svg" alt="Points" :width="40" :height="40" />
        <div class="flex flex-col gap-y-2 w-full">
          <p class="text-neutral-700 text-sm font-bold">
            {{ quest.title }}
          </p>
          <Progress
            :model-value="getProgress(quest.value)"
            class="h-2"
            :max="maxValue"
          />
        </div>
      </div>
    </ul>
  </div>
</template>
