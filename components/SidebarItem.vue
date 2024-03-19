<script setup lang="ts">
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};

const { label, iconSrc, href } = defineProps<Props>();

const active = computed(() => {
  return useRoute().path === href;
});
</script>

<template>
  <Button
    :variant="active ? 'sidebarOutline' : 'sidebar'"
    class="justify-start h-[52px]"
    as-child
  >
    <NuxtLink :to="href">
      <NuxtImg
        :src="iconSrc"
        :alt="label"
        class="mr-5"
        :height="32"
        :width="32"
      />
      {{ label }}
    </NuxtLink>
  </Button>
</template>
