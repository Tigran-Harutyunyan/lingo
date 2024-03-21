<script setup lang="ts">
import { ClerkLoaded } from "vue-clerk";
</script>
<template>
  <ClerkLoaded>
    <slot></slot>
  </ClerkLoaded>
</template>
