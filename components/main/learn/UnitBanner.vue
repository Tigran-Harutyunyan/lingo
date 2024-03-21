<script setup lang="ts">
import { NotebookText } from "lucide-vue-next";

import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description: string;
};
const { title, description } = defineProps<Props>();
</script>

<template>
  <div
    class="w-full rounded-xl bg-green-500 p-5 text-white flex items-center justify-between"
  >
    <div class="space-y-2.5">
      <h3 class="text-2xl font-bold">
        {{ title }}
      </h3>
      <p class="text-lg">
        {{ description }}
      </p>
    </div>
    <NuxtLink to="/lesson">
      <Button
        size="lg"
        variant="secondary"
        class="hidden xl:flex border-2 border-b-4 active:border-b-2"
      >
        <NotebookText class="mr-2" />
        Continue
      </Button>
    </NuxtLink>
  </div>
</template>
