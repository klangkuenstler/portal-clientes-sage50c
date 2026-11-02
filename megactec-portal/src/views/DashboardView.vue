<script setup lang="ts">
import { computed } from 'vue'
import { useDemoStore } from '@/stores/demo'
import { getRepairService } from '@/services'
import { useResource } from '@/composables/useResource'
import PageHeader from '@/components/layout/PageHeader.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ResourceState from '@/components/ui/ResourceState.vue'
import RepairList from '@/components/repairs/RepairList.vue'

const demo = useDemoStore()
const {
  data: repairs,
  status,
  refresh,
} = useResource(() => getRepairService(demo.scenario).list(), [() => demo.scenario])
const activeRepairs = computed(() => repairs.value?.filter((repair) => !repair.isClosed) ?? [])
const equipment = computed(() => [
  ...new Map(repairs.value?.map((repair) => [repair.equipment.id, repair.equipment])).values(),
])
const stats = computed(() => [
  {
    label: 'Reparações em curso',
    value: activeRepairs.value.length,
    description: 'Acompanhe o estado dos seus pedidos',
    icon: 'tool',
    color: 'bg-orange-50 text-brand-ink',
  },
  {
    label: 'Reparações concluídas',
    value: repairs.value?.filter((repair) => repair.isClosed).length ?? 0,
    description: 'Processos encerrados disponíveis',
    icon: 'check',
    color: 'bg-emerald-50 text-emerald-800',
  },
  {
    label: 'Equipamentos',
    value: equipment.value.length,
    description: 'Associados às reparações apresentadas',
    icon: 'appliance',
    color: 'bg-blue-50 text-blue-800',
  },
])
</script>

<template>
  <PageHeader
    eyebrow="Tudo num só lugar"
    title="As suas reparações, mais perto."
    description="Acompanhe os seus equipamentos e consulte as últimas atualizações."
  >
    <button class="button-secondary" :disabled="status === 'loading'" @click="refresh">
      <AppIcon name="refresh" :size="16" />Atualizar
    </button>
  </PageHeader>

  <ResourceState :status="status" :empty="repairs?.length === 0" @retry="refresh">
    <div class="space-y-8">
      <section
        class="relative overflow-hidden rounded-2xl border border-orange-200/70 bg-[#fff3e5] p-6 sm:p-8"
        aria-labelledby="welcome-title"
      >
        <div class="relative z-10 max-w-xl sm:pr-16">
          <span class="mb-4 inline-flex items-center gap-2 text-xs font-medium text-brand-ink"
            ><span class="size-1.5 rounded-full bg-primary" />O seu ponto de acompanhamento</span
          >
          <h2
            id="welcome-title"
            class="text-2xl font-semibold leading-snug tracking-tight text-ink"
          >
            Cada reparação tem uma história.<br class="hidden sm:block" />
            Acompanhe a sua aqui.
          </h2>
          <p class="mt-3 max-w-md text-sm leading-6 text-body">
            Do diagnóstico à entrega, consulte o estado e as informações partilhadas pela nossa
            equipa.
          </p>
          <RouterLink
            :to="{ name: 'repairs', query: { filter: 'active' } }"
            class="button-primary mt-6"
            >Ver reparações em curso<AppIcon name="arrow" :size="17"
          /></RouterLink>
        </div>
        <div
          class="absolute -right-10 top-8 hidden size-64 items-center justify-center rounded-full border-[30px] border-orange-200/30 text-orange-300/80 xl:flex"
          aria-hidden="true"
        >
          <AppIcon name="appliance" :size="120" />
        </div>
      </section>

      <section aria-label="Resumo das reparações" class="grid gap-4 md:grid-cols-3">
        <div v-for="stat in stats" :key="stat.label" class="panel p-5 lg:p-6">
          <div class="flex items-center justify-between gap-3">
            <h2 class="text-sm font-medium text-muted">{{ stat.label }}</h2>
            <span class="rounded-xl p-2.5" :class="stat.color"
              ><AppIcon :name="stat.icon" :size="20"
            /></span>
          </div>
          <p class="mt-2 text-4xl font-semibold tracking-tight text-ink">{{ stat.value }}</p>
          <p class="mt-2 text-xs leading-5 text-muted">{{ stat.description }}</p>
        </div>
      </section>

      <section aria-labelledby="active-title">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="active-title" class="text-lg font-semibold text-ink">Reparações em curso</h2>
            <p class="mt-1 text-sm text-muted">
              O estado dos equipamentos que estamos a acompanhar.
            </p>
          </div>
          <RouterLink
            to="/reparacoes"
            class="inline-flex items-center gap-2 text-sm font-medium text-brand-ink"
            >Ver todas<AppIcon name="arrow" :size="16"
          /></RouterLink>
        </div>
        <RepairList v-if="activeRepairs.length" :repairs="activeRepairs" />
        <div v-else class="panel p-8 text-center text-sm text-muted">
          Não tem reparações em curso. Pode consultar os processos concluídos na lista de
          reparações.
        </div>
      </section>

      <section aria-labelledby="equipment-title">
        <div class="mb-4">
          <h2 id="equipment-title" class="text-lg font-semibold text-ink">Os seus equipamentos</h2>
          <p class="mt-1 text-sm text-muted">Equipamentos associados às reparações apresentadas.</p>
        </div>
        <ul class="grid gap-4 md:grid-cols-3">
          <li v-for="item in equipment" :key="item.id" class="panel flex gap-3 p-5">
            <AppIcon name="appliance" :size="24" class="mt-0.5 text-muted" />
            <div>
              <h3 class="text-sm font-medium text-ink">{{ item.name }}</h3>
              <p class="mt-1 text-xs text-muted">{{ item.brand ?? 'Marca não disponível' }}</p>
              <p class="mt-1 text-xs leading-5 text-muted">
                {{ item.model ?? 'Modelo não disponível' }}
              </p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </ResourceState>
</template>
