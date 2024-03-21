<script setup lang="ts">
import { useApi } from "@/composables/useApi";

const { getUserProgress, getUserSubscriptions, getTopUsers } = useApi();

const [userProgress, userSubscription, leaderboard] = await Promise.all([
  getUserProgress(),
  getUserSubscriptions(),
  getTopUsers(),
]);

if (!userProgress || !userProgress.activeCourse) {
  navigateTo("/courses");
}
const isPro = !!userSubscription?.isActive;
</script>

<template>
  <NuxtLayout name="main">
    <div class="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper v-if="userProgress">
        <UserProgress
          :activeCourse="userProgress?.activeCourse"
          :hearts="userProgress.hearts"
          :points="userProgress.points"
          :hasActiveSubscription="isPro"
        />

        <Promo v-if="!isPro" />

        <Quests :points="userProgress.points" />
      </StickyWrapper>
      <FeedWrapper>
        <div class="w-full flex flex-col items-center">
          <NuxtImg
            src="/leaderboard.svg"
            alt="Leaderboard"
            :height="90"
            :width="90"
          />
          <h1 class="text-center font-bold text-neutral-800 text-2xl my-6">
            Leaderboard
          </h1>
          <p class="text-muted-foreground text-center text-lg mb-6">
            See where you stand among other learners in the community.
          </p>
          <Separator class="mb-4 h-0.5 rounded-full" />
          <template v-if="userProgress">
            <div
              v-for="(userProgress, index) in leaderboard"
              :key="userProgress?.userId"
              class="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
            >
              <p class="font-bold text-lime-700 mr-4">{{ index + 1 }}</p>
              <Avatar class="border bg-green-500 h-12 w-12 ml-3 mr-6">
                <AvatarImage
                  class="object-cover"
                  :src="userProgress?.userImageSrc"
                />
              </Avatar>
              <p class="font-bold text-neutral-800 flex-1">
                {{ userProgress?.userName }}
              </p>
              <p class="text-muted-foreground">{{ userProgress?.points }} XP</p>
            </div>
          </template>
        </div>
      </FeedWrapper>
    </div>
  </NuxtLayout>
</template>
