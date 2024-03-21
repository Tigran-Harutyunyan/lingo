<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useModalsStore } from "@/stores/modals";

const { type, isOpen } = storeToRefs(useModalsStore());

const { onClose } = useModalsStore();

const isModalOpen = computed(() => {
  return isOpen.value && type.value === "practice";
});
</script>

<template>
  <Dialog v-model:open="isModalOpen" @update:open="onClose()">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <div class="flex items-center w-full justify-center mb-5">
          <NuxtImg src="/heart.svg" alt="Heart" :height="100" :width="100" />
        </div>
        <DialogTitle class="text-center font-bold text-2xl">
          Practice lesson
        </DialogTitle>
        <DialogDescription class="text-center text-base">
          Use practice lessons to regain hearts and points. You cannot loose
          hearts or points in practice lessons.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="mb-4">
        <div class="flex flex-col gap-y-4 w-full">
          <Button variant="primary" class="w-full" size="lg" @click="onClose">
            I understand
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
