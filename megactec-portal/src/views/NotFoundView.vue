<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
</script>

<template>
  <div class="panel px-6 py-20 text-center">
    <p class="eyebrow text-brand-ink">Erro 404</p>
    <h1 class="page-title mt-3">Página não encontrada</h1>
    <p class="mt-3 text-sm text-muted">O endereço que procura não está disponível.</p>
    <RouterLink to="/" class="button-primary mt-7"
      ><AppIcon name="back" :size="17" />Voltar à visão geral</RouterLink
    >
  </div>
</template>
