<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ClerkLoading, ClerkLoaded, UserButton } from "vue-clerk";

type Props = {
  className?: string;
};
const { className } = defineProps<Props>();
</script>

<template>
  <div
    :class="
      cn(
        'flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col',
        className
      )
    "
  >
    <NuxtLink to="/learn">
      <div class="pt-8 pl-4 pb-7 flex items-center gap-x-3">
        <NuxtImg src="/mascot.svg" :height="40" :width="40" alt="Mascot" />
        <h1 class="text-2xl font-extrabold text-green-600 tracking-wide">
          Lingo
        </h1>
      </div>
    </NuxtLink>
    <div class="flex flex-col gap-y-2 flex-1">
      <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg" />
      <SidebarItem
        label="Leaderboard"
        href="/leaderboard"
        iconSrc="/leaderboard.svg"
      />
      <SidebarItem label="quests" href="/quests" iconSrc="/quests.svg" />
      <SidebarItem label="shop" href="/shop" iconSrc="/shop.svg" />
    </div>
    <div class="p-4">
      <ClerkLoading>
        <Loader class="h-5 w-5 text-muted-foreground animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton afterSignOutUrl="/" />
      </ClerkLoaded>
    </div>
  </div>
</template>
