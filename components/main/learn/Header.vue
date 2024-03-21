<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
};

const { title } = defineProps<Props>();
</script>

<template>
  <div
    class="sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50"
  >
    <NuxtLink to="/courses">
      <Button variant="ghost" size="sm">
        <ArrowLeft class="h-5 w-5 stroke-2 text-neutral-400" />
      </Button>
    </NuxtLink>
    <h1 class="font-bold text-lg">
      {{ title }}
    </h1>
    <div />
  </div>
</template>
