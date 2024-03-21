<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

interface course {
  id: number;
  imageSrc: string;
  title: string;
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AdminPageTitle from "@/components/admin/AdminPageTitle.vue";

const courses = ref<course[]>([]);

const response = await $fetch("/api/admin/courses/list");

if (response && Array.isArray(response)) {
  courses.value = response;
}
</script>

<template>
  <NuxtLayout name="admin">
    <AdminPageTitle>A list of courses</AdminPageTitle>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image source</TableHead>
          <TableHead>Title</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-if="courses">
        <TableRow v-for="course in courses">
          <TableCell>{{ course.title }}</TableCell>
          <TableCell>{{ course.imageSrc }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </NuxtLayout>
</template>
