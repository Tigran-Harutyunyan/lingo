<script setup lang="ts">
import Header from "@/components/marketing/Header.vue";
import Footer from "@/components/marketing/Footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1 flex flex-col items-center justify-center">
      <slot />
    </main>
    <Footer />
  </div>
</template>
