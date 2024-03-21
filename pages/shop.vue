<script setup lang="ts">
import { useApi } from "@/composables/useApi";
import ShopItems from "@/components/ShopItems.vue";

definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "Lingo | Shop",
});

const { getUserProgress, getUserSubscriptions } = useApi();

const [userProgress, userSubscription] = await Promise.all([
  getUserProgress(),
  getUserSubscriptions(),
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
          <NuxtImg src="/shop.svg" alt="shop" :height="90" :width="90" />
          <h1 class="text-center font-bold text-neutral-800 text-2xl my-6">
            Shop
          </h1>
          <p class="text-muted-foreground text-center text-lg mb-6">
            Spend your points on cool stuff.
          </p>
          <ShopItems
            v-if="userProgress"
            :hearts="userProgress.hearts"
            :points="userProgress.points"
            :hasActiveSubscription="isPro"
          />
        </div>
      </FeedWrapper>
    </div>
  </NuxtLayout>
</template>
