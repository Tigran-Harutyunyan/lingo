<script setup lang="ts">
import { InfinityIcon } from "lucide-vue-next";

import { courses } from "@/db/schema";
import { Button } from "@/components/ui/button";

type Props = {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const { activeCourse, points, hearts, hasActiveSubscription } =
  defineProps<Props>();
</script>

<template>
  <div class="flex items-center justify-between gap-x-2 w-full">
    <NuxtLink to="/courses" v-if="activeCourse">
      <Button variant="ghost">
        <NuxtImg
          :src="activeCourse.imageSrc"
          :alt="activeCourse.title"
          class="rounded-md border"
          :height="32"
          :width="32"
        />
      </Button>
    </NuxtLink>
    <NuxtLink to="/shop">
      <Button variant="ghost" class="text-orange-500">
        <NuxtImg
          src="/points.svg"
          :height="28"
          :width="28"
          alt="Points"
          class="mr-2"
        />
        {{ points }}
      </Button>
    </NuxtLink>
    <NuxtLink to="/shop">
      <Button variant="ghost" class="text-rose-500">
        <NuxtImg
          src="/heart.svg"
          :height="22"
          :width="22"
          alt="Hearts"
          class="mr-2"
        />
        <InfinityIcon v-if="hasActiveSubscription" class="h-4 w-4 stroke-[3]" />
        <span v-else>{{ hearts }}</span>
      </Button>
    </NuxtLink>
  </div>
</template>
