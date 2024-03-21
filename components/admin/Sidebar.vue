<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue";
interface route {
  id: number;
  url: string;
  name: string;
}
const routes = ref<route[]>([
  {
    id: 1,
    name: "Challenges",
    url: "/admin/challenge/list",
  },
  {
    id: 2,
    name: "Courses",
    url: "/admin/courses/list",
  },
  {
    id: 3,
    name: "Units",
    url: "/admin/units/list",
  },
  {
    id: 4,
    name: "Lessons",
    url: "/admin/lessons/list",
  },
  {
    id: 5,
    name: "Challenge options",
    url: "/admin/challenge-options/list",
  },
]);
</script>

<template>
  <div :class="'flex h-full pt-4 px-4 border-r-2 flex-col'">
    <SidebarItem :route="route" v-for="route in routes" />
  </div>
</template>
