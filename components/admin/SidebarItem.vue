<script setup lang="ts">
import { Button } from "@/components/ui/button";

interface Prop {
  route: {
    id: number;
    url: string;
    name: string;
  };
}
const { route } = defineProps<Prop>();
const active = computed(() => {
  return useRoute().path === route.url;
});
</script>

<template>
  <Button
    :variant="active ? 'sidebarOutline' : 'sidebar'"
    class="justify-start h-[52px]"
    as-child
  >
    <NuxtLink :to="route.url">
      <div class="pt-8 pl-2 pb-7 flex items-center gap-x-3">
        <h1 class="text-lg font-extrabold text-green-600 tracking-wide">
          {{ route.name }}
        </h1>
      </div>
    </NuxtLink>
  </Button>
</template>
