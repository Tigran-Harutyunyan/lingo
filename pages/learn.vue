<script setup lang="ts">
import Unit from "@/components/main/learn/Unit.vue";
import Header from "@/components/main/learn/Header.vue";
import { lessons, units as unitsSchema } from "@/db/schema";
import { useApi } from "@/composables/useApi";

definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "Lingo | Learn",
});

const {
  getUserProgress,
  getUnits,
  getUserSubscriptions,
  getLessonPercentage,
  getCoursProgress,
} = useApi();

const [
  userProgress,
  units,
  userSubscription,
  lessonPercentage,
  courseProgress,
] = await Promise.all([
  getUserProgress(),
  getUnits(),
  getUserSubscriptions(),
  getLessonPercentage(),
  getCoursProgress(),
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
        <Header v-if="userProgress" :title="userProgress?.activeCourse.title" />
        <template v-if="units">
          <div v-for="unit in units" :key="unit.id" class="mb-10">
            <Unit
              :id="unit.id!"
              :order="unit.order"
              :description="unit.description"
              :title="unit.title"
              :lessons="unit.lessons"
              :activeLesson="(courseProgress?.activeLesson as typeof lessons.$inferSelect & {
                unit: typeof unitsSchema.$inferSelect;
              } | undefined)"
              :activeLessonPercentage="lessonPercentage"
            />
          </div>
        </template>
      </FeedWrapper>
    </div>
  </NuxtLayout>
</template>
