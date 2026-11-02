<script setup lang="ts">
defineProps<{ title: string; description: string; eyebrow?: string }>()
</script>

<template>
  <div class="mb-8 flex flex-wrap items-end justify-between gap-5">
    <div>
      <p v-if="eyebrow" class="eyebrow mb-2">{{ eyebrow }}</p>
      <h1 class="page-title">{{ title }}</h1>
      <p class="mt-2 max-w-2xl text-sm leading-6 text-muted">{{ description }}</p>
    </div>
    <div v-if="$slots.default" class="flex shrink-0 items-center gap-2"><slot /></div>
  </div>
</template>
