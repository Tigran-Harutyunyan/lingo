<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import ModalsContainer from "@/components/modals/ModalsContainer.vue";
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
  <ModalsContainer />
</template>
