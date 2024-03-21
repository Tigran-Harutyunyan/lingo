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
  return isOpen.value && type.value === "exit";
});

const onEnd = () => {
  onClose();
  navigateTo("/learn");
};
</script>

<template>
  <Dialog v-model:open="isModalOpen" @update:open="onClose()">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <div class="flex items-center w-full justify-center mb-5">
          <NuxtImg
            src="/mascot_sad.svg"
            alt="Mascot"
            :height="80"
            :width="80"
          />
        </div>
        <DialogTitle class="text-center font-bold text-2xl">
          Wait, don&apos;t go!
        </DialogTitle>
        <DialogDescription class="text-center text-base">
          You&apos;re about to leave the lesson. Are you sure?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="mb-4">
        <div class="flex flex-col gap-y-4 w-full">
          <Button variant="primary" class="w-full" size="lg" @click="onClose">
            Keep learning
          </Button>
          <Button
            variant="dangerOutline"
            class="w-full"
            size="lg"
            @click="onEnd"
          >
            End session
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
