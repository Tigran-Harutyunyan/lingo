<script setup lang="ts">
import { Loader } from "lucide-vue-next";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  ClerkLoading,
  ClerkLoaded,
  UserButton,
} from "vue-clerk";
import { Button } from "@/components/ui/button";
</script>

<template>
  <header class="h-20 w-full border-b-2 border-slate-200 px-4">
    <div
      class="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full"
    >
      <div class="pt-8 pl-4 pb-7 flex items-center gap-x-3">
        <NuxtImg src="/mascot.svg" :height="40" :width="40" alt="Mascot" />
        <h1 class="text-2xl font-extrabold text-green-600 tracking-wide">
          Lingo
        </h1>
      </div>
      <ClerkLoading>
        <Loader class="h-5 w-5 text-muted-foreground animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton
            v-slot="{ handler }"
            mode="modal"
            afterSignInUrl="/learn"
            afterSignUpUrl="/learn"
          >
            <Button @click="handler" size="lg" variant="ghost"> Login </Button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </div>
  </header>
</template>
