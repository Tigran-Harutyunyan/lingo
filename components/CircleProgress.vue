<script setup lang="ts">
interface Props {
  className?: string;
  percentage: number;
  stroke?: string;
  background?: string;
}

const { className, percentage, stroke, background } = withDefaults(
  defineProps<Props>(),
  {
    stroke: "#4ade80",
    background: "#e5e7eb",
    size: 105,
  }
);
</script>

<template>
  <svg
    width="250"
    height="250"
    viewBox="0 0 250 250"
    class="circular-progress"
    :class="className"
  >
    <circle class="bg"></circle>
    <circle class="fg"></circle>
  </svg>
</template>
<style scoped>
.circular-progress {
  --size: 105px;
  --half-size: calc(var(--size) / 2);
  --stroke-width: 9px;
  --radius: calc((var(--size) - var(--stroke-width)) / 2);
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc((var(--progress) * var(--circumference)) / 100);
  animation: progress-animation 1s linear 0s 1 forwards;
}

.circular-progress circle {
  cx: var(--half-size);
  cy: var(--half-size);
  r: var(--radius);
  stroke-width: var(--stroke-width);
  fill: none;
  stroke-linecap: round;
}

.circular-progress circle.bg {
  stroke: v-bind("background");
}

.circular-progress circle.fg {
  transform: rotate(-90deg);
  transform-origin: var(--half-size) var(--half-size);
  stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s;
  stroke: v-bind("stroke");
}

@property --progress {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}

@keyframes progress-animation {
  from {
    --progress: 0;
  }
  to {
    --progress: v-bind("percentage");
  }
}
</style>
