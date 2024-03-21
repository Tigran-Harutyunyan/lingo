<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <footer class="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
    <div
      class="max-w-screen-lg mx-auto flex items-center justify-evenly h-full"
    >
      <Button size="lg" variant="ghost" class="w-full">
        <NuxtImg
          src="/hr.svg"
          alt="Croatian"
          :height="32"
          :width="40"
          class="mr-4 rounded-md"
        />
        Croatian
      </Button>
      <Button size="lg" variant="ghost" class="w-full">
        <NuxtImg
          src="/es.svg"
          alt="Spanish"
          :height="32"
          :width="40"
          class="mr-4 rounded-md"
        />
        Spanish
      </Button>
      <Button size="lg" variant="ghost" class="w-full">
        <NuxtImg
          src="/fr.svg"
          alt="French"
          :height="32"
          :width="40"
          class="mr-4 rounded-md"
        />
        French
      </Button>
      <Button size="lg" variant="ghost" class="w-full">
        <NuxtImg
          src="/it.svg"
          alt="Italian"
          :height="32"
          :width="40"
          class="mr-4 rounded-md"
        />
        Italian
      </Button>
      <Button size="lg" variant="ghost" class="w-full">
        <NuxtImg
          src="/jp.svg"
          alt="Japanese"
          :height="32"
          :width="40"
          class="mr-4 rounded-md"
        />
        Japanese
      </Button>
    </div>
  </footer>
</template>
