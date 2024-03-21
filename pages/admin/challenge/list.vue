<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

interface challenge {
  id: number;
  order: number;
  lessonId: number;
  type: "SELECT" | "ASSIST";
  question: string;
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const challenges = ref<challenge[]>([]);

const response = await $fetch("/api/admin/challenges/list");

if (response && Array.isArray(response)) {
  challenges.value = response;
}
</script>

<template>
  <NuxtLayout name="admin">
    <AdminPageTitle> A list of challenges</AdminPageTitle>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Lesson Id</TableHead>
          <TableHead>Order</TableHead>
          <TableHead>Questions</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-if="challenges">
        <TableRow v-for="challenge in challenges">
          <TableCell class="font-medium">{{ challenge.id }} </TableCell>
          <TableCell>{{ challenge.lessonId }}</TableCell>
          <TableCell>{{ challenge.order }}</TableCell>
          <TableCell>{{ challenge.question }}</TableCell>
          <TableCell>{{ challenge.type }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </NuxtLayout>
</template>
