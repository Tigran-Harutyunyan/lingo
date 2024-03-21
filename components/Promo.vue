<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <div class="border-2 rounded-xl p-4 space-y-4">
    <div class="space-y-2">
      <div class="flex items-center gap-x-2">
        <NuxtImg src="/unlimited.svg" alt="Pro" :height="26" :width="26" />
        <h3 class="font-bold text-lg">Upgrade to Pro</h3>
      </div>
      <p class="text-muted-foreground">Get unlimited hearts and more!</p>
    </div>
    <Button as-child variant="super" class="w-full" size="lg">
      <NuxtLink to="/shop"> Upgrade today </NuxtLink>
    </Button>
  </div>
</template>
