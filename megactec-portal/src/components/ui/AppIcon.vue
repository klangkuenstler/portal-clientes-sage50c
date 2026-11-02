<script setup lang="ts">
withDefaults(defineProps<{ name: string; size?: number }>(), { size: 20 })

const paths: Record<string, string> = {
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  tool: 'M14.5 6.3a5 5 0 0 0-6.8 6.8L3 17.8a2.3 2.3 0 0 0 3.2 3.2l4.7-4.7a5 5 0 0 0 6.8-6.8l-3.4 3.4-3.2-3.2z',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  back: 'M19 12H5 M11 6l-6 6 6 6',
  chevron: 'm9 5 7 7-7 7',
  external: 'M14 3h7v7 M21 3 10 14 M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5',
  refresh: 'M20 7v5h-5 M4 17v-5h5 M6.1 6a8 8 0 0 1 13.3 2 M17.9 18A8 8 0 0 1 4.6 16',
  appliance: 'M5 3h14v18H5z M8 6h.01 M11 6h5 M16 14a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  clock: 'M12 8v4l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',
  check: 'm8 12 3 3 5-6 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',
  search: 'M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  info: 'M12 11v6 M12 7h.01 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',
  message: 'M21 11a8 8 0 0 1-8 8H8l-5 3V5a2 2 0 0 1 2-2h8a8 8 0 0 1 8 8z M7 8h10 M7 12h7',
  shield: 'M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7z M9 12l2 2 4-4',
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="shrink-0"
  >
    <path :d="paths[name] ?? paths.info" />
  </svg>
</template>
