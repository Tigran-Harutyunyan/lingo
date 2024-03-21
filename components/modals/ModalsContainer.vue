<script setup lang="ts">
import { useModalsStore } from "@/stores/modals";

const { type } = storeToRefs(useModalsStore());

import ExitModal from "@/components/modals/ExitModal.vue";
import HeartsModal from "@/components/modals/HeartsModal.vue";
import PracticeModal from "@/components/modals/PracticeModal.vue";

const computedComponent = computed(() => {
  if (type.value !== null) {
    switch (type.value) {
      case "exit":
        return ExitModal;
      case "hearts":
        return HeartsModal;
      case "practice":
        return PracticeModal;
    }
  }

  return null;
});
</script>

<template>
  <component :is="computedComponent" />
</template>
