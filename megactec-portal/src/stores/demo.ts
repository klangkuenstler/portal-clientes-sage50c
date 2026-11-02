import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DemoScenario } from '@/services/mock/repairs'

export const useDemoStore = defineStore('demo', () => {
  const scenario = ref<DemoScenario>('normal')
  return { scenario }
})
