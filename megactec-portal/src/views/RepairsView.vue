<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDemoStore } from '@/stores/demo'
import { getRepairService } from '@/services'
import { useResource } from '@/composables/useResource'
import { searchText } from '@/utils/format'
import PageHeader from '@/components/layout/PageHeader.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ResourceState from '@/components/ui/ResourceState.vue'
import RepairList from '@/components/repairs/RepairList.vue'

const demo = useDemoStore()
const route = useRoute()
const router = useRouter()
const query = ref('')
const filter = computed({
  get: () =>
    route.query.filter === 'active' || route.query.filter === 'closed' ? route.query.filter : 'all',
  set: (value: string) => {
    void router.replace({ query: { ...route.query, filter: value === 'all' ? undefined : value } })
  },
})
const {
  data: repairs,
  status,
  refresh,
} = useResource(() => getRepairService(demo.scenario).list(), [() => demo.scenario])
const filteredRepairs = computed(() => {
  const term = searchText(query.value.trim())
  return (repairs.value ?? []).filter((repair) => {
    const matchesFilter =
      filter.value === 'all' || (filter.value === 'closed' ? repair.isClosed : !repair.isClosed)
    const searchable = [
      repair.displayNumber,
      repair.equipment.name,
      repair.equipment.brand,
      repair.equipment.model,
    ].join(' ')
    return matchesFilter && searchText(searchable).includes(term)
  })
})

function resetFilters() {
  query.value = ''
  filter.value = 'all'
}
</script>

<template>
  <PageHeader
    eyebrow="O seu acompanhamento"
    title="Reparações"
    description="Consulte os seus processos em curso e as reparações já concluídas."
  >
    <button class="button-secondary" :disabled="status === 'loading'" @click="refresh">
      <AppIcon name="refresh" :size="16" />Atualizar
    </button>
  </PageHeader>

  <ResourceState :status="status" :empty="repairs?.length === 0" @retry="refresh">
    <div class="panel mb-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-end">
      <div class="flex-1">
        <label for="repair-search" class="mb-2 block text-xs font-medium text-body"
          >Pesquisar reparações</label
        >
        <div class="relative">
          <AppIcon
            name="search"
            :size="18"
            class="pointer-events-none absolute left-3 top-3 text-muted"
          /><input
            id="repair-search"
            v-model="query"
            type="search"
            placeholder="Número de processo, equipamento ou marca…"
            class="field pl-10"
          />
        </div>
      </div>
      <div class="sm:w-52">
        <label for="repair-filter" class="mb-2 block text-xs font-medium text-body"
          >Situação do processo</label
        ><select id="repair-filter" v-model="filter" class="field">
          <option value="all">Todas as reparações</option>
          <option value="active">Em curso</option>
          <option value="closed">Concluídas</option>
        </select>
      </div>
    </div>

    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
      <p class="text-sm text-muted" role="status">
        {{ filteredRepairs.length }}
        {{ filteredRepairs.length === 1 ? 'reparação encontrada' : 'reparações encontradas' }}
      </p>
      <button
        v-if="query || filter !== 'all'"
        class="text-sm font-medium text-brand-ink underline underline-offset-4"
        @click="resetFilters"
      >
        Limpar filtros
      </button>
    </div>
    <ResourceState
      status="ready"
      :empty="filteredRepairs.length === 0"
      empty-title="Nenhuma reparação encontrada"
      empty-description="Experimente outro número de processo, equipamento ou marca, ou limpe os filtros."
    >
      <RepairList :repairs="filteredRepairs" />
    </ResourceState>
    <p class="mt-5 flex items-start gap-2 text-xs leading-5 text-muted">
      <AppIcon name="info" :size="15" class="mt-0.5" />Os estados apresentados são exemplos. A
      correspondência com os estados do Sage será validada na integração.
    </p>
  </ResourceState>
</template>
