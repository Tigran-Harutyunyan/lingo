<script setup lang="ts">
import { courses as coursesImported, userProgress } from "@/db/schema";
import Card from "./Card.vue";
import { toast } from "vue-sonner";

const router = useRouter();

type Props = {
  courses: (typeof coursesImported.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

const { courses, activeCourseId } = defineProps<Props>();

const isLoading = ref(false);

const onClick = async (id: number) => {
  if (isLoading.value) return;

  if (id === activeCourseId) {
    return router.push("/learn");
  }

  isLoading.value = true;

  try {
    const data = await $fetch(`/api/user/upsert?courseId=${id}`);

    if (data && "activeCourse" in data) {
      navigateTo("learn");
    }

    if (data?.error) {
      toast.error(data.error);
    }
  } catch (error) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4"
  >
    <Card
      v-for="course in courses"
      :key="course.id"
      :id="course.id"
      :title="course.title"
      :imageSrc="course.imageSrc"
      :disabled="isLoading"
      :active="course.id === activeCourseId"
      @onClick="onClick"
    />
  </div>

  <Loader class="mt-4" v-if="isLoading" />
</template>
