<script setup lang="ts">
import { Loader } from "lucide-vue-next";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  ClerkLoaded,
} from "vue-clerk";
import { Button } from "@/components/ui/button";

useHead({
  title: "Lingo | Home",
});
</script>

<template>
  <NuxtLayout name="marketing">
    <div
      class="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2"
    >
      <div
        class="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0"
      >
        <NuxtImg src="/hero.svg" fill alt="Hero" />
      </div>
      <div class="flex flex-col items-center gap-y-8">
        <h1
          class="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center"
        >
          Learn, practice, and master new languages with Lingo.
        </h1>
        <div class="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                v-slot="{ handler }"
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button
                  @click="handler"
                  size="lg"
                  variant="secondary"
                  class="w-full"
                >
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton
                v-slot="{ handler }"
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button
                  @click="handler"
                  size="lg"
                  variant="primaryOutline"
                  class="w-full"
                >
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn v-slot="{ handler }">
              <Button
                @click="handler"
                size="lg"
                variant="secondary"
                class="w-full"
                asChild
              >
                <NuxtLink to="/learn"> Continue Learning </NuxtLink>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
