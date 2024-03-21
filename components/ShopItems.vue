<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { toast } from "vue-sonner";
import { POINTS_TO_REFILL } from "@/constants";
import { useApi } from "@/composables/useApi";

const { refillHearts } = useApi();

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const { hearts, points, hasActiveSubscription } = defineProps<Props>();

const localHearts = ref(hearts);

const pending = ref(false);

const onRefillHearts = async () => {
  if (pending.value || localHearts.value === 5 || points < POINTS_TO_REFILL) {
    return;
  }

  pending.value = true;

  try {
    const response = await refillHearts();

    if (response && "heart" in response) {
      localHearts.value = response.heart as number;
    }
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    pending.value = false;
  }
};

const onUpgrade = async () => {
  pending.value = true;
  try {
    const response = await $fetch("/api/stripe", {
      method: "POST",
    });

    debugger;

    if (response && typeof response === "object" && "url" in response) {
      window.location.href = response.url as string;
    }
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    pending.value = false;
  }
};
</script>

<template>
  <ul class="w-full">
    <div class="flex items-center w-full p-4 gap-x-4 border-t-2">
      <Nuxt src="/heart.svg" alt="Heart" :height="60" :width="60" />
      <div class="flex-1">
        <p class="text-neutral-700 text-base lg:text-xl font-bold">
          Refill hearts
        </p>
      </div>
      <Button
        @click="onRefillHearts"
        :disabled="pending || localHearts === 5 || points < POINTS_TO_REFILL"
      >
        <div v-if="localHearts === 5">full</div>
        <div v-else class="flex items-center">
          <NuxtImg src="/points.svg" alt="Points" :height="20" :width="20" />
          <p>
            {{ POINTS_TO_REFILL }}
          </p>
        </div>
      </Button>
    </div>
    <div class="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
      <NuxtImg src="/unlimited.svg" alt="Unlimited" :height="60" :width="60" />
      <div class="flex-1">
        <p class="text-neutral-700 text-base lg:text-xl font-bold">
          Unlimited hearts
        </p>
      </div>
      <Button @click="onUpgrade()" :disabled="pending">
        {{ hasActiveSubscription ? "settings" : "upgrade" }}
      </Button>
    </div>
  </ul>
</template>
