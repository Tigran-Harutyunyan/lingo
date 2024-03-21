<script setup lang="ts">
import List from "@/components/courses/List.vue";

const coursesData = $fetch("/api/courses");

const userProgressData = $fetch(`/api/progress`);

const isLoading = ref(true);
const [courses, userProgress] = await Promise.all([
  coursesData,
  userProgressData,
]);

isLoading.value = false;
</script>

<template>
  <NuxtLayout name="main">
    <div class="h-full max-w-[912px] px-3 mx-auto">
      <h1 class="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <List :courses="courses" :activeCourseId="userProgress?.activeCourseId" />
    </div>
  </NuxtLayout>
</template>
