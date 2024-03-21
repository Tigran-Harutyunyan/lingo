<script setup lang="ts">
interface lesson {
  id: number;
  title: string;
  order: number;
  unitId: number;
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

const lessons = ref<lesson[]>([]);

const response = await $fetch("/api/admin/lessons/list");

if (response && Array.isArray(response)) {
  lessons.value = response;
}
</script>

<template>
  <NuxtLayout name="admin">
    <AdminPageTitle>A list of lessons</AdminPageTitle>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Order</TableHead>
          <TableHead>Unit ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-if="lessons">
        <TableRow v-for="unit in lessons">
          <TableCell>{{ unit.id }}</TableCell>
          <TableCell>{{ unit.title }}</TableCell>
          <TableCell>{{ unit.order }}</TableCell>
          <TableCell>{{ unit.unitId }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </NuxtLayout>
</template>
