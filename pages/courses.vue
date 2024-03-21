<script setup lang="ts">
import List from "@/components/courses/List.vue";
import { useApi } from "@/composables/useApi";

const { getCourses, getUserProgress } = useApi();

definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "Lingo | Courses",
});

const isLoading = ref(true);
const [courses, userProgress] = await Promise.all([
  getCourses(),
  getUserProgress(),
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
