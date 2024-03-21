<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "Lingo | Quests",
});

import { quests } from "@/constants";

import { useApi } from "@/composables/useApi";

const { getUserProgress, getUserSubscriptions } = useApi();

const [userProgress, userSubscription] = await Promise.all([
  getUserProgress(),
  getUserSubscriptions(),
]);

const isPro = !!userSubscription?.isActive;

const getProgress = (quest: { title: string; value: number }) => {
  if (!userProgress) return;
  return (userProgress.points / quest.value) * 100;
};

const maxValue = Math.max(...quests.map((item) => item.value));
</script>

<template>
  <NuxtLayout name="main">
    <div class="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper v-if="userProgress">
        <UserProgress
          :activeCourse="userProgress.activeCourse"
          :hearts="userProgress.hearts"
          :points="userProgress.points"
          :hasActiveSubscription="isPro"
        />

        <Promo v-if="!isPro" />
      </StickyWrapper>

      <FeedWrapper>
        <div class="w-full flex flex-col items-center">
          <NuxtImg src="/quests.svg" alt="Quests" :height="90" :width="90" />
          <h1 class="text-center font-bold text-neutral-800 text-2xl my-6">
            Quests
          </h1>
          <p class="text-muted-foreground text-center text-lg mb-6">
            Complete quests by earning points.
          </p>
          <ul class="w-full">
            <div
              v-for="quest in quests"
              class="flex items-center w-full p-4 gap-x-4 border-t-2"
              :key="quest.title"
            >
              <NuxtImg
                src="/points.svg"
                alt="Points"
                :width="60"
                :height="60"
              />
              <div class="flex flex-col gap-y-2 w-full">
                <p class="text-neutral-700 text-xl font-bold">
                  {{ quest.title }}
                </p>
                <Progress
                  :model-value="getProgress(quest)"
                  :max="maxValue"
                  class="h-3"
                />
              </div>
            </div>
          </ul>
        </div>
      </FeedWrapper>
    </div>
  </NuxtLayout>
</template>
