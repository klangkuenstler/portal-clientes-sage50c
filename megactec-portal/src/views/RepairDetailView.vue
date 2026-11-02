<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useDemoStore } from '@/stores/demo'
import { getRepairService } from '@/services'
import { useResource } from '@/composables/useResource'
import { formatDate } from '@/utils/format'
import PageHeader from '@/components/layout/PageHeader.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ResourceState from '@/components/ui/ResourceState.vue'
import StatusBadge from '@/components/repairs/StatusBadge.vue'

const route = useRoute()
const demo = useDemoStore()
const {
  data: repair,
  status,
  refresh,
} = useResource(
  () => getRepairService(demo.scenario).get(String(route.params.id ?? '')),
  [() => demo.scenario, () => route.params.id],
)
</script>

<template>
  <RouterLink
    to="/reparacoes"
    class="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-brand-ink"
    ><AppIcon name="back" :size="16" />Voltar às reparações</RouterLink
  >
  <PageHeader
    eyebrow="Detalhe da reparação"
    :title="repair?.displayNumber ?? 'Consultar reparação'"
    :description="repair?.equipment.name ?? 'Consulte o estado e as informações do seu processo.'"
  >
    <button class="button-secondary" :disabled="status === 'loading'" @click="refresh">
      <AppIcon name="refresh" :size="16" />Atualizar
    </button>
  </PageHeader>

  <ResourceState :status="status" @retry="refresh">
    <div v-if="repair" class="space-y-6">
      <section
        class="panel border-t-[3px] border-t-primary p-6 sm:p-7"
        aria-labelledby="status-title"
      >
        <div class="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h2 id="status-title" class="eyebrow mb-3">Estado atual</h2>
            <StatusBadge :status="repair.status" />
            <p class="mt-3 text-sm text-muted">
              {{
                repair.isClosed
                  ? 'Este processo encontra-se encerrado.'
                  : 'Este processo encontra-se em acompanhamento.'
              }}
            </p>
          </div>
          <div class="flex items-start gap-2.5 text-muted">
            <AppIcon name="clock" :size="18" class="mt-0.5" />
            <div>
              <p class="text-xs">Última atualização</p>
              <p class="mt-1 text-sm font-medium text-ink">
                {{ formatDate(repair.updatedAt, true) }}
              </p>
              <p class="mt-1 text-xs">Hora de Portugal continental</p>
            </div>
          </div>
        </div>
      </section>

      <div class="grid items-start gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div class="space-y-6">
          <section class="panel p-6" aria-labelledby="process-title">
            <h2 id="process-title" class="text-lg font-semibold text-ink">
              Informações do processo
            </h2>
            <dl class="mt-5 grid gap-5 border-b border-line pb-5 sm:grid-cols-2">
              <div>
                <dt class="text-xs text-muted">Número do processo</dt>
                <dd class="mt-1.5 text-sm font-medium text-ink">{{ repair.displayNumber }}</dd>
              </div>
              <div>
                <dt class="text-xs text-muted">Data de abertura</dt>
                <dd class="mt-1.5 text-sm font-medium text-ink">
                  {{ formatDate(repair.openedAt) }}
                </dd>
              </div>
            </dl>
            <h3 class="mt-5 text-xs font-medium text-muted">Problema comunicado</h3>
            <p class="mt-2 text-sm leading-7 text-body">
              {{ repair.problemDescription ?? 'A descrição do problema não está disponível.' }}
            </p>
          </section>

          <section class="panel p-6" aria-labelledby="notes-title">
            <div class="flex items-center gap-2.5">
              <AppIcon name="message" :size="20" class="text-brand-ink" />
              <h2 id="notes-title" class="text-lg font-semibold text-ink">Notas da equipa</h2>
            </div>
            <p class="mt-2 text-xs leading-5 text-muted">
              Informações partilhadas consigo sobre esta reparação.
            </p>
            <ol v-if="repair.publicNotes.length" class="mt-6 space-y-5">
              <li
                v-for="note in repair.publicNotes"
                :key="note.id"
                class="border-l-2 border-orange-200 pl-4"
              >
                <p class="text-xs font-medium text-muted">
                  {{ formatDate(note.publishedAt, true) }}
                </p>
                <p class="mt-2 text-sm leading-7 text-body">{{ note.text }}</p>
              </li>
            </ol>
            <p v-else class="mt-5 rounded-xl bg-surface-muted p-4 text-sm leading-6 text-muted">
              Ainda não existem notas públicas para esta reparação.
            </p>
          </section>
        </div>

        <div class="space-y-6">
          <section class="panel p-6" aria-labelledby="equipment-title">
            <div
              class="mb-5 flex size-12 items-center justify-center rounded-xl bg-surface-muted text-muted"
            >
              <AppIcon name="appliance" :size="27" />
            </div>
            <h2 id="equipment-title" class="text-lg font-semibold text-ink">Equipamento</h2>
            <p class="mt-1 text-sm text-muted">{{ repair.equipment.name }}</p>
            <dl class="mt-5 space-y-4">
              <div>
                <dt class="text-xs text-muted">Marca</dt>
                <dd class="mt-1 text-sm font-medium text-ink">
                  {{ repair.equipment.brand ?? 'Não disponível' }}
                </dd>
              </div>
              <div>
                <dt class="text-xs text-muted">Modelo</dt>
                <dd class="mt-1 break-words text-sm font-medium text-ink">
                  {{ repair.equipment.model ?? 'Não disponível' }}
                </dd>
              </div>
              <div>
                <dt class="text-xs text-muted">Número de série</dt>
                <dd class="mt-1 break-words text-sm font-medium text-ink">
                  {{ repair.equipment.serialNumber ?? 'Não disponível' }}
                </dd>
              </div>
            </dl>
          </section>
          <section
            class="rounded-2xl border border-orange-200/70 bg-orange-50/60 p-6"
            aria-labelledby="help-title"
          >
            <h2 id="help-title" class="font-semibold text-ink">Tem alguma questão?</h2>
            <p class="mt-2 text-sm leading-6 text-body">
              Ao contactar a Megactec, indique o número do processo para facilitar o acompanhamento.
            </p>
            <a
              href="https://megactec.pt/contact"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-ink"
              >Entrar em contacto<AppIcon name="external" :size="15" /><span class="sr-only">
                (abre num novo separador)</span
              ></a
            >
          </section>
        </div>
      </div>
    </div>
  </ResourceState>
</template>
