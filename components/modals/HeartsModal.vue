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
  return isOpen.value && type.value === "hearts";
});

const onClick = () => {
  onClose();
  navigateTo("/store");
};
</script>

<template>
  <Dialog v-model:open="isModalOpen" @update:open="onClose()">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <div class="flex items-center w-full justify-center mb-5">
          <NuxtImg
            src="/mascot_bad.svg"
            alt="Mascot"
            :height="80"
            :width="80"
          />
        </div>
        <DialogTitle class="text-center font-bold text-2xl">
          You ran out of hearts!
        </DialogTitle>
        <DialogDescription class="text-center text-base">
          Get Pro for unlimited hearts, or purchase them in the store.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="mb-4">
        <div class="flex flex-col gap-y-4 w-full">
          <Button variant="primary" class="w-full" size="lg" @click="onClick">
            Get unlimited hearts
          </Button>
          <Button
            variant="dangerOutline"
            class="w-full"
            size="lg"
            @click="onClose"
          >
            No thanks
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
