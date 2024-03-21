<script setup lang="ts">
import Quiz from "@/components/lesson/Quiz.vue";

import { useApi } from "@/composables/useApi";

const { lessonId } = useRoute().params;

const { getUserProgress, getUserSubscriptions, getLesson } = useApi();

const [lesson, userProgress, userSubscription] = await Promise.all([
  getLesson(Number(lessonId)),
  getUserProgress(),
  getUserSubscriptions(),
]);

const hasChallengeOptions = (lesson) => {
  return lesson.challenges.every(
    (challenge) => challenge.challengeOptions.length !== 0
  );
};

if (!lesson || !userProgress || !hasChallengeOptions) {
  navigateTo("/learn");
}

const getPercentage = () => {
  return (
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100
  );
};
</script>

<template>
  <NuxtLayout name="lesson">
    <Quiz
      v-if="lesson && userProgress"
      :initialLessonId="lesson.id"
      :initialLessonChallenges="lesson.challenges"
      :initialHearts="userProgress.hearts"
      :initialPercentage="getPercentage()"
      :userSubscription="userSubscription"
    />
  </NuxtLayout>
</template>
