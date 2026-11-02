<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useDemoStore } from '@/stores/demo'
import AppIcon from '@/components/ui/AppIcon.vue'

const demo = useDemoStore()
const route = useRoute()
const logoUrl = `${import.meta.env.BASE_URL}logo.png`
const navigation = [
  { to: '/', label: 'Visão geral', icon: 'grid' },
  { to: '/reparacoes', label: 'Reparações', icon: 'tool' },
]
</script>

<template>
  <div class="min-h-screen bg-canvas text-body">
    <a
      href="#main-content"
      class="sr-only z-50 rounded-lg bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >Saltar para o conteúdo</a
    >

    <aside
      class="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-line bg-white px-5 py-8 lg:flex"
    >
      <RouterLink to="/" aria-label="Megactec — início" class="px-3">
        <img :src="logoUrl" alt="Megactec" class="h-auto w-40" />
        <span class="mt-3 block text-[10px] font-medium uppercase tracking-[0.2em] text-muted"
          >Portal do cliente</span
        >
      </RouterLink>

      <p class="mb-3 mt-14 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
        A sua área
      </p>
      <nav aria-label="Navegação principal" class="space-y-1.5">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          v-slot="{ isActive, isExactActive }"
          class="nav-item"
          :class="{
            'nav-item-active':
              item.to === '/' ? route.path === '/' : route.path.startsWith(item.to),
          }"
        >
          <AppIcon
            :name="item.icon"
            :size="19"
            :class="{ 'text-brand-ink': item.to === '/' ? isExactActive : isActive }"
          />
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="mt-auto rounded-xl border border-line bg-canvas p-4">
        <div
          class="mb-3 flex size-9 items-center justify-center rounded-lg bg-white text-brand-ink"
        >
          <AppIcon name="message" :size="19" />
        </div>
        <p class="text-sm font-semibold text-ink">Podemos ajudar?</p>
        <p class="mt-1.5 text-xs leading-5 text-muted">
          Fale connosco sobre uma reparação ou um novo pedido.
        </p>
        <a
          href="https://megactec.pt/contact"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 flex items-center justify-between text-sm font-medium text-brand-ink"
        >
          Contactar a Megactec <AppIcon name="external" :size="14" /><span class="sr-only">
            (abre num novo separador)</span
          >
        </a>
      </div>
      <div class="mt-5 flex items-center gap-2 px-3 text-xs text-muted">
        <AppIcon name="shield" :size="15" /> Área de demonstração
      </div>
    </aside>

    <div class="lg:pl-60">
      <header class="border-b border-line bg-white px-5 sm:px-8 lg:px-10">
        <div
          class="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-3 py-4"
        >
          <RouterLink to="/" aria-label="Megactec — início" class="lg:hidden">
            <img :src="logoUrl" alt="Megactec" class="h-auto w-28" />
          </RouterLink>
          <p class="hidden text-sm text-muted lg:block">
            Portal do cliente <span class="mx-3 text-line" aria-hidden="true">/</span>
            <span class="text-ink">{{ route.meta.title }}</span>
          </p>
          <div class="flex items-center gap-3">
            <div class="hidden text-right sm:block">
              <p class="text-sm font-medium text-ink">Conta de demonstração</p>
              <p class="mt-0.5 text-xs text-muted">Dados fictícios</p>
            </div>
            <span
              class="flex size-10 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-sm font-semibold text-brand-ink"
              aria-label="Conta de demonstração"
              >D</span
            >
          </div>
        </div>
        <nav aria-label="Navegação móvel" class="flex gap-2 pb-4 lg:hidden">
          <RouterLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="nav-item flex-1 justify-center"
            :class="{
              'nav-item-active':
                item.to === '/' ? route.path === '/' : route.path.startsWith(item.to),
            }"
          >
            <AppIcon :name="item.icon" :size="17" />{{ item.label }}
          </RouterLink>
        </nav>
      </header>

      <div class="border-b border-orange-200/70 bg-orange-50/70 px-5 sm:px-8 lg:px-10">
        <details class="mx-auto max-w-7xl py-3 text-xs text-amber-950">
          <summary class="cursor-pointer leading-5">
            <strong>Demonstração</strong> — Dados e estados fictícios, sem ligação ao Sage.
            <span class="ml-1 underline underline-offset-2">Testar cenários</span>
          </summary>
          <div class="mt-3 flex flex-wrap items-center gap-3 pb-1">
            <label for="demo-scenario" class="font-medium">Cenário de demonstração</label>
            <select id="demo-scenario" v-model="demo.scenario" class="field w-auto py-2 text-xs">
              <option value="normal">Com dados</option>
              <option value="empty">Sem reparações</option>
              <option value="error">Erro de carregamento</option>
              <option value="unauthorised">Acesso não autorizado</option>
              <option value="unavailable">Serviço indisponível</option>
            </select>
            <span>A atualização recarrega apenas os dados de exemplo.</span>
          </div>
        </details>
      </div>

      <main
        id="main-content"
        tabindex="-1"
        class="mx-auto max-w-7xl px-5 py-8 outline-none sm:px-8 lg:px-10 lg:py-10"
      >
        <slot />
      </main>
      <footer
        class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 pb-7 pt-2 text-xs text-muted sm:px-8 lg:px-10"
      >
        <p>Megactec · Portal do Cliente</p>
        <a
          href="https://megactec.pt/contact"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 hover:text-brand-ink"
          >Contactos e novos pedidos <AppIcon name="external" :size="12" /><span class="sr-only">
            (abre num novo separador)</span
          ></a
        >
      </footer>
    </div>
  </div>
</template>
