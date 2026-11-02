<script setup lang="ts">
import { computed } from 'vue'
import type { ResourceStatus } from '@/composables/useResource'
import AppIcon from './AppIcon.vue'

const props = withDefaults(
  defineProps<{
    status: ResourceStatus
    empty?: boolean
    emptyTitle?: string
    emptyDescription?: string
  }>(),
  {
    empty: false,
    emptyTitle: 'Ainda não existem reparações',
    emptyDescription: 'As reparações associadas à sua conta serão apresentadas aqui.',
  },
)
defineEmits<{ retry: [] }>()

const message = computed(() => {
  switch (props.status) {
    case 'loading':
      return {
        title: 'A carregar reparações…',
        description: 'Aguarde um momento.',
        icon: 'refresh',
      }
    case 'error':
      return {
        title: 'Não foi possível carregar os dados',
        description: 'Ocorreu um erro. Tente novamente dentro de momentos.',
        icon: 'info',
      }
    case 'unauthorised':
      return {
        title: 'Acesso não autorizado',
        description:
          'Não tem autorização para consultar estes dados. Nesta demonstração, selecione o cenário «Com dados» para continuar.',
        icon: 'shield',
      }
    case 'unavailable':
      return {
        title: 'Serviço temporariamente indisponível',
        description:
          'Não é possível consultar as reparações neste momento. Tente novamente mais tarde.',
        icon: 'clock',
      }
    case 'not-found':
      return {
        title: 'Reparação não encontrada',
        description:
          'A reparação não está disponível para esta conta. Consulte a lista de reparações.',
        icon: 'search',
      }
    default:
      return { title: props.emptyTitle, description: props.emptyDescription, icon: 'tool' }
  }
})
</script>

<template>
  <slot v-if="status === 'ready' && !empty" />
  <div
    v-else
    class="panel flex flex-col items-center px-6 py-14 text-center"
    :role="status === 'error' ? 'alert' : 'status'"
    :aria-busy="status === 'loading'"
  >
    <div class="mb-5 rounded-2xl bg-surface-muted p-4 text-muted">
      <AppIcon
        :name="message.icon"
        :size="28"
        :class="{ 'motion-safe:animate-spin': status === 'loading' }"
      />
    </div>
    <h2 class="text-lg font-semibold text-ink">{{ message.title }}</h2>
    <p class="mt-2 max-w-md text-sm leading-6 text-muted">{{ message.description }}</p>
    <button
      v-if="status === 'error' || status === 'unavailable'"
      class="button-secondary mt-6"
      @click="$emit('retry')"
    >
      <AppIcon name="refresh" :size="16" /> Tentar novamente
    </button>
    <RouterLink v-if="status === 'not-found'" to="/reparacoes" class="button-secondary mt-6"
      >Ver reparações</RouterLink
    >
  </div>
</template>
