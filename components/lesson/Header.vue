<script setup lang="ts">
import { InfinityIcon, X } from "lucide-vue-next";

import { Progress } from "@/components/ui/progress";
import { useModalsStore } from "@/stores/modals";

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};

const { hearts, percentage, hasActiveSubscription } = defineProps<Props>();

const { onOpen } = useModalsStore();
</script>

<template>
  <header
    class="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full"
  >
    <X
      @click="onOpen('exit')"
      class="text-slate-500 hover:opacity-75 transition cursor-pointer"
    />
    <Progress :model-value="percentage" />
    <div class="text-rose-500 flex items-center font-bold">
      <NuxtImg
        src="/heart.svg"
        :height="28"
        :width="28"
        alt="Heart"
        class="mr-2"
      />

      <InfinityIcon
        v-if="hasActiveSubscription"
        class="h-6 w-6 stroke-[3] shrink-0"
      />
      <span v-else> {{ hearts }} </span>
    </div>
  </header>
</template>
