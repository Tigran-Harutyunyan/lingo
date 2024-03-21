<script setup lang="ts">
import { type lessons as lessonsType, units } from "@/db/schema";

import UnitBanner from "./UnitBanner.vue";
import LessonButton from "./LessonButton.vue";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessonsType.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson:
    | (typeof lessonsType.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;
  activeLessonPercentage: number;
};

const {
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
} = defineProps<Props>();

const isCurrent = (lesson) => lesson.id === activeLesson?.id;
const isLocked = (lesson) => !lesson.completed && !isCurrent(lesson);
</script>

<template>
  <UnitBanner :title="title" :description="description" />
  <div class="flex items-center flex-col relative mt-5">
    <LessonButton
      v-for="(lesson, index) in lessons"
      :key="lesson.id"
      :id="lesson.id"
      :index="index"
      :totalCount="lessons.length - 1"
      :current="isCurrent(lesson)"
      :locked="isLocked(lesson)"
      :percentage="activeLessonPercentage"
    />
  </div>
</template>
