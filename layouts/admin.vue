<script setup lang="ts">
import { ClerkLoaded } from "vue-clerk";
import Sidebar from "~/components/admin/Sidebar.vue";
useHead({
  bodyAttrs: {
    class: "bg-secondary",
  },
});
</script>
<template>
  <ClerkLoaded>
    <div class="flex w-full h-full">
      <Sidebar />
      <main class="h-full pt-2 lg:pt-0">
        <div class="max-w-[1056px] mx-auto pt-6 h-full pl-5">
          <slot />
        </div>
      </main>
    </div>
  </ClerkLoaded>
</template>
