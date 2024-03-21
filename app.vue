<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import ModalsContainer from "@/components/modals/ModalsContainer.vue";
</script>
<template>
  <NuxtLoadingIndicator color="#4ade80" :height="6" />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
  <ModalsContainer />
</template>
