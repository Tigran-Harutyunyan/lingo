<script setup lang="ts">
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-vue-next";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <Sheet>
    <SheetTrigger>
      <Menu class="text-white" />
    </SheetTrigger>
    <SheetContent class="p-0 z-[100]" side="left">
      <Sidebar />
    </SheetContent>
  </Sheet>
</template>
