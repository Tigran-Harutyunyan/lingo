<script setup lang="ts">
interface uniit {
  id: number;
  title: string;
  description: string;
  courseId: number;
  order: number;
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

const units = ref<uniit[]>([]);

const response = await $fetch("/api/admin/units/list");

if (response && Array.isArray(response)) {
  units.value = response;
}
</script>

<template>
  <NuxtLayout name="admin">
    <AdminPageTitle>A list of units</AdminPageTitle>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Course ID</TableHead>
          <TableHead>Order</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-if="units">
        <TableRow v-for="unit in units">
          <TableCell>{{ unit.id }}</TableCell>
          <TableCell>{{ unit.title }}</TableCell>
          <TableCell>{{ unit.description }}</TableCell>
          <TableCell>{{ unit.courseId }}</TableCell>
          <TableCell>{{ unit.order }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </NuxtLayout>
</template>
