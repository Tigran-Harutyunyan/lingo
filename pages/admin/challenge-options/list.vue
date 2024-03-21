<script setup lang="ts">
interface option {
  id: number;
  text: string;
  imageSrc: string | null;
  challengeId: number;
  correct: boolean;
  audioSrc: string | null;
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const challengeOptions = ref<option[]>([]);

const response = await $fetch("/api/admin/challenge-options/list");

if (response && Array.isArray(response)) {
  challengeOptions.value = response;
}
</script>

<template>
  <NuxtLayout name="admin">
    <AdminPageTitle> A list of challenge options</AdminPageTitle>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Challenge ID</TableHead>
          <TableHead>Text</TableHead>
          <TableHead>Image Source</TableHead>
          <TableHead>Audio Source</TableHead>
          <TableHead>Correct</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-if="challengeOptions">
        <TableRow v-for="challenge in challengeOptions">
          <TableCell class="font-medium">{{ challenge.id }} </TableCell>
          <TableCell>{{ challenge.challengeId }}</TableCell>
          <TableCell>{{ challenge.text }}</TableCell>
          <TableCell>{{ challenge.imageSrc }}</TableCell>
          <TableCell>{{ challenge.audioSrc }}</TableCell>

          <TableCell>{{ challenge.correct ? "Yes" : "No" }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </NuxtLayout>
</template>
