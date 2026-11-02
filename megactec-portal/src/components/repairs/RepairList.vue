<script setup lang="ts">
import type { RepairSummary } from '@/types/repair'
import { formatDate } from '@/utils/format'
import AppIcon from '@/components/ui/AppIcon.vue'
import StatusBadge from './StatusBadge.vue'

defineProps<{ repairs: RepairSummary[] }>()
</script>

<template>
  <div class="panel overflow-hidden">
    <div
      class="hidden grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_24px] gap-4 border-b border-line bg-surface-muted/60 px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted lg:grid"
      aria-hidden="true"
    >
      <span>Equipamento / Processo</span><span>Estado atual</span><span>Última atualização</span
      ><span />
    </div>
    <ul class="divide-y divide-line">
      <li v-for="repair in repairs" :key="repair.id">
        <RouterLink
          :to="{ name: 'repair-detail', params: { id: repair.id } }"
          class="group grid items-center gap-4 px-5 py-5 transition-colors hover:bg-surface-muted/70 focus-visible:-outline-offset-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_24px] lg:px-6"
        >
          <div class="flex min-w-0 items-center gap-3.5">
            <div class="rounded-xl bg-surface-muted p-3 text-muted">
              <AppIcon name="appliance" :size="23" />
            </div>
            <div class="min-w-0">
              <p class="font-medium text-ink group-hover:text-brand-ink">
                {{ repair.equipment.name }}
              </p>
              <p class="mt-1 text-xs text-muted">
                {{ repair.equipment.brand ?? 'Marca não disponível' }}
                <span aria-hidden="true">·</span> {{ repair.displayNumber }}
              </p>
            </div>
          </div>
          <div><StatusBadge :status="repair.status" /></div>
          <div class="flex items-center justify-between text-sm text-muted">
            <span
              ><span class="lg:hidden">Atualização: </span>{{ formatDate(repair.updatedAt) }}</span
            >
            <AppIcon name="arrow" :size="18" class="text-brand-ink lg:hidden" />
          </div>
          <AppIcon
            name="chevron"
            :size="18"
            class="hidden text-muted transition-transform group-hover:translate-x-0.5 lg:block"
          />
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
