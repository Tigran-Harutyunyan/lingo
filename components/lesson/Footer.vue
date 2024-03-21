<script setup lang="ts">
import { CheckCircle, XCircle } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const emit = defineEmits(["onCheck"]);
type Props = {
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  lessonId?: number;
};
const { status, disabled, lessonId } = defineProps<Props>();

// useKey("Enter", onCheck, {}, [onCheck]);
const isMobile = useMediaQuery("(max-width: 1024px)");

const getStatusText = (status: string) => {
  switch (status) {
    case "none":
      return "Check";
    case "correct":
      return "Next";
    case "wrong":
      return "Retry";
    case "completed":
      return "Continue";
    default:
      break;
  }
};

const onPractiveAgain = () => {
  window.location.href = `/lessons/${lessonId}`;
};
</script>

<template>
  <footer
    :class="
      cn(
        'lg:-h[140px] h-[100px] border-t-2',
        status === 'correct' && 'border-transparent bg-green-100',
        status === 'wrong' && 'border-transparent bg-rose-100'
      )
    "
  >
    <div
      class="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10"
    >
      <div
        v-if="status === 'correct'"
        class="text-green-500 font-bold text-base lg:text-2xl flex items-center"
      >
        <CheckCircle class="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
        Nicely done!
      </div>

      <div
        v-if="status === 'wrong'"
        class="text-rose-500 font-bold text-base lg:text-2xl flex items-center"
      >
        <XCircle class="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
        Try again.
      </div>
      <ClientOnly>
        <Button
          v-if="status === 'completed'"
          variant="default"
          :size="isMobile ? 'sm' : 'lg'"
          @click="onPractiveAgain"
        >
          Practice again
        </Button>
      </ClientOnly>
      <Button
        :disabled="disabled"
        class="ml-auto"
        @click="emit('onCheck')"
        :size="isMobile ? 'sm' : 'lg'"
        :variant="status === 'wrong' ? 'danger' : 'secondary'"
      >
        {{ getStatusText(status) }}
      </Button>
    </div>
  </footer>
</template>
