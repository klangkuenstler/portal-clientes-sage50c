<script setup lang="ts">
import type { RepairSummary, StatusTone } from '@/types/repair'
defineProps<{ status: RepairSummary['status'] }>()

const tones: Record<StatusTone, string> = {
  neutral: 'bg-stone-100 text-stone-600 ring-stone-200',
  info: 'bg-blue-50 text-blue-800 ring-blue-100',
  warning: 'bg-amber-50 text-amber-900 ring-amber-200/70',
  success: 'bg-emerald-50 text-emerald-800 ring-emerald-100',
}
</script>

<template>
  <span
    class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset"
    :class="tones[status.tone] ?? tones.neutral"
  >
    <span class="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
    {{ status.label }}
  </span>
</template>
