<script setup lang="ts">
import ConfettiExplosion from "vue-confetti-explosion";

import {
  challengeOptions,
  challenges as challengeTable,
  userSubscription as userSubscriptionTable,
} from "@/db/schema";

import Footer from "./Footer.vue";
import Header from "./Header.vue";
import QuestionBubble from "./QuestionBubble.vue";
import Challenge from "./Challenge.vue";
import ResultCard from "./ResultCard.vue";
import { toast } from "vue-sonner";
import { useSound } from "@/composables/useSound";
import { useModalsStore } from "@/stores/modals";

const { onOpen } = useModalsStore();

const router = useRouter();

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challengeTable.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription:
    | (typeof userSubscriptionTable.$inferSelect & {
        isActive: boolean;
      })
    | null;
};

const {
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
} = defineProps<Props>();

const { play: playFinish } = useSound("/finish.mp3");
const { play: playCorrect } = useSound("/correct.wav");
const { play: playIncorrect } = useSound("/incorrect.wav");

const lessonId = ref(initialLessonId);
const hearts = ref(initialHearts);
const percentage = ref(initialPercentage === 100 ? 0 : initialPercentage);
const challenges = ref(initialLessonChallenges);

const getInitialIndex = () => {
  const uncompletedIndex = challenges.value.findIndex(
    (challenge) => !challenge.completed
  );
  return uncompletedIndex === -1 ? 0 : uncompletedIndex;
};
const activeIndex = ref(getInitialIndex());
const selectedOption = ref<number>();
const status = ref<"correct" | "wrong" | "none">("none");

const challenge = computed(() => {
  return challenges.value[activeIndex.value];
});

const options = computed(() => {
  return challenge.value?.challengeOptions ?? [];
});

const onNext = () => {
  activeIndex.value++;
};

const onSelect = (id: number) => {
  if (status.value !== "none") return;

  selectedOption.value = id;
};

const onContinue = async () => {
  if (!selectedOption.value) return;

  if (status.value === "wrong") {
    status.value = "none";
    selectedOption.value = undefined;
    return;
  }

  if (status.value === "correct") {
    onNext();
    status.value = "none";
    selectedOption.value = undefined;
    return;
  }

  const correctOption = options.value.find((option) => option.correct);

  if (!correctOption) {
    return;
  }

  if (correctOption.id === selectedOption.value) {
    try {
      const response = await $fetch(
        `/api/challenge-progress?challengeId=${challenge.value.id}`
      );

      if (response?.error === "hearts") {
        onOpen("hearts");
        return;
      }

      playCorrect();
      status.value = "correct";
      percentage.value = percentage.value + 100 / challenges.value.length;

      // This is a practice
      if (initialPercentage === 100) {
        hearts.value = Math.min(hearts.value + 1, 5);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  } else {
    try {
      const response = await $fetch(
        `/api/reduce-hearts?challengeId=${challenge.value.id}`
      );

      if (response?.error === "hearts") {
        onOpen("hearts");
        return;
      }

      playIncorrect();
      status.value = "wrong";

      if (!response?.error) {
        hearts.value = Math.max(hearts.value - 1, 0);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }
};

const title = computed(() => {
  return challenge.value.type === "ASSIST"
    ? "Select the correct meaning"
    : challenge.value.question;
});

const pending = false;

onMounted(() => {
  if (initialPercentage === 100) {
    onOpen("practice");
  }
});

watch(
  () => challenge.value,
  (newVal) => {
    if (!newVal) {
      playFinish();
    }
  }
);
</script>

<template>
  <template v-if="!challenge">
    <ClientOnly>
      <div class="flex justify-center">
        <ConfettiExplosion :particleCount="200" :force="0.3" />
      </div>
    </ClientOnly>
    <div
      class="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full"
    >
      <NuxtImg
        src="/finish.svg"
        alt="Finish"
        class="hidden lg:block"
        :height="100"
        :width="100"
      />
      <NuxtImg
        src="/finish.svg"
        alt="Finish"
        class="block lg:hidden"
        :height="50"
        :width="50"
      />
      <h1 class="text-xl lg:text-3xl font-bold text-neutral-700">
        Great job! <br />
        You&apos;ve completed the lesson.
      </h1>
      <div class="flex items-center gap-x-4 w-full">
        <ResultCard variant="points" :value="challenges.length * 10" />
        <ResultCard variant="hearts" :value="hearts" />
      </div>
    </div>
    <Footer
      :lessonId="lessonId"
      status="completed"
      @onCheck="router.push('/learn')"
    />
  </template>

  <template v-else>
    <Header
      :hearts="hearts"
      :percentage="percentage"
      :hasActiveSubscription="!!userSubscription?.isActive"
    />
    <div class="flex-1">
      <div class="h-full flex items-center justify-center">
        <div
          class="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12"
        >
          <h1
            class="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700"
          >
            {{ title }}
          </h1>
          <div>
            <QuestionBubble
              v-if="challenge.type === 'ASSIST'"
              :question="challenge.question"
            />

            <Challenge
              :options="options"
              @onSelect="onSelect"
              :status="status"
              :selectedOption="selectedOption"
              :disabled="pending"
              :type="challenge.type"
            />
          </div>
        </div>
      </div>
    </div>
    <Footer
      :disabled="pending || !selectedOption"
      :status="status"
      @onCheck="onContinue"
    />
  </template>
</template>
